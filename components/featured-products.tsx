"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/supabase-db";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Heart, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch("/api/products?featured=true");
        const data = await response.json();
        
        // Check if response is an error or empty
        if (data.error || !Array.isArray(data)) {
          console.error("Error from API:", data.error || "Invalid response");
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProducts([]);
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
              key={product._id}
              className="group relative flex h-full flex-col"
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
              <div className="relative z-20 flex flex-1 flex-col text-center">
                <h3 className="text-xl font-light text-black mb-4 tracking-wide group-hover:text-black/70 transition-colors duration-500">
                  {product.name}
                </h3>

                <p className="text-black/60 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  {product.description}
                </p>

                {/* Fashion Action Buttons */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.button
                    onClick={async () => {
                      if (isInWishlist(product._id)) {
                        await removeFromWishlist(product._id);
                      } else {
                        await addToWishlist(product._id);
                      }
                    }}
                    className={`w-10 h-10 border border-black/20 text-black hover:border-black/40 transition-all duration-300 flex items-center justify-center ${
                      isInWishlist(product._id) ? "text-red-500" : ""
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product._id) ? "fill-current" : ""
                      }`}
                    />
                  </motion.button>

                  <motion.button
                    onClick={() => setSelectedProduct(product)}
                    className="w-10 h-10 border border-black/20 text-black hover:border-black/40 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">👁</span>
                  </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={() => addToCart(product._id)}
                  className="group relative inline-block px-8 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-500 overflow-hidden mt-auto"
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

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <h2 className="text-xl font-light text-black">Quick View</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-black/5 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="aspect-square bg-slate-50 overflow-hidden">
                    <Image
                      src={selectedProduct.image_url}
                      alt={selectedProduct.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-200 text-slate-600 bg-slate-50 mb-2"
                      >
                        {selectedProduct.category}
                      </Badge>
                      <h3 className="text-2xl font-light text-black mb-2">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-black/60 text-sm leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-3xl font-light text-black">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          selectedProduct.stock_quantity > 20
                            ? "text-green-600"
                            : selectedProduct.stock_quantity > 10
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedProduct.stock_quantity > 20
                          ? "In Stock"
                          : selectedProduct.stock_quantity > 10
                          ? "Limited Stock"
                          : "Low Stock"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      <Button
                        onClick={async () => {
                          await addToCart(selectedProduct._id);
                          setSelectedProduct(null);
                        }}
                        className="w-full bg-black text-white hover:bg-black/90 h-12"
                        disabled={selectedProduct.stock_quantity === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {selectedProduct.stock_quantity === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </Button>

                      <Button
                        onClick={async () => {
                          if (isInWishlist(selectedProduct._id)) {
                            await removeFromWishlist(selectedProduct._id);
                          } else {
                            await addToWishlist(selectedProduct._id);
                          }
                        }}
                        variant="outline"
                        className="w-full border-black/20 text-black hover:border-black/40 h-12"
                      >
                        <Heart
                          className={`w-4 h-4 mr-2 ${
                            isInWishlist(selectedProduct._id)
                              ? "fill-current text-red-500"
                              : ""
                          }`}
                        />
                        {isInWishlist(selectedProduct._id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                      </Button>

                      <Button
                        onClick={() => setSelectedProduct(null)}
                        variant="ghost"
                        className="w-full text-black/60 hover:text-black h-12"
                      >
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
