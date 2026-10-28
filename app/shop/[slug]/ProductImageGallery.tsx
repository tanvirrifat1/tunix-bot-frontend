'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ProductImageGalleryProps {
  product: {
    name: string;
    image: string;
    additionalImages?: string[];
    badge?: string;
  };
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  // Ensure unique list of all available images
  const allImages = useMemo(() => {
    const list: string[] = [];
    if (product.image) {
      list.push(product.image);
    }
    if (product.additionalImages && Array.isArray(product.additionalImages)) {
      for (const img of product.additionalImages) {
        if (!list.includes(img)) {
          list.push(img);
        }
      }
    }
    return list.length > 0 ? list : [product.image];
  }, [product.image, product.additionalImages]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Reset selected index if product changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [product.name, product.image]);

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image Display */}
      <div
        className={`relative aspect-square w-full rounded-3xl overflow-hidden flex items-center justify-center p-6 transition-all duration-300 border group ${
          isLight
            ? 'bg-slate-50 border-slate-200 shadow-md'
            : 'bg-slate-900/90 border-slate-800 shadow-2xl'
        }`}
      >
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Pre-rendered stacked images with instant smooth opacity transition */}
        <div className="relative w-full h-full">
          {allImages.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <div
                key={img + idx}
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - view ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center p-4 hover:scale-105 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>

        {/* Promotional Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase glow-badge backdrop-blur-md">
            {product.badge}
          </div>
        )}

        {/* Navigation Arrows for Multi-image Products */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous robot image"
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-2xl border backdrop-blur-md transition-all cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-800 hover:bg-white hover:text-cyan-600 shadow-md'
                  : 'bg-slate-950/80 border-slate-700 text-white hover:bg-slate-900 hover:text-cyan-400 shadow-lg'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next robot image"
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-2xl border backdrop-blur-md transition-all cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-800 hover:bg-white hover:text-cyan-600 shadow-md'
                  : 'bg-slate-950/80 border-slate-700 text-white hover:bg-slate-900 hover:text-cyan-400 shadow-lg'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Photo Counter Pill */}
            <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider backdrop-blur-md border bg-slate-950/75 border-slate-800 text-cyan-300">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Selectable Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 items-center">
          {allImages.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={img + idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Select photo ${idx + 1} of ${product.name}`}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/70 scale-105 shadow-md shadow-cyan-500/30'
                    : isLight
                    ? 'border-slate-200 bg-white hover:border-cyan-400 opacity-70 hover:opacity-100'
                    : 'border-slate-800 bg-slate-900 hover:border-cyan-500/60 opacity-60 hover:opacity-100'
                } ${isLight ? 'bg-slate-50' : 'bg-slate-900'}`}
              >
                <div className="relative w-full h-full pointer-events-none select-none">
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    draggable={false}
                    className="object-contain p-1.5 pointer-events-none select-none"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
