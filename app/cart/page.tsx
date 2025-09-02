"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: {
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
  };
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart");
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        // Refresh cart items
        const updatedResponse = await fetch("/api/cart");
        const updatedData = await updatedResponse.json();
        setCartItems(updatedData);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        // Refresh cart items
        const updatedResponse = await fetch("/api/cart");
        const updatedData = await updatedResponse.json();
        setCartItems(updatedData);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-black/10 w-32 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 border border-black/10">
                  <div className="w-24 h-32 bg-black/5"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-black/10 w-3/4"></div>
                    <div className="h-3 bg-black/5 w-1/2"></div>
                    <div className="h-4 bg-black/10 w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-[0.1em] uppercase font-light">
              Back
            </span>
          </button>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-16 bg-black/20 mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-extralight mb-4 tracking-wide text-black">
            Shopping Cart
          </h1>
          <p className="text-black/60 text-lg">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
          <div className="w-32 h-px bg-black/20 mx-auto mt-6"></div>
        </motion.div>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="container mx-auto px-4 pb-20">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ShoppingBag className="w-16 h-16 text-black/20 mx-auto mb-6" />
            <h2 className="text-2xl font-light mb-4 text-black">
              Your cart is empty
            </h2>
            <p className="text-black/60 mb-8">
              Discover our collection of timeless pieces
            </p>
            <a
              href="/shop"
              className="px-8 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light inline-block"
            >
              Start Shopping
            </a>
          </motion.div>
        </div>
      ) : (
        /* Cart with Items */
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex gap-6 p-6 border border-black/10 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Product Image */}
                  <div className="w-24 h-32 bg-black/5 overflow-hidden flex-shrink-0">
                    <img
                      src={item.product?.image_url}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-light tracking-wide text-black">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-black/60">
                        {item.product?.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-black">
                        ${item.product?.price.toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-black/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-black/5 transition-colors duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-black/5 transition-colors duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="p-2 text-black/40 hover:text-red-500 transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-32 p-6 border border-black/10 bg-white"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-xl font-light tracking-wide text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-black/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black/70">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-black/70">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between text-lg font-light text-black">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="/checkout"
                    className="w-full px-6 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light text-center block"
                  >
                    Proceed to Checkout
                  </a>
                  <a
                    href="/shop"
                    className="w-full px-6 py-4 border border-black/20 text-black hover:border-black/40 transition-all duration-300 text-sm tracking-[0.2em] uppercase font-light text-center block"
                  >
                    Continue Shopping
                  </a>
                </div>

                {subtotal < 200 && (
                  <p className="text-sm text-black/60 mt-4 text-center">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
