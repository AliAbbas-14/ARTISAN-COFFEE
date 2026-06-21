'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductView } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch('/api/products?sort=popular');
        const data = await res.json();
        // Take the top 3
        setProducts(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error('Failed to fetch popular products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-8 bg-[#150B07]/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-cream mb-16">Signature Roasts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card h-96 animate-pulse bg-surface/50" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 px-4 md:px-8 bg-[#150B07]/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] text-center mb-3">
          Our Best Sellers
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
          Signature Roasts
        </h2>
        <p className="text-muted text-center max-w-lg mx-auto mb-16">
          Hand-selected beans, roasted to bring out the unique origin characteristics and tasting notes.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/menu" className="btn-ghost px-8 py-3 text-sm">
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
