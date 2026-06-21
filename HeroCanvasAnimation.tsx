'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import Link from 'next/link';

const TOTAL_FRAMES = 120; // Adjust based on your frame count
const FRAME_PATH = '/frames'; // Folder containing frame_0.webp to frame_119.webp

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(() =>
    Array(TOTAL_FRAMES).fill(null)
  );
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smooth spring animation for buttery scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Anti-gravity effect based on scroll velocity
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(
    scrollVelocity,
    [-1, 0, 1],
    [15, 0, -15] // Floats up when scrolling down
  );

  // Map scroll to frame index (bi-directional)
  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Preload first frame immediately, then load others progressively in the background
  useEffect(() => {
    let active = true;
    const firstImg = new Image();
    firstImg.src = `${FRAME_PATH}/frame_0.webp`;
    firstImg.onload = () => {
      if (!active) return;
      setImages((prev) => {
        const next = [...prev];
        next[0] = firstImg;
        return next;
      });
      setFirstImageLoaded(true);
      setLoadProgress((100 / TOTAL_FRAMES));

      // Progressively load remaining frames
      const loadRemaining = async () => {
        const batchSize = 4;
        const indices = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1);
        
        for (let i = 0; i < indices.length; i += batchSize) {
          if (!active) break;
          const batch = indices.slice(i, i + batchSize);
          await Promise.all(
            batch.map((index) => {
              return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = `${FRAME_PATH}/frame_${index}.webp`;
                img.onload = () => {
                  if (active) {
                    setImages((prev) => {
                      const next = [...prev];
                      next[index] = img;
                      return next;
                    });
                    setLoadProgress((prev) => prev + (100 / TOTAL_FRAMES));
                  }
                  resolve();
                };
                img.onerror = () => {
                  resolve(); // Resolve anyway to proceed
                };
              });
            })
          );
        }
      };
      loadRemaining();
    };

    return () => {
      active = false;
    };
  }, []);

  // Canvas rendering
  useEffect(() => {
    if (!firstImageLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
      const currentFrame = Math.round(frameIndex.get());
      const targetIndex = Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1));
      
      // Find the closest loaded frame
      let img = images[targetIndex];
      if (!img) {
        // Search backwards first
        for (let i = targetIndex - 1; i >= 0; i--) {
          if (images[i]) {
            img = images[i];
            break;
          }
        }
      }
      // If still not found, search forwards
      if (!img) {
        for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
          if (images[i]) {
            img = images[i];
            break;
          }
        }
      }

      if (img) {
        // Responsive canvas sizing
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Calculate scaling (contain fit)
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const unsubscribe = frameIndex.on('change', renderFrame);
    renderFrame(); // Initial render

    // Handle window resize
    const handleResize = () => renderFrame();
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [firstImageLoaded, images, frameIndex]);

  // Text overlay animations
  const section1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  const section4Opacity = useTransform(smoothProgress, [0.9, 0.92, 0.98, 1], [0, 1, 1, 0]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  if (!firstImageLoaded) {
    return (
      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">
        <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
            initial={{ width: '0%' }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-amber-100/70 text-lg font-['Inter']">
          Loading Experience... {Math.round(loadProgress)}%
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ y: yOffset }} className="w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        </motion.div>
        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            style={{ opacity: section1Opacity }}
            className="text-center px-4"
          >
            <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-amber-50 mb-4 tracking-tight">
              Ali Abbas Coffee Craft
            </h1>
            <p className="text-xl md:text-2xl text-amber-100/80 font-['Inter']">
              Elevating your daily coffee ritual
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: section2Opacity }}
            className="text-left px-8 md:px-16 max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-semibold text-amber-50 mb-3">
              Artisanal Roasting
            </h2>
            <p className="text-lg md:text-xl text-amber-100/70 font-['Inter']">
              Sourcing the finest beans, roasted in small batches with precision
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: section3Opacity }}
            className="text-right px-8 md:px-16 max-w-2xl ml-auto"
          >
            <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-semibold text-amber-50 mb-3">
              Exceptional Notes
            </h2>
            <p className="text-lg md:text-xl text-amber-100/70 font-['Inter']">
              A curated sensory profile unlocking the soul of the origin
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: section4Opacity }}
            className="text-center px-4"
          >
            <h2 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-amber-50 mb-6">
              Taste the Difference
            </h2>
            <Link href="/menu" className="pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl"
              >
                Explore Collection ↓
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-amber-100/60 text-sm font-['Inter'] tracking-wider uppercase">
            Scroll to Explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-amber-100/40 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 bg-amber-100/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
