"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

interface WishlistItem {
  _id: string;
  product_id: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock_quantity: number;
  };
  created_at: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { removeFromWishlist, refreshWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          fetchWishlist();
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const items = await response.json();
        setWishlistItems(items);
      } else if (response.status === 401) {
        // User not authenticated
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    const success = await removeFromWishlist(productId);
    if (success) {
      setWishlistItems((prev) =>
        prev.filter((item) => item.product_id._id !== productId)
      );
    }
  };

  const handleAddToCart = async (productId: string) => {
    const success = await addToCart(productId);
    if (success) {
      // Optionally remove from wishlist after adding to cart
      // await handleRemoveFromWishlist(productId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/60">Loading your wishlist...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <Heart className="w-16 h-16 text-black/20 mx-auto mb-6" />
            <h1 className="text-2xl font-light text-black mb-4">
              Sign in to view your wishlist
            </h1>
            <p className="text-black/60 mb-8">
              Save items you love and access them anytime by signing in to your
              account.
            </p>
            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full bg-black text-white hover:bg-black/90">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full border-black/20 text-black hover:border-black/40"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-light text-black">My Wishlist</h1>
          </div>
          <p className="text-black/60">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-black/20 mx-auto mb-6" />
            <h2 className="text-xl font-light text-black mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-black/60 mb-8">
              Start adding items you love to your wishlist by clicking the heart
              icon on any product.
            </p>
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-black/90">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden bg-white border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <Image
                        src={item.product_id.image_url}
                        alt={item.product_id.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Remove from Wishlist Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg border border-slate-200"
                          onClick={() =>
                            handleRemoveFromWishlist(item.product_id._id)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Category */}
                        <Badge
                          variant="outline"
                          className="text-xs border-slate-200 text-slate-600 bg-slate-50"
                        >
                          {item.product_id.category}
                        </Badge>

                        {/* Product Name */}
                        <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors text-sm leading-tight">
                          {item.product_id.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-slate-900">
                            ${item.product_id.price.toFixed(2)}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              item.product_id.stock_quantity > 20
                                ? "text-green-600"
                                : item.product_id.stock_quantity > 10
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.product_id.stock_quantity > 20
                              ? "In Stock"
                              : item.product_id.stock_quantity > 10
                              ? "Limited Stock"
                              : "Low Stock"}
                          </p>
                        </div>
                      </div>
                    </CardContent>

                    {/* Action Buttons */}
                    <CardFooter className="p-4 pt-0">
                      <div className="w-full space-y-2">
                        <Button
                          onClick={() => handleAddToCart(item.product_id._id)}
                          className="w-full bg-slate-800 hover:bg-slate-900 text-white h-10"
                          disabled={item.product_id.stock_quantity === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {item.product_id.stock_quantity === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </Button>

                        <Link href={`/shop/${item.product_id._id}`}>
                          <Button
                            variant="outline"
                            className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 h-10"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
