import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Zap,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Box,
  Cpu,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailActions from './ProductDetailActions';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | RoboDesk' };
  }
  return {
    title: `${product.name} | RoboDesk Labs`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const waInquiryUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(
    `Hi RoboDesk! I'm interested in the ${product.name} ($${product.price}). Could you answer a quick question?`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Robots
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left: Gallery Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden flex items-center justify-center p-6 shadow-2xl">
            <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center p-4 hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase glow-badge backdrop-blur-md">
                {product.badge}
              </div>
            )}
          </div>

          {/* Additional Thumbnails */}
          {product.additionalImages && product.additionalImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.additionalImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 cursor-pointer hover:border-cyan-500 transition-colors"
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                {product.category}
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Fast Shipping
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-400 block">
                ● In Stock ({product.stockCount} units available)
              </span>
              <span className="text-[11px] text-slate-400">Ships within 24 hours</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Key Features Bullet List */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Key Capabilities:
            </h3>
            <ul className="space-y-2">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Action Buttons (Order Now & Add to Cart) */}
          <ProductDetailActions product={product} />

          {/* WhatsApp Inquiries button */}
          <div className="pt-2">
            <a
              href={waInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-950/40 border border-emerald-800/70 text-emerald-300 hover:bg-emerald-900/50 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Ask a question about {product.name} on WhatsApp</span>
            </a>
          </div>

          {/* Zero Login & Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Zap className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-white block">No Signups</span>
              <span className="text-[10px] text-slate-400">Order as a guest</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Truck className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-white block">Fast Delivery</span>
              <span className="text-[10px] text-slate-400">Cash on delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <RotateCcw className="h-4 w-4 text-blue-400 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-white block">7-Day Return</span>
              <span className="text-[10px] text-slate-400">Hardware warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications & What's In The Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
        {/* Technical Specs */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Technical Specifications</h3>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Display Face:</span>
              <span className="font-semibold text-slate-200 text-right">{product.technicalSpecs.display}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Battery & Runtime:</span>
              <span className="font-semibold text-slate-200 text-right">{product.technicalSpecs.battery}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Sensor Array:</span>
              <span className="font-semibold text-slate-200 text-right max-w-[60%]">
                {product.technicalSpecs.sensors.join(', ')}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Connectivity:</span>
              <span className="font-semibold text-slate-200 text-right">{product.technicalSpecs.connectivity}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Dimensions:</span>
              <span className="font-semibold text-slate-200 text-right">{product.technicalSpecs.dimensions}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Chassis Weight:</span>
              <span className="font-semibold text-slate-200 text-right">{product.technicalSpecs.weight}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Chassis Materials:</span>
              <span className="font-semibold text-slate-200 text-right max-w-[60%]">
                {product.technicalSpecs.materials}
              </span>
            </div>
          </div>
        </div>

        {/* What's In The Box */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">What&apos;s Inside The Box</h3>
          </div>

          <p className="text-xs text-slate-400">
            Every robot is individually calibrated and packed in shock-resistant packaging:
          </p>

          <ul className="space-y-3 pt-2">
            {product.inTheBox.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Robots */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Other Desk Companions</h2>
          <Link href="/shop" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
