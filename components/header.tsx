"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/#about" },
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

    // Fetch cart count
    fetch("/api/cart")
      .then((res) => res.json())
      .then((items) => {
        const total = items.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCartCount(total);
      })
      .catch(() => {
        // Cart empty or error
      });
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
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative h-10 w-10 overflow-hidden">
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
            className="hidden md:flex items-center space-x-8"
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
          </motion.div>

          {/* Right side icons */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Cart Icon */}
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

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-2">
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
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase relative group"
                >
                  Login
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-black/70 hover:text-black transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
          initial={{ maxHeight: 0 }}
          animate={{ maxHeight: isOpen ? 384 : 0 }}
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
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-black/10">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/account"
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block text-black/70 hover:text-black transition-colors duration-300 text-sm tracking-[0.15em] uppercase py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
