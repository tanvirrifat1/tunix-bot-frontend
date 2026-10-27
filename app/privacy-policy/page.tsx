import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, Database, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | RoboDesk Labs',
  description:
    'Our authentication-free privacy policy: No customer accounts, no passwords, and zero tracking.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
          <span>Zero-Authentication Privacy Guarantee</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-400">
          Last updated: October 2026 • RoboDesk Labs Platform Privacy Charter
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <Lock className="h-6 w-6 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">No Customer Accounts</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We do not store passwords, usernames, or persistent user profiles. You browse and order freely.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <EyeOff className="h-6 w-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">No Public Exposure</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our order database is protected against spam and harvesting. Customer details are never public.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <Server className="h-6 w-6 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Server-Verified Data</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All prices and orders are validated strictly on our secure backend database.
          </p>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            1. Zero-Authentication Customer Experience
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            RoboDesk is built intentionally without any authentication system. We do not require customer logins, user signups, passwords, JWT tokens, or session cookies. You can browse all robot models, view specifications, and place multiple orders without creating an account.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            2. What Information We Collect and Why
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We practice strict data minimization. When you choose to place an order, we only request:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1 pl-2">
            <li><strong>Full Name:</strong> To identify the recipient upon package delivery.</li>
            <li><strong>Phone Number:</strong> For our delivery courier to call you prior to dispatch.</li>
            <li><strong>Delivery Address:</strong> To route the parcel to your doorstep.</li>
            <li><strong>Optional Email & Order Notes:</strong> If you wish to receive a receipt copy or leave gate instructions.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            3. Order Security & Database Storage
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Orders are saved securely in our backend database with a unique alphanumeric Order Number. Product prices are calculated entirely on the server using trusted records to prevent price tampering. We deploy anti-spam honeypots and rate limiting to prevent automated abuse.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            4. Protection Against Public Order Tracking Leaks
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We do NOT provide a public order tracking API that reveals private customer details or allows enumeration of past orders. To check an order status, a requester must provide both the exact Order Number AND the registered Phone Number. Furthermore, all displayed recipient names and addresses are heavily masked.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            5. No Selling or Sharing of Data
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We will never sell, rent, or trade your phone number, name, or address to third-party marketing companies, advertisers, or telemarketers. Your information is used exclusively to fulfill your robotic companion order.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            6. Direct Inquiries & Data Removal
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            If you ever wish to have your past completed delivery records purged from our database after package delivery, simply contact our support team on WhatsApp or email us at support@robodesk-labs.com.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>Questions regarding our privacy charter?</span>
        <Link href="/contact" className="text-cyan-400 font-semibold hover:underline">
          Contact Our Team →
        </Link>
      </div>
    </div>
  );
}
