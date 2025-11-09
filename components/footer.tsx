"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="bg-white border-t border-black/10 relative">
      {/* Background Elements with Z-Index */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/icon.svg"
                  alt="LUXE"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="text-black font-light text-2xl tracking-[0.2em] uppercase">
                LUXE
              </span>
            </div>
            <p className="text-black/60 text-sm leading-relaxed max-w-xs mb-4">
              Crafting timeless fashion that speaks to the modern sophisticate.
              Where elegance meets innovation in every stitch.
            </p>
            <div className="w-16 h-px bg-black/20"></div>
          </motion.div>

          {/* Collection Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-black font-light text-lg mb-6 tracking-wide">
              Collection
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Spring Essentials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Evening Wear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Casual Luxury
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-black font-light text-lg mb-6 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  About LUXE
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Press
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-black font-light text-lg mb-6 tracking-wide">
              Connect
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Customer Care
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/60 hover:text-black transition-colors duration-300 text-sm"
                >
                  Returns
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-black/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-black/40 text-sm mb-4 md:mb-0">
            © 2024 LUXE. All rights reserved. Crafted with elegance.
          </p>

          <button className="px-8 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-500">
            <span className="text-sm tracking-[0.15em] uppercase font-light">
              Get in Touch
            </span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
