'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Shield, Truck, RotateCcw, MessageCircle, Lock, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  return (
    <footer
      className={`border-t transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-600'
          : 'bg-slate-950 border-slate-800 text-slate-400'
      } text-sm`}
    >
      {/* Guarantees Bar */}
      <div
        className={`border-b py-8 transition-colors ${
          isLight ? 'border-slate-200 bg-slate-50/80' : 'border-slate-900 bg-slate-900/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-cyan-50 border-cyan-200 text-cyan-600'
                  : 'bg-cyan-950/60 border-cyan-800/40 text-cyan-400'
              }`}
            >
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Zero Authentication
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                No passwords or accounts. 1-click simple checkout.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
              }`}
            >
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Express Safe Delivery
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Shockproof courier packaging & tracking update.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-blue-950/60 border-blue-800/40 text-blue-400'
              }`}
            >
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                7-Day Replacement
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Hassle-free hardware warranty & support.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                WhatsApp Assistance
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Direct instant messaging for any question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className={`font-bold text-xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Tunix<span className={isLight ? 'text-cyan-600' : 'text-cyan-400'}>-Bot</span>
              </span>
            </Link>
            <p className={`text-sm max-w-sm leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Tunix-Bot builds and delivers high-performance autonomous desk companions. Engineered for software engineers, designers, gamers, and robot enthusiasts who appreciate tactile mechanics and expressive AI presence.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20have%20an%20order%20question."
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300 hover:bg-emerald-800/30'
                }`}
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                WhatsApp: 01904482088
              </a>
            </div>
          </div>

          {/* Shop Robots Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
              Shop Robots
            </h4>
            <ul className={`space-y-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <li>
                <Link href="/shop" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  All Robot Models
                </Link>
              </li>
              <li>
                <Link href="/shop/vector-x1-cyber-scout" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Vector X1 Cyber Scout
                </Link>
              </li>
              <li>
                <Link href="/shop/eilik-emotion-bot" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Eilik Emotion Bot
                </Link>
              </li>
              <li>
                <Link href="/shop/deskimon-duo-bundle" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Deskimon Duo Set
                </Link>
              </li>
              <li>
                <Link href="/shop/emo-ai-desktop-companion" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  EMO AI Companion
                </Link>
              </li>
              <li>
                <Link href="/shop/loona-smart-quadruped-pet" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Loona Smart Quadruped
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience & Company */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
              Explore
            </h4>
            <ul className={`space-y-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <li>
                <Link href="/features" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Robot Features
                </Link>
              </li>
              <li>
                <Link href="/about" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  About Us & Engineering
                </Link>
              </li>
              <li>
                <Link href="/contact" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/order" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Simple Order Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Policies (Authentication-Free) */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
              Trust & Legal
            </h4>
            <ul className={`space-y-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <li>
                <Link href="/privacy-policy" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Privacy Policy (No Accounts)
                </Link>
              </li>
              <li>
                <Link href="/shipping-return-policy" className={isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}>
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <div
                  className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 font-semibold mb-1 ${
                      isLight ? 'text-cyan-700' : 'text-cyan-400'
                    }`}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Zero Account Policy
                  </div>
                  We never store passwords or harvest unnecessary personal data.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight
              ? 'border-slate-200 text-slate-500'
              : 'border-slate-900 text-slate-500'
          }`}
        >
          <p>© 2026 Tunix-Bot Labs. Built with precision for desk companion enthusiasts.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className={isLight ? 'hover:text-slate-800' : 'hover:text-slate-400'}>
              Privacy
            </Link>
            <span>•</span>
            <Link href="/shipping-return-policy" className={isLight ? 'hover:text-slate-800' : 'hover:text-slate-400'}>
              Returns & Shipping
            </Link>
            <span>•</span>
            <Link href="/contact" className={isLight ? 'hover:text-slate-800' : 'hover:text-slate-400'}>
              WhatsApp Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
