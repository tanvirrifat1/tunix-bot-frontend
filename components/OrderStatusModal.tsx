'use client';

import React, { useState } from 'react';
import { X, Search, ShieldCheck, MessageCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LookupResult {
  orderNumber: string;
  createdAt: string;
  status: string;
  customerName: string;
  maskedAddress: string;
  itemCount: number;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  paymentMethod: string;
  whatsappQueryUrl: string;
}

export default function OrderStatusModal({ isOpen, onClose }: OrderStatusModalProps) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!orderNumber.trim() || !phone.trim()) {
      setError('Please provide both your Order Number and registered Phone Number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/orders?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'No matching order found. Please check your details.');
      } else {
        setResult(data.order);
      }
    } catch {
      setError('Network error occurred. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 backdrop-blur-md transition-opacity ${
            isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
          }`}
          onClick={onClose}
        />

        {/* Modal Window */}
        <div
          className={`relative w-full max-w-lg transform rounded-2xl p-6 sm:p-7 text-left shadow-2xl transition-all border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-600'
                    : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                }`}
              >
                <Search className="h-4 w-4" />
              </div>
              <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Track Your Robot Order
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'text-slate-400 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className={`mt-3 text-xs leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Because Tunix-Bot is 100% authentication-free, you do not need an account. Simply enter your Order Number and Phone Number to check real-time status.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                Order Number
              </label>
              <input
                type="text"
                placeholder="e.g. RBT-2026-ABCD1234"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500'
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                Phone Number (Used during ordering)
              </label>
              <input
                type="tel"
                placeholder="e.g. 01700000000 or +1 555-0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    : 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500'
                }`}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer always-white shadow-md shadow-cyan-600/20"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Search className="h-4 w-4 text-white" />
                  <span>Look Up Order</span>
                </>
              )}
            </button>
          </form>

          {/* Order Result Card */}
          {result && (
            <div
              className={`mt-6 p-4 rounded-xl border text-left space-y-3 animate-fade-in ${
                isLight ? 'bg-slate-50 border-cyan-300/60' : 'bg-slate-950/90 border-cyan-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Order ID:</span>
                  <p className="text-sm font-mono font-bold text-cyan-600">{result.orderNumber}</p>
                </div>
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    isLight
                      ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}
                >
                  {result.status}
                </div>
              </div>

              {/* Status progression bar */}
              <div className="py-2">
                <div
                  className={`grid grid-cols-4 gap-1 text-[10px] text-center font-medium ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <div className="text-cyan-600 font-bold">Confirmed</div>
                  <div className={['Processing', 'Shipped', 'Delivered'].includes(result.status) ? 'text-cyan-600 font-bold' : ''}>Processing</div>
                  <div className={['Shipped', 'Delivered'].includes(result.status) ? 'text-cyan-600 font-bold' : ''}>Shipped</div>
                  <div className={result.status === 'Delivered' ? 'text-emerald-600 font-bold' : ''}>Delivered</div>
                </div>
                <div
                  className={`mt-1 w-full h-1.5 rounded-full overflow-hidden ${
                    isLight ? 'bg-slate-200' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{
                      width:
                        result.status === 'Delivered'
                          ? '100%'
                          : result.status === 'Shipped'
                          ? '75%'
                          : result.status === 'Processing'
                          ? '50%'
                          : '25%',
                    }}
                  />
                </div>
              </div>

              <div
                className={`pt-2 border-t text-xs space-y-1 ${
                  isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex justify-between">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Recipient:</span>
                  <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{result.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Destination:</span>
                  <span>{result.maskedAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Total Amount:</span>
                  <span className="font-bold text-cyan-600">${result.totalAmount} ({result.paymentMethod})</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Items:</span>
                  <span>
                    {result.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                  </span>
                </div>
              </div>

              {/* WhatsApp direct query */}
              <div className="pt-2">
                <a
                  href={result.whatsappQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300 hover:bg-emerald-900/60'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  Ask question about this order on WhatsApp
                </a>
              </div>
            </div>
          )}

          <div
            className={`mt-4 pt-3 border-t text-center ${
              isLight ? 'border-slate-100' : 'border-slate-800/80'
            }`}
          >
            <span
              className={`text-[11px] flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-500'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
              Private & masked order tracking. Zero public data exposure.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
