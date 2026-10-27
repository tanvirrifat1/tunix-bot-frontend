'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, PackageX, MessageCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { RobotProduct } from '@/lib/types';
import { useTheme } from '@/context/ThemeContext';

interface StockOutModalProps {
  isOpen: boolean;
  product: RobotProduct | null;
  onClose: () => void;
}

export default function StockOutModal({ isOpen, product, onClose }: StockOutModalProps) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const waPreorderUrl = product
    ? `https://wa.me/8801904482088?text=${encodeURIComponent(
        `Hi Tunix-Bot! I noticed that the ${product.name} is currently Out of Stock. When will it be back in stock or can I pre-order?`
      )}`
    : 'https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20want%20to%20inquire%20about%20out-of-stock%20robot%20availability.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 backdrop-blur-md transition-opacity duration-300 ${
          isLight ? 'bg-slate-900/40' : 'bg-black/75'
        }`}
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="stockout-modal-title"
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all duration-300 z-10 animate-fade-in ${
          isLight
            ? 'bg-white border-rose-200 text-slate-800'
            : 'bg-slate-900/95 border-rose-500/40 text-slate-100'
        }`}
      >
        {/* Subtle red accent glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer ${
            isLight
              ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-5">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 bg-rose-500/15 border border-rose-500/30 text-rose-500 shadow-lg shadow-rose-500/10">
            <PackageX className="h-6 w-6" />
          </div>
          <div className="pr-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                Out of Stock
              </span>
            </div>
            <h3
              id="stockout-modal-title"
              className={`text-xl sm:text-2xl font-black mt-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              স্টক আউট! অর্ডার করা সম্ভব নয়
            </h3>
          </div>
        </div>

        {/* Product preview if provided */}
        {product && (
          <div
            className={`p-3.5 rounded-2xl border flex items-center gap-3.5 mb-5 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-950/80 border-slate-800'
            }`}
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700/40 bg-slate-900 flex items-center justify-center p-1">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="64px"
                className="object-contain p-1 opacity-70 grayscale-30"
              />
              <div className="absolute inset-0 bg-rose-950/20" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {product.name}
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                ${product.price} • {product.category}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 mt-0.5">
                <AlertTriangle className="h-3 w-3" /> 0 Units Available
              </span>
            </div>
          </div>
        )}

        {/* Explanation Message */}
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 mb-6 ${
            isLight
              ? 'bg-rose-50/80 border-rose-200 text-rose-900'
              : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
          }`}
        >
          <p className="font-semibold text-rose-500">
            দুঃখিত! এই রোবটটির বর্তমান স্টক সম্পূর্ণ শেষ হয়ে গেছে।
          </p>
          <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
            স্টক শেষ থাকায় সাময়িকভাবে এটি অর্ডার করা যাচ্ছে না। আপনি চাইলে হোয়াটসঅ্যাপে যোগাযোগ করে অগ্রিম প্রি-অর্ডার (Pre-order) করতে পারেন অথবা নতুন স্টক আসার সাথে সাথে আপডেট পেতে পারেন।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Pre-order button */}
          <a
            href={waPreorderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer always-white"
          >
            <MessageCircle className="h-4 w-4 fill-white text-white" />
            <span>Pre-order on WhatsApp (01904482088)</span>
          </a>

          {/* Browse Available Robots Button */}
          <Link
            href="/shop"
            onClick={onClose}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
          >
            <span>অন্যান্য রোবট দেখুন (Browse In-Stock Robots)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
