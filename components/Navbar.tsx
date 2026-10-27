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
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Robots', href: '/shop' },
    { name: 'Robot Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const waUrl = 'https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20have%20a%20question%20about%20your%20desk%20robots.';

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-800/30 text-xs py-2 px-4 text-center text-cyan-200 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span>
          <strong>Tunix-Bot 100% Guest Friendly:</strong> No login or passwords needed.
        </span>
        <span className="hidden md:inline text-slate-400">|</span>
        <span className="hidden md:inline text-emerald-400 font-medium">
          Free Delivery on orders $150+
        </span>
        <span className="hidden sm:inline text-slate-400">|</span>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline text-cyan-300 hover:text-white underline font-semibold"
        >
          WhatsApp: 01904482088
        </a>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    Tunix<span className="text-cyan-400">-Bot</span>
                  </span>
                  <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    AI LABS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 tracking-wide">
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
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
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-colors flex items-center justify-center"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-300 animate-spin-slow" />
                ) : (
                  <Moon className="h-4 w-4 text-cyan-500" />
                )}
              </button>

              {/* Order Status Lookup Button */}
              <button
                type="button"
                onClick={() => setStatusModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                title="Lookup Order Status"
              >
                <Search className="h-3.5 w-3.5 text-cyan-400" />
                <span>Track Order</span>
              </button>

              {/* WhatsApp Hotline */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 transition-colors"
                title="WhatsApp: 01904482088"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>01904482088</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-white hover:border-cyan-400 transition-all shadow-sm"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5 text-cyan-400" />
                <span className="hidden sm:inline text-xs font-bold">Bag</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center h-5 w-5 text-[11px] font-black rounded-full bg-cyan-400 text-slate-950 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-300 font-medium">Appearance:</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-cyan-400 border border-slate-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-300" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Dark Mode</span>
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                <Search className="h-4 w-4 text-cyan-400" />
                Track Existing Order
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
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
