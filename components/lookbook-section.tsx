"use client";

import { motion } from "framer-motion";

export function LookbookSection() {
  const lookbookCategories = [
    {
      title: "Spring Essentials",
      description:
        "Lightweight fabrics and fresh silhouettes for the new season",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
      items: ["Silk Blouses", "Wool Trench Coats", "Lightweight Dresses"],
    },
    {
      title: "Evening Elegance",
      description:
        "Sophisticated pieces for special occasions and formal events",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
      items: ["Silk Evening Gowns", "Statement Jewelry", "Elegant Accessories"],
    },
    {
      title: "Casual Luxury",
      description: "Elevated everyday wear that combines comfort with style",
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop",
      items: ["Cashmere Sweaters", "Pencil Skirts", "Premium Basics"],
    },
    {
      title: "Accessories",
      description: "Finishing touches that complete your perfect ensemble",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
      items: ["Leather Bags", "Silk Scarves", "Statement Necklaces"],
    },
  ];

  const stylingTips = [
    {
      tip: "Layer with Purpose",
      description: "Combine textures and weights for depth without bulk",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
    },
    {
      tip: "Color Harmony",
      description: "Stick to a cohesive palette for effortless sophistication",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop",
    },
    {
      tip: "Accessorize Mindfully",
      description: "Let one statement piece be the focal point",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop",
    },
  ];

  return (
    <>
      {/* Lookbook Categories */}
      <section
        id="lookbook"
        className="py-20 px-4 bg-black/5 relative overflow-hidden"
      >
        {/* Background design elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/6 w-16 h-16 border border-black/8 transform rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/6 w-12 h-12 bg-black/6 rounded-full"></div>
          <motion.div
            className="absolute top-1/2 left-1/3 w-1 h-20 bg-gradient-to-b from-transparent via-black/10 to-transparent"
            animate={{
              height: [80, 100, 80],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-wide text-black">
              Lookbook
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Discover the art of styling. Each collection tells a story of
              sophistication, creativity, and timeless elegance.
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {lookbookCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Category Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5 mb-8 group-hover:bg-black/10 transition-colors duration-500">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                  {/* Category Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white text-2xl font-light tracking-wide mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Category Items */}
                <div className="space-y-4">
                  <h4 className="text-black font-light tracking-wide text-sm uppercase">
                    Key Pieces
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-3 py-1 border border-black/20 text-black/70 text-xs tracking-[0.1em] uppercase hover:border-black/40 transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Styling Tips Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-black">
              Styling Tips
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Expert advice for creating timeless, sophisticated looks
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stylingTips.map((tip, index) => (
              <motion.div
                key={tip.tip}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Tip Image */}
                <div className="relative aspect-[3/2] overflow-hidden bg-black/5 mb-6 group-hover:bg-black/10 transition-colors duration-500">
                  <img
                    src={tip.image}
                    alt={tip.tip}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Tip Content */}
                <div>
                  <h3 className="text-xl font-light tracking-wide mb-4 text-black">
                    {tip.tip}
                  </h3>
                  <p className="text-black/60 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
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
              Style Inspiration
            </h2>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop",
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
              "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop",
            ].map((image, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors duration-500">
                  <img
                    src={image}
                    alt={`Style inspiration ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
