'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { RobotProduct } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: RobotProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-slate-900/90 overflow-hidden flex items-center justify-center p-4">
        {/* Glow behind image on hover */}
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <Link href={`/shop/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase glow-badge backdrop-blur-md">
            {product.badge}
          </div>
        )}

        {/* Category tag */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/70 text-slate-300 border border-slate-800">
          {product.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-white">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount} verified desk setups)</span>
          </div>

          {/* Product Title */}
          <Link href={`/shop/${product.slug}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-lg text-white leading-snug">{product.name}</h3>
          </Link>

          {/* Tagline */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Feature Highlights */}
          <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-800/60">
            {product.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-black text-cyan-400 tracking-tight">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="ml-auto text-[11px] text-emerald-400 font-medium">
              In Stock ({product.stockCount})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Quick 1-Click Order Form */}
            <Link
              href={`/order?quickBuy=${product.id}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-600/20 hover:brightness-110 transition-all"
            >
              <Zap className="h-3.5 w-3.5 fill-white text-white" />
              <span>Order Now</span>
            </Link>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-cyan-400" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
