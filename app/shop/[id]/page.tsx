"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Share2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
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

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productId, setProductId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          // If product not found, redirect to shop
          router.push("/shop");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/shop");
      }
    };

    fetchProduct();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-black/10 w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="aspect-[3/4] bg-black/5"></div>
              <div className="space-y-6">
                <div className="h-8 bg-black/10 w-3/4"></div>
                <div className="h-4 bg-black/5 w-full"></div>
                <div className="h-4 bg-black/5 w-2/3"></div>
                <div className="h-12 bg-black/10 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = [product.image_url]; // In a real app, you'd have multiple images

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-8">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-[0.1em] uppercase font-light">
            Back
          </span>
        </motion.button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] bg-black/5 overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-black/5 overflow-hidden transition-all duration-300 ${
                      selectedImage === index ? "ring-2 ring-black/20" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-light tracking-[0.2em] uppercase text-black/60">
                  {product.category}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 border border-black/20 text-black/60 hover:text-black hover:border-black/40 transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-black/20 text-black/60 hover:text-black hover:border-black/40 transition-all duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-black mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-light text-black">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-3">
                Description
              </h3>
              <p className="text-black/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-black/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-black/5 transition-colors duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-black">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(product.stock_quantity, quantity + 1)
                      )
                    }
                    className="p-2 hover:bg-black/5 transition-colors duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-black/60">
                  {product.stock_quantity} in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full px-8 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light">
                Add to Cart
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button className="px-6 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-300 text-sm tracking-[0.1em] uppercase font-light">
                  Buy Now
                </button>
                <button className="px-6 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-300 text-sm tracking-[0.1em] uppercase font-light">
                  Book Fitting
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-8 border-t border-black/10">
              <h3 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-4">
                Product Details
              </h3>
              <div className="space-y-2 text-sm text-black/70">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>LUXE-{product.id.toString().padStart(3, "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span>
                    {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="py-20 px-4 bg-black/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-black">
              You Might Also Like
            </h2>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="text-center">
            <a
              href="/shop"
              className="px-8 py-4 border border-black/20 text-black hover:border-black/40 transition-all duration-300 text-sm tracking-[0.2em] uppercase font-light inline-block"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
