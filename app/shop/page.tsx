'use client';

import React, { useState, useMemo } from 'react';
import { Search, Bot, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useTheme } from '@/context/ThemeContext';

export default function ShopPage() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'AI Companion', 'Emotion & Desk Pet', 'Productivity & Focus', 'Duo Set'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured / default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 overflow-hidden keep-dark-surface always-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
            <Bot className="h-3.5 w-3.5 text-cyan-400" />
            <span>Complete Companion Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shop Desk Robots
          </h1>

          <p className="text-sm text-slate-200 leading-relaxed">
            Browse our line of autonomous, emotive desk companions. All models come with rechargeable power packs, edge drop sensors, and full hardware warranty. No login needed to order!
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" /> 100% Guest Ordering
            </span>
            <span>•</span>
            <span>Cash on Delivery Available</span>
            <span>•</span>
            <span>Free Delivery Over $150</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 rounded-2xl border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/80 border-slate-800'
        }`}
      >
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/30 font-bold always-white'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                isLight ? 'text-slate-400' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              placeholder="Search robots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-500'
                  : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-cyan-500'
                  : 'bg-slate-950 border-slate-700 text-slate-200 focus:border-cyan-500'
              }`}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Robot Grid */}
      {filteredProducts.length === 0 ? (
        <div
          className={`text-center py-20 p-8 rounded-3xl border ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'glass-panel border-slate-800'
          }`}
        >
          <Bot className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            No robots found
          </h3>
          <p className={`text-xs mt-1 max-w-sm mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Try adjusting your search query or switching to another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`mt-4 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 text-cyan-700 border-cyan-200 hover:bg-slate-200'
                : 'bg-slate-800 text-cyan-400 border-cyan-800/40 hover:bg-slate-700'
            }`}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Guest Ordering Reminder Footer */}
      <div
        className={`p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/40 border-slate-800'
        }`}
      >
        <div className="text-left">
          <h4 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Zap className={`h-4 w-4 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
            Ready to order without signups?
          </h4>
          <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Click &quot;Order Now&quot; on any robot to open our 1-step guest order form.
          </p>
        </div>

        <a
          href="https://wa.me/8801904482088?text=Hi%20Tunix-Bot!%20I%20have%20questions%20before%20ordering."
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors shrink-0 ${
            isLight
              ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200'
              : 'text-emerald-300 bg-emerald-950/60 border-emerald-800/80 hover:bg-emerald-900/60'
          }`}
        >
          Have questions? Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
