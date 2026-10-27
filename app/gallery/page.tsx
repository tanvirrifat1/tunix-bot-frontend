'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, Sparkles, Heart, Zap, ArrowRight, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: 'Autonomous' | 'Duo Set' | 'Emotional AI' | 'Desk Setup';
  tag: string;
  orderLink: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'deskimon-duo-setup',
    title: 'Deskimon Duo: Orbit & Sprout on Duty',
    subtitle: 'Twin desk buddies communicating wirelessly next to mechanical keyboards',
    image: '/images/products/deskimon-duo.jpg',
    category: 'Duo Set',
    tag: 'Desk Setup',
    orderLink: '/shop/deskimon-duo-bundle',
  },
  {
    id: 'orbit-companion',
    title: 'The Perfect Desk Companion with Lots of Emotions',
    subtitle: 'Orbit displays warm glowing eyes and gentle posture while you work',
    image: '/images/gallery/orbit-companion.jpg',
    category: 'Emotional AI',
    tag: 'Community Favorite',
    orderLink: '/shop/deskimon-duo-bundle',
  },
  {
    id: 'deskimon-sprout-single',
    title: 'Deskimon Sprout with Flexible Green Leaf',
    subtitle: 'Warm earth-tone clay textured body with calming breathing animations',
    image: '/images/gallery/deskimon-sprout.jpg',
    category: 'Emotional AI',
    tag: 'Eco Tactile',
    orderLink: '/shop/deskimon-sprout-single',
  },
  {
    id: 'vector-x1-rover',
    title: 'Vector X1 Cyber Scout Patrol',
    subtitle: 'Matte black armored rover with tank treads and high-contrast green OLED eyes',
    image: '/images/products/vector-x1.jpg',
    category: 'Autonomous',
    tag: 'Tread Rover',
    orderLink: '/shop/vector-x1-cyber-scout',
  },
  {
    id: 'eilik-waving',
    title: 'Eilik Interactive Waving Friend',
    subtitle: 'White and teal curved robot with touch-reactive body and playful giggles',
    image: '/images/products/eilik-bot.jpg',
    category: 'Emotional AI',
    tag: 'Dance & Touch',
    orderLink: '/shop/eilik-emotion-bot',
  },
  {
    id: 'hero-desk-fleet',
    title: 'Complete Autonomous Desk Robot Fleet',
    subtitle: 'Vector, Eilik, and Deskimon side-by-side in a modern developer setup',
    image: '/images/hero/hero-banner.jpg',
    category: 'Desk Setup',
    tag: 'Studio Showcase',
    orderLink: '/shop',
  },
  {
    id: 'emo-beanie',
    title: 'EMO Living AI with Knitted Beanie',
    subtitle: 'Expressive square-faced desk buddy that challenges you to dice and mini-games',
    image: '/images/products/emo-living.jpg',
    category: 'Autonomous',
    tag: 'Smart Assistant',
    orderLink: '/shop/emo-ai-desktop-companion',
  },
  {
    id: 'loona-puppy',
    title: 'Loona Quadruped Smart Desk Pet',
    subtitle: 'Agile roller-leg puppy bot with 3D LiDAR vision and big expressive anime eyes',
    image: '/images/products/loona-pet.jpg',
    category: 'Emotional AI',
    tag: 'LiDAR Vision',
    orderLink: '/shop/loona-smart-quadruped-pet',
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Autonomous', 'Duo Set', 'Emotional AI', 'Desk Setup'];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Real Desk Setups & Expressions</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Robot Companion Gallery
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          See how our miniature autonomous robots live alongside mechanical keyboards, laptops, and developer monitors. Click any companion to adopt them with zero registration.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-cyan-300 border border-cyan-800/60 backdrop-blur-md">
                {item.tag}
              </span>
            </div>

            {/* Info and Link */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Available in Shop
                </span>

                <Link
                  href={item.orderLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                >
                  <span>Adopt Robot</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
