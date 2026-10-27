'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  // Ensure all available images are accessible for selection
  const allImages = React.useMemo(() => {
    const list =
      product.additionalImages && product.additionalImages.length > 0
        ? product.additionalImages
        : [product.image];

    if (!list.includes(product.image)) {
      return [product.image, ...list];
    }
    return list;
  }, [product.image, product.additionalImages]);

  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Sync state if product changes
  React.useEffect(() => {
    setActiveImage(product.image);
  }, [product.image]);

  return (
    <div className="space-y-4">
      {/* Main Large Image Display */}
      <div
        className={`relative aspect-square w-full rounded-3xl overflow-hidden flex items-center justify-center p-6 transition-all duration-300 border ${
          isLight
            ? 'bg-slate-50 border-slate-200 shadow-md'
            : 'bg-slate-900/90 border-slate-800 shadow-2xl'
        }`}
      >
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-full h-full">
          <Image
            key={activeImage}
            src={activeImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-center p-4 hover:scale-105 transition-all duration-300 animate-fade-in"
          />
        </div>

        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase glow-badge backdrop-blur-md">
            {product.badge}
          </div>
        )}
      </div>

      {/* Selectable Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => {
            const isSelected = activeImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                aria-label={`View image ${idx + 1} of ${product.name}`}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-500/60 scale-105 shadow-md shadow-cyan-500/25'
                    : isLight
                    ? 'border-slate-200 bg-white hover:border-cyan-400 opacity-75 hover:opacity-100'
                    : 'border-slate-800 bg-slate-900 hover:border-cyan-500/60 opacity-65 hover:opacity-100'
                } ${isLight ? 'bg-slate-50' : 'bg-slate-900'}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
