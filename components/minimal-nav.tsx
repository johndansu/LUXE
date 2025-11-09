"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, User, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function MinimalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "About", href: "/#about" },
    { name: "Collection", href: "/#collection" },
    { name: "Lookbook", href: "/#lookbook" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        // User not logged in
      });

    // Cart count is now managed by the cart context
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src="/icon.svg"
                  alt="LUXE"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-black font-light text-xl tracking-[0.2em] uppercase">
                LUXE
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
              </motion.a>
            ))}

            {/* Wishlist Icon (only for logged-in users) */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + navItems.length * 0.1,
                }}
              >
                <Link
                  href="/wishlist"
                  className="text-black/70 hover:text-black transition-colors duration-300 relative group"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
                </Link>
              </motion.div>
            )}

            {/* Cart Icon */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + navItems.length * 0.1 + (user ? 0.1 : 0),
              }}
            >
              <Link
                href="/cart"
                className="text-black/70 hover:text-black transition-colors duration-300 relative group"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Auth or Shop */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {user ? (
              // User is logged in - show account and logout
              <>
                <div className="flex items-center space-x-1 text-xs text-black/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="hidden sm:inline">Logged in</span>
                </div>
                <Link
                  href="/account"
                  className="text-black/70 hover:text-black transition-colors duration-300 relative group"
                >
                  <User className="w-5 h-5" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-black/70 hover:text-black transition-colors duration-300 relative group"
                >
                  <LogOut className="w-5 h-5" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
                </button>
              </>
            ) : (
              // User not logged in - show login/signup
              <>
                <Link
                  href="/login"
                  className="text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase relative group"
                >
                  Login
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-black/70 hover:text-black transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <div
                className={`w-5 h-px bg-current transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-px bg-current mt-1 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-px bg-current mt-1 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></div>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-64" : "max-h-0"
          }`}
          initial={{ maxHeight: 0 }}
          animate={{ maxHeight: isOpen ? 256 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-black/10">
              {user ? (
                <div className="space-y-2">
                  <motion.a
                    href="/wishlist"
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Wishlist{" "}
                    {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                  </motion.a>
                  <motion.a
                    href="/account"
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-2">
                  <motion.a
                    href="/login"
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </motion.a>
                  <motion.a
                    href="/signup"
                    className="block px-4 py-2 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </motion.a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
