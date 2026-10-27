'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Zap, Plus, Minus } from 'lucide-react';
import { RobotProduct } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function ProductDetailActions({ product }: { product: RobotProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity((q) => Math.min(10, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold text-slate-300">Quantity:</span>
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 p-1">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-sm text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <span className="text-xs text-slate-400">
          Subtotal: <strong className="text-cyan-400 font-bold">${product.price * quantity}</strong>
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Instant 1-Step Guest Order */}
        <Link
          href={`/order?quickBuy=${product.id}&qty=${quantity}`}
          className="py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Zap className="h-4 w-4 fill-slate-950" />
          <span>Fast Order (No Login)</span>
        </Link>

        {/* Add to Bag */}
        <button
          type="button"
          onClick={() => addToCart(product, quantity)}
          className="py-3 px-5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingBag className="h-4 w-4 text-cyan-400" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
