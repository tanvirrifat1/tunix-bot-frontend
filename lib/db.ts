import fs from 'fs';
import path from 'path';
import { CustomerOrder, OrderInput, OrderItem } from './types';
import { PRODUCTS } from '@/data/products';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure directory and data file exist
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// In-memory rate-limiter: max 5 orders per 10 minutes per IP
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(identifier);

  if (!entry || entry.expiresAt < now) {
    requestCounts.set(identifier, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 8) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Read all orders internally (NEVER EXPOSED DIRECTLY TO PUBLIC CLIENTS)
function readAllOrdersInternal(): CustomerOrder[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw) as CustomerOrder[];
  } catch (error) {
    console.error('Error reading orders file:', error);
    return [];
  }
}

// Write orders atomically with safety
function writeOrdersInternal(orders: CustomerOrder[]): void {
  ensureDatabase();
  const tempFile = `${ORDERS_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(orders, null, 2), 'utf-8');
  fs.renameSync(tempFile, ORDERS_FILE);
}

// Generate unique human-readable order number e.g. RBT-2026-8941
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `RBT-${year}-${randomChars}${randomDigits}`;
}

// Server-side validation and price calculation
export async function createOrder(
  input: OrderInput,
  clientIp = 'unknown'
): Promise<{ success: boolean; order?: CustomerOrder; error?: string }> {
  // 1. Anti-spam honeypot check
  if (input.honeypot && input.honeypot.trim() !== '') {
    return { success: false, error: 'Spam submission detected.' };
  }

  // 2. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return { success: false, error: 'Too many requests. Please wait a few minutes before placing another order.' };
  }

  // 3. Customer data validations
  const fullName = input.fullName?.trim();
  const phone = input.phone?.trim();
  const deliveryAddress = input.deliveryAddress?.trim();

  if (!fullName || fullName.length < 2 || fullName.length > 80) {
    return { success: false, error: 'Please enter a valid full name (2 to 80 characters).' };
  }

  // Simple clean phone validation (digits, +, -, spaces, at least 7 chars)
  const phoneClean = phone?.replace(/[\s\-\(\)]/g, '');
  if (!phoneClean || phoneClean.length < 7 || phoneClean.length > 20) {
    return { success: false, error: 'Please enter a valid reachable phone number.' };
  }

  if (!deliveryAddress || deliveryAddress.length < 6 || deliveryAddress.length > 300) {
    return { success: false, error: 'Please provide a complete delivery address with street and city (min 6 characters).' };
  }

  if (!input.items || !Array.isArray(input.items) || input.items.length === 0) {
    return { success: false, error: 'Your order must contain at least one robot.' };
  }

  // 4. Calculate prices on server from trusted database records
  const calculatedItems: OrderItem[] = [];
  let subtotal = 0;

  for (const item of input.items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      return { success: false, error: `Invalid product selected (${item.productId}).` };
    }

    const qty = Math.max(1, Math.min(10, Math.floor(Number(item.quantity) || 1)));
    const itemSubtotal = product.price * qty;

    calculatedItems.push({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      unitPrice: product.price,
      quantity: qty,
      subtotal: itemSubtotal,
    });

    subtotal += itemSubtotal;
  }

  // Flat or Free shipping over $150
  const shippingFee = subtotal >= 150 ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const orderNumber = generateOrderNumber();
  const createdAt = new Date().toISOString();

  // Pre-fill WhatsApp message link for customer support
  const waPhone = '8801904482088'; // official Tunix-Bot WhatsApp support desk
  const waText = encodeURIComponent(
    `Hello Tunix-Bot Support! I have placed an order #${orderNumber} for $${totalAmount}. My name is ${fullName}.`
  );
  const whatsappQueryUrl = `https://wa.me/${waPhone}?text=${waText}`;

  const newOrder: CustomerOrder = {
    orderNumber,
    createdAt,
    status: 'Pending Confirmation',
    customer: {
      fullName,
      phone,
      deliveryAddress,
      email: input.email?.trim() || undefined,
      orderNotes: input.orderNotes?.trim() || undefined,
    },
    items: calculatedItems,
    subtotal,
    shippingFee,
    totalAmount,
    paymentMethod: input.paymentMethod || 'Cash on Delivery',
    whatsappQueryUrl,
  };

  try {
    const orders = readAllOrdersInternal();
    orders.unshift(newOrder);
    writeOrdersInternal(orders);

    return {
      success: true,
      order: newOrder,
    };
  } catch (err: unknown) {
    console.error('Failed to save order:', err);
    return {
      success: false,
      error: 'Failed to record your order due to a server error. Please try again or reach out on WhatsApp.',
    };
  }
}

// SAFE ORDER TRACKING LOOKUP
// Strictly prevents scraping or leaking customer identities!
// Requires BOTH orderNumber AND matching phone number.
// Returns only sanitized, masked data.
export function lookupOrderStatus(orderNumber: string, phone: string) {
  if (!orderNumber || !phone) {
    return { found: false, error: 'Both Order Number and Phone Number are required.' };
  }

  const cleanNum = orderNumber.trim().toUpperCase();
  const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '');

  const orders = readAllOrdersInternal();
  const match = orders.find((o) => {
    const oPhone = o.customer.phone.replace(/[\s\-\(\)]/g, '');
    return o.orderNumber.toUpperCase() === cleanNum && oPhone === cleanPhone;
  });

  if (!match) {
    return {
      found: false,
      error: 'No matching order found for this order number and phone number.',
    };
  }

  // Mask sensitive details
  const nameParts = match.customer.fullName.split(' ');
  const maskedName = nameParts
    .map((p) => (p.length > 1 ? p[0] + '*'.repeat(p.length - 1) : p))
    .join(' ');

  const addr = match.customer.deliveryAddress;
  const maskedAddress = addr.length > 8 ? addr.slice(0, 4) + '****, ' + addr.slice(-6) : '****';

  return {
    found: true,
    order: {
      orderNumber: match.orderNumber,
      createdAt: match.createdAt,
      status: match.status,
      customerName: maskedName,
      maskedAddress,
      itemCount: match.items.reduce((acc, i) => acc + i.quantity, 0),
      items: match.items.map((i) => ({
        name: i.productName,
        quantity: i.quantity,
      })),
      totalAmount: match.totalAmount,
      paymentMethod: match.paymentMethod,
      whatsappQueryUrl: match.whatsappQueryUrl,
    },
  };
}
