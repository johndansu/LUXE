"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Grid, List, Filter, Heart } from "lucide-react";
import { Footer } from "@/components/footer";
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
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group ${
                    viewMode === "list"
                      ? "flex gap-6"
                      : "flex h-full flex-col"
                  }`}
                >
                  <a
                    href={`/shop/${product._id}`}
                    className={`${
                      viewMode === "list"
                        ? "w-48 flex-shrink-0"
                        : "w-full"
                    } aspect-[3/4] bg-black/5 overflow-hidden block`}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </a>

                  <div
                    className={`flex flex-1 flex-col gap-2 ${
                      viewMode === "list" ? "" : "mt-4"
                    }`}
                  >
                    <a
                      href={`/shop/${product._id}`}
                      className="text-lg font-light tracking-wide text-black group-hover:text-black/70 transition-colors duration-300 hover:underline"
                    >
                      {product.name}
                    </a>
                    <p className="text-black/60 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    <div
                      className={`flex items-center justify-between gap-3 pt-2 ${
                        viewMode === "list" ? "" : "mt-auto"
                      }`}
                    >
                      <span className="text-xl font-light text-black">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
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
                          onClick={() => addToCart(product._id)}
                          className="px-6 py-2 border border-black/20 text-black hover:border-black/40 hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-[0.1em] uppercase"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
