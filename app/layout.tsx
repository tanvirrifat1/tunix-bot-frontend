import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { StockModalProvider } from '@/context/StockModalContext';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tunix-Bot | Autonomous AI Desk Companions & Robots',
  description:
    'Adopt intelligent desk companion robots with emotive expressions, autonomous mobility, and tactile robotics. Zero accounts, no login required - fast guest ordering.',
  keywords: [
    'tunix bot',
    'tunix-bot',
    'desk robot',
    'AI companion',
    'vector robot',
    'eilik robot',
    'deskimon',
    'desk pet',
    'autonomous robot',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('tunix_theme') || 'dark';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-200">
        <ThemeProvider>
          <CartProvider>
            <StockModalProvider>
              <Suspense fallback={<div className="h-20 bg-slate-950 border-b border-slate-800" />}>
                <Navbar />
              </Suspense>
              <main className="flex-grow">{children}</main>
              <Footer />
              <CartDrawer />
            </StockModalProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
