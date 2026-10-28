'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  ShoppingBag,
  MessageCircle,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import OrderStatusModal from './OrderStatusModal';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const isLight = mounted && theme === 'light';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Robots', href: '/shop' },
    { name: 'Features', href: '/features' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const waUrl = 'https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20have%20a%20question%20about%20your%20desk%20robots.';

  return (
    <>
      {/* Top Banner Notice */}
      <div
        className={`border-b text-xs py-2 px-4 text-center flex items-center justify-center gap-2 transition-colors ${isLight
            ? 'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 text-white border-cyan-500/30'
            : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-cyan-800/30 text-cyan-200'
          }`}
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span>
          <strong>Tunix-Bot 100% Guest Friendly:</strong> No login or passwords needed.
        </span>
        <span className={`hidden md:inline ${isLight ? 'text-white/60' : 'text-slate-400'}`}>|</span>
        <span className={`hidden md:inline font-semibold ${isLight ? 'text-emerald-100' : 'text-emerald-400'}`}>
          Free Delivery on orders $150+
        </span>
        <span className={`hidden sm:inline ${isLight ? 'text-white/60' : 'text-slate-400'}`}>|</span>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden sm:inline underline font-bold ${isLight ? 'text-white hover:text-cyan-100' : 'text-cyan-300 hover:text-white'
            }`}
        >
          WhatsApp: 01904482088
        </a>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-colors backdrop-blur-xl ${isLight
            ? 'bg-white/90 border-b border-slate-200/90 shadow-sm'
            : 'bg-slate-950/80 border-b border-slate-800/80 glass-panel'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-extrabold text-xl tracking-tight transition-colors ${isLight
                        ? 'text-slate-900 group-hover:text-cyan-600'
                        : 'text-white group-hover:text-cyan-400'
                      }`}
                  >
                    Tunix<span className={isLight ? 'text-cyan-600' : 'text-cyan-400'}>-Bot</span>
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${isLight
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                      }`}
                  >
                    AI LABS
                  </span>
                </div>
                <p className={`text-[11px] tracking-wide ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Autonomous Desk Companions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? isLight
                          ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-semibold'
                          : 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* White Mode / Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm ${isLight
                    ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 hover:text-cyan-600'
                    : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-amber-300 hover:border-cyan-500/50'
                  }`}
                title={isLight ? 'Switch to Dark Mode' : 'Switch to White Mode'}
                aria-label="Toggle theme mode"
              >
                {isLight ? (
                  <Moon className="h-4 w-4 text-cyan-600" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-300 animate-spin-slow" />
                )}
              </button>

              {/* Order Status Lookup Button */}
              {/* <button
                type="button"
                onClick={() => setStatusModalOpen(true)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isLight
                    ? 'text-slate-700 bg-slate-100 hover:bg-slate-200/80 border-slate-200 hover:border-cyan-300 hover:text-cyan-700 shadow-sm'
                    : 'text-slate-300 bg-slate-800/80 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
                }`}
                title="Lookup Order Status"
              >
                <Search className={`h-3.5 w-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                <span>Track Order</span>
              </button> */}

              {/* WhatsApp Hotline */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${isLight
                    ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200'
                    : 'text-emerald-300 bg-emerald-950/40 border-emerald-800/60 hover:bg-emerald-900/40'
                  }`}
                title="WhatsApp: 01904482088"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>01904482088</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all shadow-sm ${isLight
                    ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800 hover:border-cyan-400'
                    : 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/30 text-white hover:border-cyan-400'
                  }`}
                aria-label="Open Cart"
              >
                <ShoppingBag className={`h-5 w-5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                <span className="hidden sm:inline text-xs font-bold">Bag</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center h-5 w-5 text-[11px] font-black rounded-full bg-cyan-500 text-white animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg focus:outline-none transition-colors ${isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 transition-colors ${isLight
                ? 'bg-white/98 border-slate-200 shadow-xl'
                : 'bg-slate-950/98 border-slate-800 backdrop-blur-xl'
              }`}
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${pathname === link.href
                      ? isLight
                        ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-semibold'
                        : 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                      : isLight
                        ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div
              className={`pt-3 border-t flex flex-col gap-2 ${isLight ? 'border-slate-200' : 'border-slate-800/80'
                }`}
            >
              <div
                className={`flex items-center justify-between p-2 rounded-lg border ${isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-900 border-slate-800'
                  }`}
              >
                <span className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Theme:
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${isLight
                      ? 'bg-white text-cyan-700 border-slate-300 shadow-sm'
                      : 'bg-slate-800 text-cyan-400 border-slate-700'
                    }`}
                >
                  {isLight ? (
                    <>
                      <Moon className="h-3.5 w-3.5 text-cyan-600" />
                      <span>White Mode (Click for Dark)</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-300" />
                      <span>Dark Mode (Click for White)</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStatusModalOpen(true);
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border ${isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
              >
                <Search className={`h-4 w-4 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                Track Existing Order
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border ${isLight
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  }`}
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                Chat on WhatsApp (01904482088)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Order Status Modal */}
      <OrderStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </>
  );
}
