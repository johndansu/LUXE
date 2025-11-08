"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Grid, List, Filter, Heart } from "lucide-react";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    "All",
    "Evening Wear",
    "Casual Luxury",
    "Spring Essentials",
    "Accessories",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered = [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-black/10 w-64 mb-8"></div>
            <div className="h-4 bg-black/5 w-96 mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-black/5"></div>
                  <div className="h-4 bg-black/10 w-3/4"></div>
                  <div className="h-3 bg-black/5 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[size:60px_60px] opacity-30" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
            <h1 className="text-5xl md:text-6xl font-extralight mb-8 tracking-wide text-black">
              Shop Collection
            </h1>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our curated selection of timeless pieces, each crafted
              with precision and designed for the modern sophisticate.
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 px-4 bg-white border-b border-black/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-light tracking-[0.2em] uppercase text-black/60">
                Category
              </span>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "border border-black/20 text-black/70 hover:border-black/40"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-6">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-light tracking-[0.2em] uppercase text-black/60">
                  Sort
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-black/20 bg-transparent text-black text-sm focus:border-black/40 focus:outline-none transition-colors duration-300"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 border border-black/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors duration-300 ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors duration-300 ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 items-stretch auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) =>
                viewMode === "grid" ? (
                  <motion.div
                    key={`grid-${product._id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative flex h-full flex-col overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <a
                      href={`/shop/${product._id}`}
                      className="relative block aspect-[3/4] overflow-hidden bg-black/5"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 border border-black/10">
                          <span className="text-xs font-light tracking-[0.15em] uppercase text-black">
                            {product.featured ? "Featured" : product.category}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 border border-black/10">
                          <span className="text-lg font-light text-black">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                    </a>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <a
                        href={`/shop/${product._id}`}
                        className="text-xl font-light tracking-wide text-black transition-colors duration-300 hover:text-black/70"
                      >
                        {product.name}
                      </a>
                      <p className="text-sm leading-relaxed text-black/60">
                        {product.description}
                      </p>

                      <div className="mt-auto flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={async () => {
                              if (isInWishlist(product._id)) {
                                await removeFromWishlist(product._id);
                              } else {
                                await addToWishlist(product._id);
                              }
                            }}
                            aria-label={
                              isInWishlist(product._id)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className={`flex h-10 w-10 items-center justify-center border border-black/20 transition-all duration-300 hover:border-black/40 ${
                              isInWishlist(product._id)
                                ? "text-red-500"
                                : "text-black"
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isInWishlist(product._id) ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="flex h-10 w-10 items-center justify-center border border-black/20 text-black transition-all duration-300 hover:border-black/40"
                            aria-label="Quick view"
                          >
                            <span className="text-lg">👁</span>
                          </button>
                        </div>

                        <button
                          onClick={() => addToCart(product._id)}
                          className="self-start px-8 py-3 border border-black/20 text-black hover:border-black/40 hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-[0.15em] uppercase"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`list-${product._id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex flex-col gap-6 bg-white p-6 transition-shadow duration-300 hover:shadow-lg md:flex-row md:items-center"
                  >
                    <a
                      href={`/shop/${product._id}`}
                      className="relative block aspect-[3/4] w-full overflow-hidden bg-black/5 md:w-48 md:flex-shrink-0"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </a>

                    <div className="flex flex-1 flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="border-black/10 bg-white text-xs uppercase tracking-[0.15em] text-black/60">
                          {product.category}
                        </Badge>
                        {product.featured && (
                          <Badge variant="secondary" className="bg-black text-white text-xs uppercase tracking-[0.15em]">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <a
                        href={`/shop/${product._id}`}
                        className="text-2xl font-light tracking-wide text-black transition-colors duration-300 hover:text-black/70"
                      >
                        {product.name}
                      </a>
                      <p className="text-sm leading-relaxed text-black/60">
                        {product.description}
                      </p>

                      <div className="mt-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <span className="text-2xl font-light text-black">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={async () => {
                              if (isInWishlist(product._id)) {
                                await removeFromWishlist(product._id);
                              } else {
                                await addToWishlist(product._id);
                              }
                            }}
                            aria-label={
                              isInWishlist(product._id)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className={`flex h-10 w-10 items-center justify-center border border-black/20 transition-all duration-300 hover:border-black/40 ${
                              isInWishlist(product._id)
                                ? "text-red-500"
                                : "text-black"
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isInWishlist(product._id) ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="px-4 py-2 border border-black/20 text-black transition-all duration-300 hover:border-black/40 hover:bg-black hover:text-white text-xs tracking-[0.15em] uppercase"
                          >
                            Quick View
                          </button>
                          <button
                            onClick={() => addToCart(product._id)}
                            className="px-6 py-2 border border-black/20 text-black hover:border-black/40 hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-[0.15em] uppercase"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-black/60 text-lg">
                No products found in this category.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
              >
                <motion.div
                  className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-black/10 p-6">
                    <h2 className="text-xl font-light text-black">Quick View</h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-2 transition-colors duration-300 hover:bg-black/5"
                      aria-label="Close quick view"
                    >
                      <ChevronDown className="h-5 w-5 rotate-180" />
                    </button>
                  </div>

                  {selectedProduct && (
                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                      <div className="aspect-square overflow-hidden bg-black/5">
                        <img
                          src={selectedProduct.image_url}
                          alt={selectedProduct.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Badge
                            variant="outline"
                            className="mb-2 border-black/10 bg-white text-xs uppercase tracking-[0.15em] text-black/60"
                          >
                            {selectedProduct.category}
                          </Badge>
                          <h3 className="text-2xl font-light text-black">
                            {selectedProduct.name}
                          </h3>
                          <p className="text-sm leading-relaxed text-black/60">
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

                        <div className="space-y-3 pt-4">
                          <Button
                            onClick={async () => {
                              await addToCart(selectedProduct._id);
                              setSelectedProduct(null);
                            }}
                            className="h-12 w-full bg-black text-white hover:bg-black/90"
                            disabled={selectedProduct.stock_quantity === 0}
                          >
                            Add to Cart
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
                            className="h-12 w-full border-black/20 text-black hover:border-black/40"
                          >
                            {isInWishlist(selectedProduct._id)
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"}
                          </Button>
                          <Button
                            onClick={() => setSelectedProduct(null)}
                            variant="ghost"
                            className="h-12 w-full text-black/60 hover:text-black"
                          >
                            View Full Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-black/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-black">
              Need Help Finding the Perfect Piece?
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
              Our style consultants are here to help you discover pieces that
              reflect your unique aesthetic and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light">
                Book Consultation
              </button>
              <button className="px-8 py-4 border border-black/20 text-black hover:border-black/40 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
