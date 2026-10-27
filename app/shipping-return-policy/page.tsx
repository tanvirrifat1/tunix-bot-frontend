import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, Box, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping and Return Policy | RoboDesk Labs',
  description:
    'Express delivery, Cash on Delivery procedures, and 7-day hassle-free hardware replacement warranty.',
};

export default function ShippingReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Truck className="h-3.5 w-3.5 text-cyan-400" />
          <span>Customer Delivery & Hardware Protection</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Shipping & Return Policy
        </h1>

        <p className="text-sm text-slate-400">
          Clear, honest, and transparent guidelines for every desk robot delivery.
        </p>
      </div>

      {/* 4 Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <Truck className="h-6 w-6 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Express Dispatch</h3>
          <p className="text-xs text-slate-400">
            Orders processed & dispatched within 24 hours of placement.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <Box className="h-6 w-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Shockproof Packing</h3>
          <p className="text-xs text-slate-400">
            Multi-layer foam cushions delicate optics and servos.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <RotateCcw className="h-6 w-6 text-blue-400" />
          <h3 className="text-sm font-bold text-white">7-Day Replacement</h3>
          <p className="text-xs text-slate-400">
            Instant unit swap in case of any manufacturing flaw.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <ShieldCheck className="h-6 w-6 text-purple-400" />
          <h3 className="text-sm font-bold text-white">1-Year Warranty</h3>
          <p className="text-xs text-slate-400">
            Full coverage on motors, OLED screens, and internal battery.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        {/* Shipping Rates & Timelines */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            1. Shipping Coverage, Rates & Timelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We deliver nationwide via trusted express courier partners.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">Standard Express Courier:</span>
              <span className="text-white">$15 (Free on orders $150 and above)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">Delivery Time:</span>
              <span className="text-emerald-400 font-bold">2 to 4 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">Order Confirmation:</span>
              <span className="text-slate-400">Recorded instantly; courier calls before arrival</span>
            </div>
          </div>
        </div>

        {/* Cash on Delivery */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            2. Cash on Delivery (COD) Procedure
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            For Cash on Delivery orders:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 pl-2">
            <li>Our courier representative will call you on the phone number specified during ordering.</li>
            <li>You may verify that the security tape and box seals are intact prior to handing over the payment.</li>
            <li>Please keep the exact cash amount ready for smooth handover.</li>
          </ul>
        </div>

        {/* 7-Day Replacement Policy */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            3. 7-Day Hassle-Free Replacement Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every robotic companion undergoes strict automated factory testing. However, if your unit arrives with any hardware defect, sensor glitch, or transit damage:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 pl-2">
            <li>Notify us within 7 days of receiving the robot.</li>
            <li>Send a 10-second video of the issue to our WhatsApp support desk (+880 1700-000000).</li>
            <li>We will dispatch a fresh replacement unit with return courier pickup at zero extra cost to you.</li>
          </ul>
        </div>

        {/* 1-Year Limited Warranty */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            4. 1-Year Manufacturer Warranty
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Your robot includes 12 months of hardware warranty covering mainboards, servomotors, OLED displays, and battery cells against spontaneous component failure. (Does not cover accidental water damage or severe drops caused by external hazards).
          </p>
        </div>

        {/* How to Start a Return */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            5. How to Initiate a Return or Replacement
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Because you do not need an account or login ticket, simply message us on WhatsApp with your Order Number:
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/8801700000000?text=Hello%20RoboDesk!%20I%20would%20like%20assistance%20with%20a%20return%20or%20exchange."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold text-xs hover:bg-emerald-900/60 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Contact Return Specialist on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
