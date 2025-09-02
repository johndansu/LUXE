"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Style", "Elegance", "Sophistication", "Beauty"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[size:40px_40px] opacity-50" />

        {/* Elegant horizontal lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/4 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />

        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-20 h-20 border border-black/8"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-black/5"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-1/3 right-1/3 w-px h-32 bg-gradient-to-b from-transparent via-black/6 to-transparent" />
        <div className="absolute bottom-1/3 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-black/4 to-transparent" />
      </div>

      {/* Main Content with High Z-Index */}
      <div className="relative z-50 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Fashion Badge */}
          <motion.div
            className="inline-block mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="w-px h-20 bg-black/20 mx-auto mb-6"></div>
            <span className="text-black/60 text-sm tracking-[0.4em] uppercase font-light">
              Spring Collection 2025
            </span>
            <div className="w-16 h-px bg-black/20 mx-auto mt-4"></div>
          </motion.div>

          {/* Dynamic Headline */}
          <div className="mb-20">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight text-black mb-10 tracking-tight">
              <span className="block">Timeless</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="block bg-gradient-to-r from-black via-black/80 to-black/60 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          {/* Fashion Subtitle */}
          <motion.p
            className="text-black/70 text-xl md:text-2xl max-w-3xl mx-auto mb-24 font-light leading-relaxed tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Discover the art of sophisticated dressing. Each piece tells a story
            of craftsmanship, elegance, and timeless beauty that transcends
            seasons.
          </motion.p>

          {/* Fashion CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <a
              href="/shop"
              className="group relative px-12 py-6 bg-black text-white hover:bg-black/90 transition-all duration-500 overflow-hidden inline-block"
            >
              <span className="relative z-10 text-lg tracking-[0.2em] uppercase font-light">
                Shop Collection
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </a>

            <a
              href="#lookbook"
              className="px-12 py-6 border border-black/20 text-black hover:border-black/40 transition-all duration-500 inline-block"
            >
              <span className="text-lg tracking-[0.2em] uppercase font-light">
                View Lookbook
              </span>
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-black/0 via-black/40 to-black/0"
              animate={{
                height: [64, 80, 64],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.span
              className="block text-black/50 text-xs tracking-[0.3em] uppercase mt-3 font-light"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant floating elements */}
      <motion.div
        className="absolute bottom-20 right-20 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="relative">
          <div className="w-16 h-16 border border-black/15 bg-white/90 backdrop-blur-sm shadow-sm"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-black/20"></div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-20 left-20 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="w-8 h-8 border border-black/10 bg-white/70 backdrop-blur-sm"></div>
      </motion.div>
    </section>
  );
}
