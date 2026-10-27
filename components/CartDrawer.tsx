'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, Bot, PackageX } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useStockModal } from '@/context/StockModalContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItems } = useCart();
  const { openStockModal } = useStockModal();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const outOfStockItem = cart.find(
    (item) => !item.product.inStock || item.product.stockCount <= 0
  );
  const hasOutOfStock = !!outOfStockItem;

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-xs transition-opacity ${
          isLight ? 'bg-slate-900/30' : 'bg-slate-950/70'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md shadow-2xl flex flex-col transition-colors border-l ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}
        >
          {/* Header */}
          <div
            className={`p-5 border-b flex items-center justify-between ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-600'
                    : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                }`}
              >
                <Bot className="h-4 w-4" />
              </div>
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Your Robot Bag
              </h2>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                  isLight
                    ? 'bg-slate-100 text-cyan-700 border-slate-200'
                    : 'bg-slate-800 text-cyan-400 border-slate-700'
                }`}
              >
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight
                  ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div
            className={`px-5 py-3 border-b text-xs ${
              isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            {remainingForFree > 0 ? (
              <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                Add <strong className={isLight ? 'text-cyan-700' : 'text-cyan-400'}>${remainingForFree}</strong> more to unlock <strong>Free Shipping!</strong>
              </p>
            ) : (
              <p className="text-emerald-500 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> You have unlocked FREE Express Delivery!
              </p>
            )}
            <div
              className={`mt-2 w-full h-1.5 rounded-full overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-800'
              }`}
            >
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                    isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800/80 text-slate-500'
                  }`}
                >
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className={`text-base font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Your bag is empty
                </h3>
                <p className={`text-xs max-w-xs mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Browse our desk companion robots and adopt your favorite robotic buddy!
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors always-white"
                  >
                    Explore Robots
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className={`p-3.5 rounded-xl border flex gap-3.5 items-center transition-colors ${
                    isLight
                      ? 'bg-slate-50/80 border-slate-200'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div
                    className={`relative w-16 h-16 rounded-lg border shrink-0 overflow-hidden ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {item.product.name}
                    </h4>
                    <p
                      className={`text-xs font-bold mt-0.5 ${
                        isLight ? 'text-cyan-700' : 'text-cyan-400'
                      }`}
                    >
                      ${item.product.price}
                    </p>

                    {(!item.product.inStock || item.product.stockCount <= 0) && (
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 inline-flex items-center gap-1 mt-1">
                        <PackageX className="h-3 w-3" /> Stock Out
                      </span>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      {/* Quantity controls */}
                      <div
                        className={`flex items-center rounded-lg border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-slate-800 border-slate-700 text-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className={`p-1 transition-colors cursor-pointer ${
                            isLight
                              ? 'text-slate-500 hover:text-slate-900'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className={`px-2 text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className={`p-1 transition-colors cursor-pointer ${
                            isLight
                              ? 'text-slate-500 hover:text-slate-900'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors ml-auto cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Action */}
          {cart.length > 0 && (
            <div
              className={`p-5 border-t space-y-3 transition-colors ${
                isLight ? 'border-slate-100 bg-white' : 'border-slate-800 bg-slate-950/90'
              }`}
            >
              <div
                className={`space-y-1.5 text-xs ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-semibold">
                    {subtotal >= 150 ? 'FREE' : '$15'}
                  </span>
                </div>
                <div
                  className={`flex justify-between pt-1 border-t text-sm font-bold ${
                    isLight ? 'border-slate-100 text-slate-900' : 'border-slate-800 text-white'
                  }`}
                >
                  <span>Estimated Total</span>
                  <span
                    className={`font-extrabold text-base ${
                      isLight ? 'text-cyan-700' : 'text-cyan-400'
                    }`}
                  >
                    ${subtotal + (subtotal >= 150 ? 0 : 15)}
                  </span>
                </div>
              </div>

              {/* Instant No-Auth Checkout Button / Stock Out prevention */}
              {hasOutOfStock ? (
                <button
                  type="button"
                  onClick={() => openStockModal(outOfStockItem?.product)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-rose-500/15 border border-rose-500/50 text-rose-400 flex items-center justify-center gap-2 hover:bg-rose-500/25 transition-all cursor-pointer shadow-md shadow-rose-500/10"
                >
                  <PackageX className="h-4 w-4" />
                  <span>অর্ডার অসম্ভব (স্টক শেষ হয়েছে)</span>
                </button>
              ) : (
                <Link
                  href="/order"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 hover:brightness-110 transition-all always-white"
                >
                  <Zap className="h-4 w-4 fill-white text-white" />
                  <span>Fast Order (No Login Required)</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>
              )}

              <div
                className={`flex items-center justify-center gap-1.5 text-[11px] ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Zero registration. Enter name & address on next step.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
