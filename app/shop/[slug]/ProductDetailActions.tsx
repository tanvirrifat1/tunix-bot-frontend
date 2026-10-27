'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Zap, Plus, Minus, PackageX, MessageCircle } from 'lucide-react';
import { RobotProduct } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useStockModal } from '@/context/StockModalContext';

export default function ProductDetailActions({ product }: { product: RobotProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { openStockModal } = useStockModal();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const isOutOfStock = !product.inStock || product.stockCount <= 0;

  const handleIncrement = () => setQuantity((q) => Math.min(product.stockCount || 10, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  if (isOutOfStock) {
    return (
      <div className="space-y-4 pt-2">
        {/* Out of Stock Notice */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isLight
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
          }`}
        >
          <PackageX className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-rose-500 block text-sm">
              বর্তমানে স্টক আউট (Out of Stock)
            </span>
            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              দুঃখিত! এই রোবটটির সমস্ত ইউনিট বিক্রি হয়ে গেছে। স্টক শেষ থাকায় এটি অর্ডার করা সম্ভব নয়।
            </p>
          </div>
        </div>

        {/* Buttons when out of stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => openStockModal(product)}
            className="py-3 px-5 rounded-xl font-bold text-sm bg-rose-500/15 border border-rose-500/50 text-rose-500 hover:bg-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-500/10"
          >
            <PackageX className="h-4 w-4 text-rose-500" />
            <span>অর্ডার বন্ধ (Stock Out)</span>
          </button>

          <a
            href={`https://wa.me/8801904482088?text=${encodeURIComponent(
              `Hi Tunix-Bot! I want to pre-order ${product.name} because it's currently out of stock.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-xl font-semibold text-sm bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span>Pre-order on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Quantity:
        </span>
        <div
          className={`flex items-center rounded-xl border p-1 ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-800'
              : 'bg-slate-900 border-slate-700 text-white'
          }`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className={`w-10 text-center font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Subtotal: <strong className={isLight ? 'text-cyan-700 font-bold' : 'text-cyan-400 font-bold'}>${product.price * quantity}</strong>
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Instant 1-Step Guest Order */}
        <Link
          href={`/order?quickBuy=${product.id}&qty=${quantity}`}
          className="py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white hover:brightness-110 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 always-white"
        >
          <Zap className="h-4 w-4 fill-white text-white" />
          <span>Fast Order (No Login)</span>
        </Link>

        {/* Add to Bag */}
        <button
          type="button"
          onClick={() => addToCart(product, quantity)}
          className={`py-3 px-5 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-cyan-500/50'
          }`}
        >
          <ShoppingBag className={`h-4 w-4 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
