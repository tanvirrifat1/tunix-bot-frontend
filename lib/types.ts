export interface RobotProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  category: 'AI Companion' | 'Emotion & Desk Pet' | 'Productivity & Focus' | 'Duo Set';
  features: string[];
  description: string;
  technicalSpecs: {
    display: string;
    battery: string;
    sensors: string[];
    connectivity: string;
    dimensions: string;
    weight: string;
    materials: string;
  };
  inTheBox: string[];
}

export interface CartItem {
  product: RobotProduct;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface CustomerOrder {
  orderNumber: string;
  createdAt: string;
  status: 'Pending Confirmation' | 'Processing' | 'Shipped' | 'Delivered';
  customer: {
    fullName: string;
    phone: string;
    deliveryAddress: string;
    email?: string;
    orderNotes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'Cash on Delivery' | 'Mobile Banking (bKash/Nagad/Rocket)' | 'Bank Transfer';
  whatsappQueryUrl: string;
}

export interface OrderInput {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  email?: string;
  orderNotes?: string;
  paymentMethod: 'Cash on Delivery' | 'Mobile Banking (bKash/Nagad/Rocket)' | 'Bank Transfer';
  items: {
    productId: string;
    quantity: number;
  }[];
  honeypot?: string; // Anti-spam field
}
