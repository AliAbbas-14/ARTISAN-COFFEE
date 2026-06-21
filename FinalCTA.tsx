'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/15 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold text-cream mb-6"
        >
          Your perfect cup is waiting
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-lg text-muted mb-10 max-w-xl mx-auto"
        >
          Search by flavor, add to cart, and order in minutes. Join thousands of coffee lovers.
        </motion.p>
        <Link href="/menu" className="btn-primary text-lg px-10 py-4">
          Shop all coffees
        </Link>
      </div>
    </section>
  );
}
