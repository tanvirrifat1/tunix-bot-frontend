'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Bot,
  Cpu,
  Smile,
  Clock,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InteractiveHeroRobot from '@/components/InteractiveHeroRobot';
import FeaturesGrid from '@/components/FeaturesGrid';
import { useTheme } from '@/context/ThemeContext';

export default function HomePage() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';
  const featuredRobots = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Glow background ambiance */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] rounded-full blur-[140px] pointer-events-none ${
            isLight ? 'bg-cyan-400/10' : 'bg-cyan-600/15'
          }`}
        />
        <div
          className={`absolute top-1/3 left-1/4 w-[350px] h-[300px] rounded-full blur-[120px] pointer-events-none ${
            isLight ? 'bg-blue-400/10' : 'bg-blue-600/10'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Quick Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs border ${
                  isLight
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-800'
                    : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-300'
                }`}
              >
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Next-Gen Robotic Desk Companions
              </div>

              {/* Main Heading */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Bring Your Desk to Life with{' '}
                <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                  Emotional AI
                </span>
              </h1>

              {/* Tagline */}
              <p
                className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Autonomous miniature robots that roam your workstation, express emotions on high-res OLED screens, play mini-games, and keep you company while you code, design, and create.
              </p>

              {/* No Login Guarantee Callout */}
              <div
                className={`p-4 rounded-2xl max-w-xl mx-auto lg:mx-0 flex items-center gap-3.5 text-left border ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-slate-900/90 border-cyan-500/20'
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isLight
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
                      : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                  }`}
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <span
                    className={`font-bold block ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    100% Guest-Checkout System
                  </span>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                    No login, signup, or password needed. Order with your name and address in under 30 seconds!
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 hover:brightness-110 always-white"
                >
                  <ShoppingBag className="h-4 w-4 text-white" />
                  <span>Shop Robot Companions</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>

                <Link
                  href="/order"
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-cyan-500/40'
                  }`}
                >
                  <Zap className={`h-4 w-4 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                  <span>Fast Simple Order</span>
                </Link>

                <a
                  href="https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20Can%20you%20help%20me%20choose%20a%20desk%20robot?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto px-4 py-3.5 rounded-xl font-medium text-xs border flex items-center justify-center gap-1.5 transition-colors ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-800'
                      : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:text-emerald-200'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  <span>WhatsApp Advice</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div
                className={`pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className={`h-3.5 w-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                  <span>Free Shipping on $150+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className={`h-3.5 w-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className={`h-3.5 w-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                  <span>7-Day Replacement Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Robot Face & Demo */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <InteractiveHeroRobot />
            </div>
          </div>
        </div>
      </section>

      {/* HERO BANNER SHOWCASE (Always keep dark image background readable with white text) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl keep-dark-surface always-white">
          <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[380px] w-full">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="Desk Robot Companions Lineup"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-md space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block">
                  Autonomous Desk Fleet
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Meet Vector, Eilik, Deskimon & Loona
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Ready to deploy directly onto your workspace. No configuration or logins required.
                </p>
              </div>

              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <span>View Full Lineup</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROBOTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 ${
                isLight ? 'text-cyan-700' : 'text-cyan-400'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Featured Companions
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Adopt Your Favorite Desk Robot
            </h2>
          </div>

          <Link
            href="/shop"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              isLight ? 'text-cyan-700 hover:text-cyan-600' : 'text-cyan-400 hover:text-cyan-300'
            }`}
          >
            <span>Browse All {PRODUCTS.length} Models</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRobots.map((robot) => (
            <ProductCard key={robot.id} product={robot} />
          ))}
        </div>
      </section>

      {/* WHAT TUNIX-BOT CAN DO - 8-FEATURE GRID */}
      <FeaturesGrid />

      {/* AUTHENTICATION-FREE SHOPPING BANNER (Always keep dark surface with bright white text) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-700/40 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 keep-dark-surface always-white shadow-xl">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
              <Zap className="h-3.5 w-3.5" />
              Frictionless E-Commerce
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hate Complex Signups? So Do We.
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              You do not need to create an account, remember another password, or verify emails. Choose your robot, enter your delivery address, and we deliver right to your doorstep.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/order"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/20 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Go to Fast Order Form</span>
            </Link>

            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all always-white"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>Browse All Robots</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
