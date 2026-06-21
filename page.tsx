'use client';

import { useEffect } from 'react';
import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import FeatureSection from '@/components/FeatureSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      <HeroCanvasAnimation />
      <FeatureSection />
      <FeaturedProducts />
      <FinalCTA />
    </main>
  );
}
