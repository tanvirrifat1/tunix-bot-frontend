import React from 'react';
import Link from 'next/link';
import { Bot, Shield, Truck, RotateCcw, MessageCircle, Heart, Lock, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* Guarantees Bar */}
      <div className="border-b border-slate-900 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Zero Authentication</h4>
              <p className="text-xs text-slate-400">No passwords or accounts. 1-click simple checkout.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Express Safe Delivery</h4>
              <p className="text-xs text-slate-400">Shockproof courier packaging & tracking update.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">7-Day Replacement</h4>
              <p className="text-xs text-slate-400">Hassle-free hardware warranty & support.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">WhatsApp Assistance</h4>
              <p className="text-xs text-slate-400">Direct instant messaging for any question.</p>
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
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Bot className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-white">
                Tunix<span className="text-cyan-400">-Bot</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Tunix-Bot builds and delivers high-performance autonomous desk companions. Engineered for software engineers, designers, gamers, and robot enthusiasts who appreciate tactile mechanics and expressive AI presence.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20have%20an%20order%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50 text-emerald-300 text-xs font-semibold hover:bg-emerald-800/30 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                WhatsApp: 01904482088
              </a>
            </div>
          </div>

          {/* Shop Robots Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Shop Robots</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-cyan-400 transition-colors">
                  All Robot Models
                </Link>
              </li>
              <li>
                <Link href="/shop/vector-x1-cyber-scout" className="hover:text-cyan-400 transition-colors">
                  Vector X1 Cyber Scout
                </Link>
              </li>
              <li>
                <Link href="/shop/eilik-emotion-bot" className="hover:text-cyan-400 transition-colors">
                  Eilik Emotion Bot
                </Link>
              </li>
              <li>
                <Link href="/shop/deskimon-duo-bundle" className="hover:text-cyan-400 transition-colors">
                  Deskimon Duo Set
                </Link>
              </li>
              <li>
                <Link href="/shop/emo-ai-desktop-companion" className="hover:text-cyan-400 transition-colors">
                  EMO AI Companion
                </Link>
              </li>
              <li>
                <Link href="/shop/loona-smart-quadruped-pet" className="hover:text-cyan-400 transition-colors">
                  Loona Smart Quadruped
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gallery" className="hover:text-cyan-400 transition-colors">
                  Robot Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us & Engineering
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-cyan-400 transition-colors">
                  Simple Order Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Policies (Authentication-Free) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Trust & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy (No Accounts)
                </Link>
              </li>
              <li>
                <Link href="/shipping-return-policy" className="hover:text-cyan-400 transition-colors">
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
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
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Tunix-Bot Labs. Built with precision for desk companion enthusiasts.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-400">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/shipping-return-policy" className="hover:text-slate-400">
              Returns & Shipping
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-400">
              WhatsApp Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
