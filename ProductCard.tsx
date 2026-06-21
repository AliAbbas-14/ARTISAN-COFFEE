'use client';

import { motion } from 'framer-motion';
import { categoryLabel, flavorLabel } from '@/lib/constants';
import { ProductView, formatPrice } from '@/lib/types';
import { useCart } from '@/components/CartProvider';

interface ProductCardProps {
  product: ProductView;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, cart } = useCart();
  const inCart = cart[product.id] || 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="glass-card-hover overflow-hidden flex flex-col h-full group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="badge bg-black/50 text-cream backdrop-blur-sm">
            {categoryLabel(product.category)}
          </span>
          <span className="badge bg-accent/90 text-white">{flavorLabel(product.flavor)}</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-gold text-sm font-semibold">
          ★ {product.rating.toFixed(1)}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-cream mb-2">{product.name}</h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded-md bg-surface border border-border text-muted"
            >
              {f}
            </span>
          ))}
          <span className="text-xs px-2 py-0.5 rounded-md bg-surface border border-border text-muted capitalize">
            {product.caffeine} caffeine
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
          <span className="text-2xl font-bold text-cream">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-2">
            {inCart > 0 && (
              <span className="text-xs text-accent font-semibold">{inCart} in cart</span>
            )}
            <button
              type="button"
              onClick={() => addItem(product.id, product.name)}
              className="btn-primary py-2.5 px-4 text-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <CartPlusIcon />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CartPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M6 6 5 3H2" />
    </svg>
  );
}
