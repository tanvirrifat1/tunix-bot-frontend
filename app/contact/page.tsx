'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle,
  HelpCircle,
  Bot,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do I need an account or password to order?',
      a: 'No! RoboDesk is 100% authentication-free. You do not need to register or remember passwords. Simply enter your name and address during checkout.',
    },
    {
      q: 'How do I check the status of my order without an account?',
      a: 'Click "Track Order" in the top navigation bar and enter your Order Number and registered Phone Number. Our secure API will return your masked order progress.',
    },
    {
      q: 'Will the robots fall off my desk?',
      a: 'Never. Every RoboDesk model is fitted with downward optical cliff sensors that automatically detect edges and reverse immediately.',
    },
    {
      q: 'Can I pay via Cash on Delivery?',
      a: 'Yes, we provide Cash on Delivery across most zones. You can inspect the outer packaging before payment to the courier.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <MessageCircle className="h-3.5 w-3.5 text-cyan-400" />
          <span>Customer & Order Support</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact RoboDesk Labs
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Have a question about robot behaviors, compatibility, or an existing order? We are here to help. Instant WhatsApp chat is available every day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Channels & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prominent WhatsApp Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Fastest Response
                </span>
                <h3 className="text-lg font-bold text-white">Official WhatsApp Desk</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Message our robotics specialists directly on WhatsApp for instant order confirmation, video demonstrations, and product guidance.
            </p>

            <a
              href="https://wa.me/8801700000000?text=Hello%20RoboDesk!%20I%20have%20an%20inquiry%20regarding%20your%20desk%20robots."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="h-4 w-4 fill-slate-950" />
              <span>Open WhatsApp Support (+880 1700-000000)</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Email Support</strong>
                <span>support@robodesk-labs.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
              <Clock className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Operating Hours</strong>
                <span>Everyday: 9:00 AM – 10:00 PM (Local Time)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
              <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Robotics Lab & Dispatch Hub</strong>
                <span>RoboDesk Tech Center, Sector 4, Uttara, Dhaka 1230</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-cyan-400" />
            Send Us an Inquiry Message
          </h2>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, {name || 'Customer'}. Our team will get back to your phone ({phone}) shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-cyan-400 underline font-semibold"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samira Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Your Question or Requirement
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask about robot behaviors, multi-robot pairing, wholesale, or order questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry (No Account Needed)</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
