'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Trash2,
  Plus,
  Minus,
  Bot,
  Banknote,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  PackageX,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, getProductById } from '@/data/products';
import { OrderInput, RobotProduct } from '@/lib/types';
import { useTheme } from '@/context/ThemeContext';
import { useStockModal } from '@/context/StockModalContext';

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();
  const { openStockModal } = useStockModal();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

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
  const [paymentMethod] = useState<'Cash on Delivery'>('Cash on Delivery');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam hidden field

  // Robot selection dropdown state
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProductDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const handleSelectProduct = (product: RobotProduct) => {
    const existing = orderItems.find((i) => i.product.id === product.id);
    const qty = existing ? existing.quantity : 1;
    setOrderItems([{ product, quantity: qty }]);
    setIsProductDropdownOpen(false);
    setErrorMessage(null);
  };

  const selectedProduct = orderItems.length > 0 ? orderItems[0].product : null;

  // Pricing calculations
  const subtotal = orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const outOfStockItems = orderItems.filter(
    (item) => !item.product.inStock || item.product.stockCount <= 0
  );
  const hasOutOfStock = outOfStockItems.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Prevent ordering out of stock items
    if (hasOutOfStock) {
      setErrorMessage(
        `দুঃখিত! "${outOfStockItems[0].product.name}" বর্তমানে স্টক আউট (Out of Stock)। স্টক আউট থাকা অবস্থায় অর্ডার গ্রহণ করা সম্ভব নয়।`
      );
      openStockModal(outOfStockItems[0].product);
      return;
    }

    // Client preliminary checks
    if (orderItems.length === 0) {
      setErrorMessage('Please select which robot companion you want to order from the dropdown above.');
      setIsProductDropdownOpen(true);
      dropdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMessage('Please enter a valid phone number for courier delivery.');
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      setErrorMessage('Please enter your complete delivery street address.');
      return;
    }

    // Spam honeypot trap
    if (honeypot.trim() !== '') {
      return;
    }

    setLoading(true);

    try {
      const payload: OrderInput = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        email: email.trim() ? email.trim() : undefined,
        orderNotes: orderNotes.trim() ? orderNotes.trim() : undefined,
        paymentMethod,
        items: orderItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        honeypot: honeypot.trim(),
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
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border ${
            isLight
              ? 'bg-cyan-50 border-cyan-200 text-cyan-800'
              : 'bg-cyan-950/70 border-cyan-800/50 text-cyan-300'
          }`}
        >
          <Zap className={`h-3.5 w-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
          <span>Frictionless 1-Step Guest Checkout</span>
        </div>
        <h1
          className={`text-3xl sm:text-4xl font-extrabold ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Simple Order Form
        </h1>
        <p className={`mt-1 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          No passwords, no accounts, and no registration required. Simply enter where to deliver your robot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Guest Order Form */}
        <div
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border space-y-6 transition-colors ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'glass-panel border-slate-800'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}
          >
            <h2
              className={`text-base font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Customer & Delivery Details
            </h2>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                isLight
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50'
              }`}
            >
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

            {/* Robot Selection Dropdown Field */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className={`block text-xs font-semibold ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Select Robot to Order (কোন রোবটটি নিতে চান?) <span className="text-cyan-500">*</span>
                </label>
                {selectedProduct && (
                  <span className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Click field to change
                  </span>
                )}
              </div>

              {/* Dropdown Toggle Field */}
              <button
                type="button"
                onClick={() => setIsProductDropdownOpen((prev) => !prev)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border flex items-center justify-between text-left transition-all cursor-pointer ${
                  isProductDropdownOpen
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-900 hover:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white hover:border-cyan-500'
                }`}
              >
                {selectedProduct ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`relative w-10 h-10 rounded-lg border overflow-hidden shrink-0 ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`font-bold text-sm block truncate ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {selectedProduct.name}
                      </span>
                      <span className="text-xs text-cyan-500 font-semibold">
                        ${selectedProduct.price} • {selectedProduct.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isLight ? 'bg-slate-100 text-slate-500' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block text-slate-400">
                        Choose a robot companion...
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        ড্রপডাউন ক্লিক করে রোবট নির্বাচন করুন
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1 shrink-0 text-slate-400 ml-2">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProductDropdownOpen ? 'rotate-180 text-cyan-500' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProductDropdownOpen && (
                <div
                  className={`absolute left-0 right-0 mt-2 rounded-2xl border shadow-2xl z-40 overflow-hidden backdrop-blur-xl animate-in fade-in-50 slide-in-from-top-2 duration-150 ${
                    isLight
                      ? 'bg-white/98 border-slate-200 shadow-slate-300/70'
                      : 'bg-slate-950/98 border-slate-800 shadow-black/80'
                  }`}
                >
                  <div
                    className={`p-2.5 border-b text-[11px] font-semibold flex items-center justify-between ${
                      isLight
                        ? 'bg-slate-50 border-slate-100 text-slate-500'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>AVAILABLE ROBOTS ({PRODUCTS.length})</span>
                    <span>Click to select</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
                    {PRODUCTS.map((prod) => {
                      const isSelected = selectedProduct?.id === prod.id;
                      const isOutOfStock = !prod.inStock || prod.stockCount <= 0;

                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => handleSelectProduct(prod)}
                          className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-cyan-50 border border-cyan-300 text-cyan-950 shadow-xs'
                                : 'bg-cyan-950/60 border border-cyan-700/60 text-cyan-100 shadow-xs'
                              : isLight
                              ? 'hover:bg-slate-100 text-slate-800 border border-transparent'
                              : 'hover:bg-slate-900 text-slate-200 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Product Image */}
                            <div
                              className={`relative w-12 h-12 rounded-xl border overflow-hidden shrink-0 ${
                                isLight
                                  ? 'bg-slate-50 border-slate-200'
                                  : 'bg-slate-900 border-slate-800'
                              }`}
                            >
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            </div>

                            {/* Product Name & Details */}
                            <div className="min-w-0">
                              <span className="font-bold text-sm block truncate">
                                {prod.name}
                              </span>
                              <div className="flex items-center gap-2 text-xs mt-0.5">
                                <span className="font-bold text-cyan-500">
                                  ${prod.price}
                                </span>
                                {isOutOfStock ? (
                                  <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                                    Stock Out
                                  </span>
                                ) : (
                                  <span
                                    className={`text-[11px] ${
                                      isLight ? 'text-slate-500' : 'text-slate-400'
                                    }`}
                                  >
                                    In Stock ({prod.stockCount})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Selected Checkmark */}
                          {isSelected && (
                            <div className="shrink-0 mr-1.5">
                              <div className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center">
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                Full Name <span className="text-cyan-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                Phone Number (For Delivery Confirmation) <span className="text-cyan-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 01712345678 or +1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
                }`}
              />
              <span className={`text-[11px] mt-1 block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                The courier will call this number before arrival.
              </span>
            </div>

            {/* Delivery Address */}
            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                Full Delivery Address <span className="text-cyan-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="House / Apartment number, Road / Street, Sector / Area, City"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
                }`}
              />
            </div>

            {/* Optional Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className={`block text-xs font-semibold ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Email Address
                </label>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Optional
                </span>
              </div>
              <input
                type="email"
                placeholder="e.g. alex@example.com (optional receipt copy)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
                }`}
              />
            </div>

            {/* Optional Order Notes */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className={`block text-xs font-semibold ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Order Notes / Delivery Instructions
                </label>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Optional
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Please leave with building front desk or call before 5pm"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
                }`}
              />
            </div>

            {/* Payment Method - Cash on Delivery Only */}
            <div className="pt-2">
              <label
                className={`block text-xs font-semibold mb-2 ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                Payment Option:
              </label>
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isLight
                    ? 'bg-cyan-50/70 border-cyan-400 ring-1 ring-cyan-400/50 shadow-xs'
                    : 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-sm ring-1 ring-cyan-500/40'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isLight
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                    }`}
                  >
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <span
                      className={`text-sm font-bold block ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Cash on Delivery (COD)
                    </span>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Pay in cash directly to the courier upon parcel delivery & inspection.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/25">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Available</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Out of Stock Warning Banner */}
            {hasOutOfStock && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 flex items-start gap-3">
                <PackageX className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold block text-sm">
                    অর্ডারে স্টক আউট পণ্য রয়েছে
                  </span>
                  <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                    &quot;{outOfStockItems[0].product.name}&quot; এর বর্তমান স্টক শেষ হয়ে গেছে। স্টক আউট পণ্যটি সরানো ছাড়া অর্ডার কনফার্ম করা যাবে না।
                  </p>
                  <button
                    type="button"
                    onClick={() => openStockModal(outOfStockItems[0].product)}
                    className="font-bold underline text-rose-500 hover:text-rose-400 mt-1 inline-block cursor-pointer"
                  >
                    স্টক আউট নোটিশ বিস্তারিত দেখুন →
                  </button>
                </div>
              </div>
            )}

            {/* Submit Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || orderItems.length === 0 || hasOutOfStock}
                onClick={(e) => {
                  if (hasOutOfStock) {
                    e.preventDefault();
                    openStockModal(outOfStockItems[0].product);
                  }
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasOutOfStock
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                    : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white hover:brightness-110 shadow-xl shadow-cyan-500/30 always-white disabled:opacity-50'
                }`}
              >
                {loading ? (
                  <span>Saving Order Securely...</span>
                ) : hasOutOfStock ? (
                  <>
                    <PackageX className="h-5 w-5 text-rose-400" />
                    <span>অর্ডার বন্ধ (পণ্য স্টক আউট)</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 fill-white text-white" />
                    <span>Confirm & Place Order (${totalAmount})</span>
                  </>
                )}
              </button>
            </div>

            <p className={`text-center text-[11px] pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              By placing this order, you agree to our{' '}
              <Link href="/privacy-policy" className="text-cyan-600 underline">
                Privacy
              </Link>{' '}
              and{' '}
              <Link href="/shipping-return-policy" className="text-cyan-600 underline">
                Shipping
              </Link>{' '}
              policies.
            </p>
          </form>
        </div>

        {/* Right Column: Order Summary & Review */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`rounded-3xl p-6 border space-y-4 transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : 'glass-panel border-slate-800'
            }`}
          >
            <h3
              className={`text-sm font-bold uppercase tracking-wider flex items-center justify-between ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span>Order Summary</span>
              <span className={`text-xs normal-case font-medium ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
                {orderItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </h3>

            {/* Items list */}
            {orderItems.length === 0 ? (
              <div className={`py-8 text-center text-xs space-y-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <Bot className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="font-medium">No robots selected yet.</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsProductDropdownOpen(true);
                    dropdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="h-3.5 w-3.5" />
                  <span>Choose Robot from Dropdown ↑</span>
                </button>
              </div>
            ) : (
              <div className={`space-y-3 divide-y ${isLight ? 'divide-slate-100' : 'divide-slate-800/80'}`}>
                {orderItems.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div
                      className={`relative w-14 h-14 rounded-xl border overflow-hidden shrink-0 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {item.product.name}
                      </h4>
                      <p className={`text-[11px] font-bold ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
                        ${item.product.price} each
                      </p>

                      {(!item.product.inStock || item.product.stockCount <= 0) && (
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 inline-flex items-center gap-1 mt-1">
                          <PackageX className="h-3 w-3" /> Stock Out
                        </span>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`flex items-center rounded-md border ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-800'
                              : 'bg-slate-800 border-slate-700 text-white'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className={`px-1.5 py-0.5 text-xs transition-colors cursor-pointer ${
                              isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className={`px-2 text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className={`px-1.5 py-0.5 text-xs transition-colors cursor-pointer ${
                              isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 text-xs ml-auto cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div
              className={`pt-4 border-t space-y-2 text-xs ${
                isLight ? 'border-slate-100' : 'border-slate-800'
              }`}
            >
              <div className={`flex justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Subtotal (Server Verified)</span>
                <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>${subtotal}</span>
              </div>
              <div className={`flex justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Courier Express Shipping</span>
                <span className="font-semibold text-emerald-500">
                  {shippingFee === 0 ? 'FREE ($150+ threshold)' : `$${shippingFee}`}
                </span>
              </div>
              <div
                className={`flex justify-between pt-2 border-t text-sm font-bold ${
                  isLight ? 'border-slate-100 text-slate-900' : 'border-slate-800 text-white'
                }`}
              >
                <span>Total Payable</span>
                <span className={`font-extrabold text-lg ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
                  ${totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Support Callout */}
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${
              isLight
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
            }`}
          >
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Need immediate order help?
              </p>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                You can also place or confirm orders directly via WhatsApp at any time.
              </p>
              <a
                href="https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I'd%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-bold hover:underline mt-1 inline-block"
              >
                Open WhatsApp Chat (01904482088) →
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
        <div className="min-h-[50vh] flex items-center justify-center text-cyan-500">
          Loading order form...
        </div>
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}
