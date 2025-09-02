"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/db";
import Image from "next/image";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch("/api/products?featured=true");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section id="collection" className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight text-black mb-6 tracking-wide">
              Featured Collection
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Curated pieces that define contemporary elegance
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-black/5 mb-8"></div>
                <div className="h-6 bg-black/10 mb-4 w-3/4"></div>
                <div className="h-4 bg-black/10 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="collection"
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

        {/* Elegant lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/8 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/8 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/4 to-transparent"></div>

        {/* Floating accent elements */}
        <motion.div
          className="absolute top-1/4 right-1/6 w-2 h-24 bg-gradient-to-b from-transparent via-black/6 to-transparent"
          animate={{
            height: [96, 120, 96],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/6 w-24 h-2 bg-gradient-to-r from-transparent via-black/6 to-transparent"
          animate={{
            width: [96, 120, 96],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Fashion Collection Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
          <h2 className="text-5xl md:text-6xl font-extralight text-black mb-8 tracking-wide">
            Featured Collection
          </h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Curated pieces that define modern elegance. Each garment is crafted
            with precision and designed for those who appreciate timeless
            sophistication.
          </p>
          <div className="w-32 h-px bg-black/20 mx-auto mt-8"></div>
        </motion.div>

        {/* Fashion Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Product Image Container with Z-Index */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black/5 mb-8 z-20">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Fashion Badge with High Z-Index */}
                <div className="absolute top-4 left-4 z-30">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 border border-black/10">
                    <span className="text-xs font-light text-black tracking-[0.1em] uppercase">
                      New
                    </span>
                  </div>
                </div>

                {/* Price Tag with Z-Index */}
                <div className="absolute bottom-4 right-4 z-30">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 border border-black/10">
                    <span className="text-lg font-light text-black">
                      ${product.price}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay with Z-Index */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 z-25"></div>
              </div>

              {/* Product Info */}
              <div className="text-center relative z-20">
                <h3 className="text-xl font-light text-black mb-4 tracking-wide group-hover:text-black/70 transition-colors duration-500">
                  {product.name}
                </h3>

                <p className="text-black/60 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  {product.description}
                </p>

                {/* Fashion Action Buttons */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.button
                    className="w-10 h-10 border border-black/20 text-black hover:border-black/40 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">♡</span>
                  </motion.button>

                  <motion.button
                    className="w-10 h-10 border border-black/20 text-black hover:border-black/40 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">👁</span>
                  </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  className="group relative inline-block px-8 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10 text-sm tracking-[0.15em] uppercase font-light">
                    Add to Cart
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-black/5"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fashion Collection CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-px h-16 bg-black/20 mx-auto mb-8"></div>
          <a
            href="/shop"
            className="px-12 py-4 border border-black/30 text-black hover:border-black/50 transition-all duration-500 inline-block"
          >
            <span className="text-sm tracking-[0.2em] uppercase font-light">
              View Full Collection
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
