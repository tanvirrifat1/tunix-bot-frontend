'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, CheckCircle2, Zap, AlertTriangle, PackageX } from 'lucide-react';
import { RobotProduct } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useStockModal } from '@/context/StockModalContext';

interface ProductCardProps {
  product: RobotProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { openStockModal } = useStockModal();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const isOutOfStock = !product.inStock || product.stockCount <= 0;

  return (
    <div
      className={`group glass-card rounded-2xl overflow-hidden flex flex-col h-full border transition-all duration-300 ${
        isLight
          ? 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400/80 bg-white'
          : 'border-slate-800/80 hover:border-cyan-500/40'
      }`}
    >
      {/* Product Image Area */}
      <div
        className={`relative aspect-square w-full overflow-hidden flex items-center justify-center p-4 transition-colors ${
          isLight ? 'bg-slate-50/90 border-b border-slate-100' : 'bg-slate-900/90'
        }`}
      >
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

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-rose-600/90 text-white shadow-lg border border-rose-400">
              Stock Out
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge && !isOutOfStock && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase glow-badge backdrop-blur-md">
            {product.badge}
          </div>
        )}

        {/* Category tag */}
        <div
          className={`absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
            isLight
              ? 'bg-white/90 text-slate-700 border-slate-200 shadow-xs'
              : 'bg-slate-950/70 text-slate-300 border-slate-800'
          }`}
        >
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
            <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {product.rating}
            </span>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              ({product.reviewCount} verified setups)
            </span>
          </div>

          {/* Product Title */}
          <Link
            href={`/shop/${product.slug}`}
            className={`block transition-colors ${
              isLight ? 'group-hover:text-cyan-600' : 'group-hover:text-cyan-400'
            }`}
          >
            <h3
              className={`font-bold text-lg leading-snug transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p
            className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {product.tagline}
          </p>

          {/* Feature Highlights */}
          <div
            className={`mt-3.5 space-y-1.5 pt-3 border-t ${
              isLight ? 'border-slate-100' : 'border-slate-800/60'
            }`}
          >
            {product.features.slice(0, 2).map((feat, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-1.5 text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                <CheckCircle2
                  className={`h-3 w-3 shrink-0 mt-0.5 ${
                    isLight ? 'text-cyan-600' : 'text-cyan-400'
                  }`}
                />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div
          className={`mt-5 pt-4 border-t ${
            isLight ? 'border-slate-100' : 'border-slate-800/80'
          }`}
        >
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className={`text-2xl font-black tracking-tight ${
                isLight ? 'text-cyan-600' : 'text-cyan-400'
              }`}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className={`text-sm line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                ${product.originalPrice}
              </span>
            )}
            {isOutOfStock ? (
              <span className="ml-auto text-[11px] font-bold text-rose-500 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Stock Out
              </span>
            ) : (
              <span
                className={`ml-auto text-[11px] font-medium ${
                  isLight ? 'text-emerald-600' : 'text-emerald-400'
                }`}
              >
                In Stock ({product.stockCount})
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {isOutOfStock ? (
              <button
                type="button"
                onClick={() => openStockModal(product)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-rose-500/15 border border-rose-500/40 text-rose-500 hover:bg-rose-500/25 transition-all cursor-pointer"
              >
                <PackageX className="h-3.5 w-3.5" />
                <span>Stock Out</span>
              </button>
            ) : (
              <Link
                href={`/order?quickBuy=${product.id}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-600/20 hover:brightness-110 transition-all always-white"
              >
                <Zap className="h-3.5 w-3.5 fill-white text-white" />
                <span>Order Now</span>
              </Link>
            )}

            {/* Add to Cart */}
            <button
              type="button"
              onClick={() => {
                if (isOutOfStock) {
                  openStockModal(product);
                } else {
                  addToCart(product, 1);
                }
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isOutOfStock
                  ? 'opacity-70 hover:opacity-100 bg-slate-800 text-slate-400 border-slate-700'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border-slate-200'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              <ShoppingBag
                className={`h-3.5 w-3.5 ${
                  isOutOfStock ? 'text-slate-500' : isLight ? 'text-cyan-600' : 'text-cyan-400'
                }`}
              />
              <span>{isOutOfStock ? 'Unavailable' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
