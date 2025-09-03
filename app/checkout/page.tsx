"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: {
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
  };
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log("Checkout submitted:", formData);
    // Redirect to success page or handle payment
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-64 bg-black/5"></div>
                <div className="h-64 bg-black/5"></div>
              </div>
              <div className="h-96 bg-black/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
          <a
            href="/shop"
            className="px-8 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light inline-block"
          >
            Start Shopping
          </a>
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
            Checkout
          </h1>
          <p className="text-black/60 text-lg">Complete your order securely</p>
          <div className="w-32 h-px bg-black/20 mx-auto mt-6"></div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Checkout Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-light tracking-wide text-black mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xl font-light tracking-wide text-black mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-light tracking-wide text-black mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on card"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="border border-black/10 p-6 bg-white">
              <h2 className="text-xl font-light tracking-wide text-black mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-20 bg-black/5 overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.image_url}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-light text-black">
                        {item.product?.name}
                      </h3>
                      <p className="text-xs text-black/60">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-light text-black">
                        ${item.product?.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-black/10 pt-4 mb-6">
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
                <div className="border-t border-black/10 pt-3">
                  <div className="flex justify-between text-lg font-light text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-black/60 mb-6">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-light flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Place Order
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
