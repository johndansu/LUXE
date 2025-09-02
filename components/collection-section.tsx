"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/db";
import Image from "next/image";

export function CollectionSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Evening Wear",
    "Casual Luxury",
    "Spring Essentials",
    "Accessories",
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <section id="collection" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-wide text-black">
              Collection
            </h2>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[...Array(6)].map((_, i) => (
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
    <section id="collection" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
          <h2 className="text-4xl font-extralight mb-8 tracking-wide text-black">
            Collection
          </h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Discover our complete range of carefully curated fashion pieces
          </p>
          <div className="w-32 h-px bg-black/20 mx-auto"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 text-sm tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "border border-black/20 text-black/70 hover:border-black/40"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black/5 mb-8 group-hover:bg-black/10 transition-colors duration-500">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-lg font-light tracking-wide mb-2 text-black group-hover:text-black/80 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-black/60 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-black font-light text-lg">
                    ${product.price}
                  </span>
                  <span className="text-black/40 text-xs tracking-[0.15em] uppercase">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                className="w-full mt-6 px-6 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-500 overflow-hidden group/btn relative"
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
            </motion.div>
          ))}
        </div>

        {/* Collection Stats */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-px h-16 bg-black/20 mx-auto mb-8"></div>
          <p className="text-black/60 text-sm tracking-[0.2em] uppercase">
            {filteredProducts.length}{" "}
            {selectedCategory === "All" ? "Total" : selectedCategory} Pieces
          </p>
        </motion.div>
      </div>
    </section>
  );
}
