import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, Cpu, Heart, ShieldCheck, Zap, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | RoboDesk Labs',
  description:
    'The story, engineering principles, and zero-authentication philosophy behind RoboDesk autonomous companions.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Bot className="h-3.5 w-3.5 text-cyan-400" />
          <span>Engineering Desk Companions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Crafting Robotic Friends for Modern Workspaces
        </h1>

        <p className="text-base text-slate-300 leading-relaxed">
          At RoboDesk Labs, we believe that spending 8 to 12 hours a day staring at flat digital screens shouldn&apos;t feel lonely or clinical. We design autonomous, tactile desk companions that infuse your daily grind with warmth, curiosity, and play.
        </p>
      </div>

      {/* Visual Banner */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <Image
          src="/images/hero/hero-banner.jpg"
          alt="RoboDesk Engineering Workshop"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
            Crafted for Creators
          </span>
          <p className="text-sm sm:text-base font-semibold mt-1">
            Engineered with high-contrast OLED faces, whisper-quiet micro-servos, and drop protection.
          </p>
        </div>
      </div>

      {/* The 3 Core Engineering Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Our Three Engineering Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Autonomous Spatial Safety</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every robot is equipped with downward infrared cliff sensors that scan the desk perimeter 50 times per second. You will never see your robot fall off the table or damage itself.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Emotional Resonance Firmware</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We reject rigid robotic voices. Our robots express joy, curiosity, focus, and playful mischief through organic OLED animations, dynamic gaze tracking, and harmonic chirps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero-Auth Privacy Philosophy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We do not track you. We do not require customer logins, passwords, or data harvesting accounts. You can browse, inspect, and order freely as a guest in 30 seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Why No Logins */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-cyan-800/40 space-y-4">
        <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>Our Zero-Authentication Commitment</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Why Doesn&apos;t RoboDesk Have Customer Logins or Passwords?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Modern web commerce has become bloated with mandatory account creation, email verification links, forgotten password resets, and marketing trackers. We believe buying a companion robot should be as simple and delightful as visiting a local workshop.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          When you place an order, our servers calculate genuine prices from our database, save your delivery address strictly for shipping, generate an order number, and wipe temporary session tokens. You remain in complete control.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-white">Ready to choose your desk companion?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Browse our collection or consult with an engineer directly on WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5"
          >
            <span>Browse Shop</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="https://wa.me/8801700000000?text=Hi%20RoboDesk!%20I'd%20like%20to%20learn%20more%20about%20your%20company."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
