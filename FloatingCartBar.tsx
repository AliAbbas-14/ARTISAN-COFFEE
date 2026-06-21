'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ProductView } from '@/lib/types';

export default function FloatingCartBar() {
  const { count, cart } = useCart();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setSubtotal(0);
      return;
    }
    fetch('/api/products')
      .then((r) => r.json())
      .then((products: ProductView[]) => {
        let total = 0;
        for (const [id, qty] of Object.entries(cart)) {
          const p = products.find((x) => x.id === id);
          if (p) total += p.price * qty;
        }
        setSubtotal(total);
      });
  }, [cart, count]);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
        >
          <div className="max-w-lg mx-auto pointer-events-auto glass-card px-5 py-4 flex items-center justify-between gap-4 border-accent/30 shadow-glow">
            <div>
              <p className="text-cream font-semibold">
                {count} {count === 1 ? 'item' : 'items'} in cart
              </p>
              {subtotal > 0 && (
                <p className="text-muted text-sm">Subtotal {formatPrice(subtotal)}</p>
              )}
            </div>
            <Link href="/cart" className="btn-primary shrink-0 py-2.5">
              Checkout
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
