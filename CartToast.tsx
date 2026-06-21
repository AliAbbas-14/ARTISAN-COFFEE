'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartProvider';

export default function CartToast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl bg-cream text-espresso font-medium text-sm shadow-glow border border-gold/30 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
