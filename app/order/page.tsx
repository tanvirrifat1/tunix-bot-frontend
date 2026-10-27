'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  Truck,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  Bot,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, getProductById } from '@/data/products';
import { OrderInput, RobotProduct } from '@/lib/types';

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();

  const quickBuyId = searchParams.get('quickBuy');
  const quickBuyQty = parseInt(searchParams.get('qty') || '1', 10);

  // Active items for this order: either quickBuy item or current cart
  const [orderItems, setOrderItems] = useState<{ product: RobotProduct; quantity: number }[]>([]);

  // Customer Form fields (strictly minimal & authentication-free)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState(''); // Optional
  const [orderNotes, setOrderNotes] = useState(''); // Optional
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Mobile Banking (bKash/Nagad/Rocket)' | 'Bank Transfer'>('Cash on Delivery');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam hidden field

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize order items
  useEffect(() => {
    if (quickBuyId) {
      const qProduct = getProductById(quickBuyId);
      if (qProduct) {
        setOrderItems([{ product: qProduct, quantity: Math.max(1, quickBuyQty) }]);
        return;
      }
    }

    if (cart.length > 0) {
      setOrderItems(cart.map((c) => ({ product: c.product, quantity: c.quantity })));
    }
  }, [quickBuyId, quickBuyQty, cart]);

  // Adjust item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: RobotProduct; quantity: number }[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Pricing calculations
  const subtotal = orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client preliminary checks
    if (orderItems.length === 0) {
      setErrorMessage('Your order is empty. Please add at least one robot to order.');
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setErrorMessage('Please provide a valid phone number for courier delivery confirmation.');
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 6) {
      setErrorMessage('Please provide a complete delivery address with street and city.');
      return;
    }

    setLoading(true);

    try {
      const payload: OrderInput = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        email: email.trim() || undefined,
        orderNotes: orderNotes.trim() || undefined,
        paymentMethod,
        items: orderItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        honeypot: honeypot || undefined,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to place order. Please try again.');
        setLoading(false);
        return;
      }

      // Clear local cart if order came from cart
      clearCart();

      // Redirect to confirmation page with unique order number
      router.push(`/order-confirmation?orderNumber=${data.order.orderNumber}`);
    } catch {
      setErrorMessage('A network error occurred. Please try again or order directly via WhatsApp.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-cyan-300 text-xs font-semibold mb-2">
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
          <span>Frictionless 1-Step Guest Checkout</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Simple Order Form
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          No passwords, no accounts, and no registration required. Simply enter where to deliver your robot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Guest Order Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Customer & Delivery Details
            </h2>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              Zero Login Required
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field (hidden from real users, catches automated bots) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Phone Number (For Delivery Confirmation) <span className="text-cyan-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 01712345678 or +1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                The courier will call this number before arrival.
              </span>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Full Delivery Address <span className="text-cyan-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="House / Apartment number, Road / Street, Sector / Area, City"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Optional Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-200">
                  Email Address
                </label>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  Optional
                </span>
              </div>
              <input
                type="email"
                placeholder="e.g. alex@example.com (optional receipt copy)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Optional Order Notes */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-200">
                  Order Notes / Delivery Instructions
                </label>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  Optional
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Please leave with building front desk or call before 5pm"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Payment Method Selection */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Payment Option:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Cash on Delivery */}
                <label
                  className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                  />
                  <Banknote className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400">Pay upon parcel inspection</span>
                </label>

                {/* Mobile Banking */}
                <label
                  className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'Mobile Banking (bKash/Nagad/Rocket)'
                      ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'Mobile Banking (bKash/Nagad/Rocket)'}
                    onChange={() => setPaymentMethod('Mobile Banking (bKash/Nagad/Rocket)')}
                  />
                  <Smartphone className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Mobile Banking</span>
                  <span className="text-[10px] text-slate-400">bKash / Nagad / Rocket</span>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'Bank Transfer'
                      ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={() => setPaymentMethod('Bank Transfer')}
                  />
                  <CreditCard className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-bold text-white">Bank Transfer</span>
                  <span className="text-[10px] text-slate-400">Direct account transfer</span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || orderItems.length === 0}
                className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Saving Order Securely...</span>
                ) : (
                  <>
                    <Zap className="h-5 w-5 fill-slate-950" />
                    <span>Confirm & Place Order (${totalAmount})</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 pt-1">
              By placing this order, you agree to our{' '}
              <Link href="/privacy-policy" className="text-cyan-400 underline">
                Privacy
              </Link>{' '}
              and{' '}
              <Link href="/shipping-return-policy" className="text-cyan-400 underline">
                Shipping
              </Link>{' '}
              policies.
            </p>
          </form>
        </div>

        {/* Right Column: Order Summary & Review */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-cyan-400 text-xs normal-case font-medium">
                {orderItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </h3>

            {/* Items list */}
            {orderItems.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs space-y-2">
                <Bot className="h-8 w-8 text-slate-600 mx-auto" />
                <p>No robots selected.</p>
                <Link href="/shop" className="text-cyan-400 font-semibold underline block">
                  Select a robot from shop →
                </Link>
              </div>
            ) : (
              <div className="space-y-3 divide-y divide-slate-800/80">
                {orderItems.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-cyan-400 font-bold">
                        ${item.product.price} each
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center rounded-md bg-slate-800 border border-slate-700">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 text-xs ml-auto"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-white">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal (Server Verified)</span>
                <span className="font-semibold text-slate-200">${subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Courier Express Shipping</span>
                <span className="font-semibold text-emerald-400">
                  {shippingFee === 0 ? 'FREE ($150+ threshold)' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                <span>Total Payable</span>
                <span className="text-cyan-400 font-extrabold text-lg">${totalAmount}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Support Callout */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Need immediate order help?</p>
              <p className="text-slate-400">
                You can also place or confirm orders directly via WhatsApp at any time.
              </p>
              <a
                href="https://wa.me/8801700000000?text=Hi%20RoboDesk!%20I'd%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline mt-1 inline-block"
              >
                Open WhatsApp Chat →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-cyan-400">
          Loading order form...
        </div>
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}
