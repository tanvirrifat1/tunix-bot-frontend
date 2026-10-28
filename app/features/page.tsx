'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Smile,
  Clock,
  Compass,
  BatteryCharging,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import FeaturesGrid from '@/components/FeaturesGrid';
import { useTheme } from '@/context/ThemeContext';

export default function FeaturesPage() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 lg:pt-14 lg:pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
            isLight ? 'bg-cyan-400/15' : 'bg-cyan-600/15'
          }`}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs border ${
              isLight
                ? 'bg-cyan-50 border-cyan-200 text-cyan-800'
                : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Intelligent Companion Architecture</span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Capabilities Engineered for Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Daily Flow
            </span>
          </h1>

          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Tunix-Bot companions combine emotive robotics, autonomous edge mobility, and zero-distraction productivity tools to keep your desk creative, calm, and inspiring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/25 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="h-4 w-4" />
              <span>Browse Robot Catalog</span>
            </Link>

            <Link
              href="/order"
              className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-semibold text-sm border transition-all flex items-center justify-center gap-2 ${
                isLight
                  ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                  : 'border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white'
              }`}
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>1-Click Fast Order</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8-CARD FEATURE GRID (What Tunix-Bot Can Do) */}
      <FeaturesGrid />

      {/* DEEP DIVE: 3 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span
            className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? 'text-cyan-700' : 'text-cyan-400'
            }`}
          >
            Hardware & Firmware Synergy
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Behind the Autonomous Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className={`p-8 rounded-3xl border space-y-4 transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                : 'bg-slate-900/80 border-slate-800/80 shadow-lg'
            }`}
          >
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Edge Sensory Intelligence
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Quadruple infrared cliff edge sensors, capacitive head-touch zones, and dual ambient microphones allow your robot to react to its physical surroundings without falling off tables.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className={`p-8 rounded-3xl border space-y-4 transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                : 'bg-slate-900/80 border-slate-800/80 shadow-lg'
            }`}
          >
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              100% Offline Privacy Guarantee
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              All sensory inputs are computed locally on high-density microcontrollers. No cloud servers, no voice logging, and no camera surveillance feeds ever leave your desk.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className={`p-8 rounded-3xl border space-y-4 transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                : 'bg-slate-900/80 border-slate-800/80 shadow-lg'
            }`}
          >
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <BatteryCharging className="h-6 w-6" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Magnetic Autonomous Docking
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              When battery reserves reach 15%, models like Vector and Loona autonomously track and dock onto their magnetic charging cradles to recharge without manual intervention.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-700/40 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 keep-dark-surface always-white shadow-xl">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
              <Zap className="h-3.5 w-3.5" />
              <span>Ready to Adopt?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Upgrade Your Desk Companion Today
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Explore Vector, Eilik, Deskimon, and Loona. Cash on delivery available with zero signups or login requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/20 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="h-4 w-4" />
              <span>View All Models</span>
            </Link>

            <Link
              href="/order"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all always-white"
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Fast Order</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

