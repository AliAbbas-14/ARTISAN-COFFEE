'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/features';

export default function FeatureSection() {
  return (
    <section className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#1D110B]/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,156,143,0.03),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-accent text-sm font-semibold uppercase tracking-[0.25em] text-center mb-3">
          Our Philosophy
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
          Roasting with Intent
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-20 text-base leading-relaxed">
          We believe that coffee is more than a beverage—it is a craft. Every step of our process is designed to honor the work of the farmers and elevate your daily cup.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex gap-6 hover:border-accent/40 group transition-all duration-300"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-surface border border-border/60 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                <FeatureIcon type={feature.icon} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ type }: { type: 'bean' | 'flame' | 'sparkles' | 'cup' }) {
  switch (type) {
    case 'bean':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
          <path d="M12 2c2 5 0 9-4 12-3 2.25-5.5 3-6 3" />
          <path d="M22 7c-1.5.5-4 1.25-6 3-4 3.5-5 8-4 12" />
        </svg>
      );
    case 'flame':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z" opacity="0.6" />
          <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" opacity="0.6" />
        </svg>
      );
    case 'cup':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <path d="M6 2v3" />
          <path d="M10 2v3" />
          <path d="M14 2v3" />
        </svg>
      );
  }
}
