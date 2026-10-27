'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Package,
  MessageCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  Printer,
  ShoppingBag,
  Zap,
} from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'RBT-2026-NEW';

  const waSupportUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(
    `Hello RoboDesk Support! I just placed order #${orderNumber} and wanted to confirm details.`
  )}`;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Success Card */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow behind check */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Check Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center animate-bounce">
          <CheckCircle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            Order Saved in Database
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Your robot desk companion order has been securely recorded. Our warehouse team is preparing your package for express dispatch.
          </p>
        </div>

        {/* Unique Order ID Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 max-w-md mx-auto space-y-1">
          <span className="text-xs text-slate-400 font-medium">Your Unique Order Tracking Number:</span>
          <p className="text-xl sm:text-2xl font-mono font-black text-cyan-400 tracking-wider">
            {orderNumber}
          </p>
          <span className="text-[11px] text-slate-500 block">
            Save this number to check your package status at any time.
          </span>
        </div>

        {/* What Happens Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" /> 1. Quality Check
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sensors and firmware calibrated before packing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" /> 2. Express Delivery
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Arrives in 2-4 business days via courier.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> 3. Cash on Delivery
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect your robot package upon handover.
            </p>
          </div>
        </div>

        {/* Prominent WhatsApp Contact Action */}
        <div className="pt-2">
          <a
            href={waSupportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="h-5 w-5 fill-slate-950" />
            <span>Chat with Order Specialist on WhatsApp (Order #{orderNumber})</span>
          </a>
        </div>

        {/* Secondary Navigation Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Order Receipt</span>
          </button>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Browse More Robots</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-cyan-400">
          Loading confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
