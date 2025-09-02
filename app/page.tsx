"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { AboutSection } from "@/components/about-section";
import { CollectionSection } from "@/components/collection-section";
import { LookbookSection } from "@/components/lookbook-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
// import { SeriousModeIndicator } from "@/components/serious-mode-toggle";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Section */}
      <AboutSection />

      {/* Collection Section */}
      <CollectionSection />

      {/* Lookbook Section */}
      <LookbookSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Serious Mode Toggle */}
      {/* <SeriousModeIndicator /> */}
    </main>
  );
}
