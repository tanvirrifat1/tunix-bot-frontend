'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  glowColor?: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: '😊',
    title: 'Emotional Expressions',
    description:
      'Tunix-Bot displays 100+ animated facial emotions and reactions to help you feel understood and connected during your work sessions.',
    glowColor: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: '⏱️',
    title: 'Pomodoro Timer',
    description:
      'Built-in focus timer that guides you through work sprints and restful break sessions with gentle, non-intrusive visual cues.',
    glowColor: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: '💬',
    title: 'Silent Communication',
    description:
      'Displays short, encouraging messages and smiling OLED animations without using loud audio, keeping your workspace calm and distraction-free.',
    glowColor: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    icon: '🔋',
    title: 'Low Power Design',
    description:
      'Engineered for continuous desk presence with minimal energy consumption and automated magnetic cradle docking when battery runs low.',
    glowColor: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: '🎨',
    title: 'Customizable Look',
    description:
      'Choose from multiple magnetic accessories, cosmetic hats, and eye-preset customization options to perfectly match your setup style.',
    glowColor: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: '🛡️',
    title: 'Privacy Protected',
    description:
      'Your privacy is 100% sacred. Tunix-Bot operates on local edge firmware and never listens, records, or collects your personal data.',
    glowColor: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: '🎯',
    title: 'Focus Assist',
    description:
      'Helps you maintain peak concentration with timely break reminders, hydration prompts, and soothing rhythmic breathing guides.',
    glowColor: 'from-red-500/20 to-rose-500/20',
  },
  {
    icon: '⚡',
    title: 'Quick Setup',
    description:
      'Plug and play simplicity. Get started in seconds straight out of the box without complicated apps, logins, or tedious pairing procedures.',
    glowColor: 'from-yellow-500/20 to-amber-500/20',
  },
];

export default function FeaturesGrid() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Section Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          <span className={isLight ? 'text-slate-900' : 'text-white'}>What Tunix-Bot </span>
          <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Can Do
          </span>
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          Engineered with intelligent personality firmware to transform ordinary workstations into engaging, productive environments.
        </p>
      </div>

      {/* 4x2 Responsive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {FEATURES.map((item, idx) => (
          <div
            key={idx}
            className={`group relative rounded-3xl p-7 flex flex-col items-center text-center transition-all duration-300 border ${
              isLight
                ? 'bg-white border-slate-200/90 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5'
                : 'bg-slate-900/80 border-slate-800/90 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/40 hover:-translate-y-1.5 backdrop-blur-sm'
            }`}
          >
            {/* Soft Ambient Icon Glow Container */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-xs transition-transform duration-300 group-hover:scale-110 ${
                isLight ? 'bg-slate-100/90' : 'bg-slate-800/80 border border-slate-700/60'
              }`}
            >
              <span className="select-none filter drop-shadow-sm">{item.icon}</span>
            </div>

            {/* Feature Title */}
            <h3
              className={`text-base sm:text-lg font-extrabold mb-2.5 tracking-tight transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-400'
              }`}
            >
              {item.title}
            </h3>

            {/* Feature Description */}
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

