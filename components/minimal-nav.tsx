"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

export function MinimalNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Collection", href: "/#collection" },
    { name: "Lookbook", href: "/#lookbook" },
    { name: "Contact", href: "/#contact" },
  ];

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
            <div className="w-10 h-10 bg-black"></div>
            <span className="text-black font-light text-xl tracking-[0.2em] uppercase">
              LUXE
            </span>
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

            {/* Cart Icon */}
            <motion.a
              href="/cart"
              className="text-black/70 hover:text-black transition-colors duration-300 relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + navItems.length * 0.1 }}
            >
              <ShoppingBag className="w-5 h-5" />
              <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></div>
            </motion.a>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/shop"
              className="px-8 py-3 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase inline-block"
            >
              Shop Now
            </a>
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
            <motion.button
              className="w-full px-8 py-3 bg-black text-white hover:bg-black/80 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
