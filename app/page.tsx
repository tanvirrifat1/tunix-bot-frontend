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
  HeartHandshake,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InteractiveHeroRobot from '@/components/InteractiveHeroRobot';

export default function HomePage() {
  const featuredRobots = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Glow background ambiance */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Quick Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-semibold shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Next-Gen Robotic Desk Companions
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Bring Your Desk to Life with{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  Emotional AI
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Autonomous miniature robots that roam your workstation, express emotions on high-res OLED screens, play mini-games, and keep you company while you code, design, and create.
              </p>

              {/* No Login Guarantee Callout */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 max-w-xl mx-auto lg:mx-0 flex items-center gap-3.5 text-left">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">100% Guest-Checkout System</span>
                  <span className="text-slate-400">
                    No login, signup, or password needed. Order with your name and address in under 30 seconds!
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="h-4 w-4 text-slate-950" />
                  <span>Shop Robot Companions</span>
                  <ArrowRight className="h-4 w-4 text-slate-950" />
                </Link>

                <Link
                  href="/order"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <span>Fast Simple Order</span>
                </Link>

                <a
                  href="https://wa.me/8801700000000?text=Hi%20RoboDesk!%20Can%20you%20help%20me%20choose%20a%20desk%20robot?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl font-medium text-xs text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp Advice</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Free Shipping on $150+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
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

      {/* HERO BANNER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
          <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[380px] w-full">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="Desk Robot Companions Lineup"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-md">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1 block">
                  Autonomous Desk Fleet
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Meet Vector, Eilik, Deskimon & Loona
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Ready to deploy directly onto your workspace. No configuration or logins required.
                </p>
              </div>

              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 transition-colors"
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Companions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Adopt Your Favorite Desk Robot
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
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

      {/* WHY A DESK ROBOT COMPANION? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
              The Workspace Revolution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Creators & Engineers Love Desk Robots
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              More than a toy — an interactive mechanical companion engineered to reduce screen fatigue and inspire focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Smile className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Living Personality & Joy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Over 100+ facial emotions and spontaneous reactions. Stroke their head, watch them cheer when you finish code, or let them take a nap during quiet hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pomodoro & Focus Assistance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Set sprint timers, posture checks, and hydration reminders. Gentle robotic chirps keep you in the flow zone without the stress of loud smartphone alarms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Edge-Aware & Autonomous</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optical cliff sensors guarantee your robot never falls off your table. They explore your keyboard perimeter safely and self-dock to charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHENTICATION-FREE SHOPPING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-700/40 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
              <Zap className="h-3.5 w-3.5" />
              Frictionless E-Commerce
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hate Complex Signups? So Do We.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
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
              href="/gallery"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>See Robot Gallery</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
