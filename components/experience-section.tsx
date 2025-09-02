"use client";

import { motion } from "framer-motion";

export function ExperienceSection() {
  const lookbookItems = [
    {
      number: "01",
      title: "Spring Essentials",
      description:
        "Lightweight fabrics and fresh silhouettes for the new season.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
    },
    {
      number: "02",
      title: "Evening Elegance",
      description:
        "Sophisticated pieces for special occasions and formal events.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
    },
    {
      number: "03",
      title: "Casual Luxury",
      description: "Elevated everyday wear that combines comfort with style.",
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop",
    },
    {
      number: "04",
      title: "Accessories",
      description: "Finishing touches that complete your perfect ensemble.",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
    },
  ];

  return (
    <section
      id="lookbook"
      className="py-32 bg-black text-white relative overflow-hidden"
    >
      {/* Background Elements with Z-Index */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Fashion Lookbook Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-20 bg-white/20 mx-auto mb-8"></div>
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-wide">
            Lookbook
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the art of styling. Each collection tells a story of
            sophistication, creativity, and timeless elegance that inspires your
            personal style journey.
          </p>
          <div className="w-32 h-px bg-white/20 mx-auto mt-8"></div>
        </motion.div>

        {/* Lookbook Grid with Z-Index Layering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.number}
              className="text-center group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Background Number with Z-Index */}
              <motion.div
                className="text-8xl md:text-9xl font-extralight text-white/5 mb-8 tracking-tight group-hover:text-white/10 transition-colors duration-700 absolute inset-0 flex items-center justify-center z-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                {item.number}
              </motion.div>

              {/* Content with Higher Z-Index */}
              <div className="relative z-20">
                {/* Title */}
                <h3 className="text-xl font-light mb-6 tracking-wide group-hover:text-white/80 transition-colors duration-500">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/70 transition-colors duration-500">
                  {item.description}
                </p>

                {/* Fashion Category Badge */}
                <div className="mt-6">
                  <div className="inline-block px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs tracking-[0.15em] uppercase font-light">
                      {item.title.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connecting Lines with Z-Index */}
              {index < lookbookItems.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-px bg-white/10 transform -translate-y-1/2 z-10"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fashion Lookbook CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-px h-16 bg-white/20 mx-auto mb-8"></div>
          <motion.button
            className="px-12 py-4 border border-white/20 text-white hover:border-white/40 transition-all duration-500 overflow-hidden group relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-light">
              Explore Lookbook
            </span>
            <motion.div
              className="absolute inset-0 bg-white/5"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Fashion Elements with Z-Index */}
      <motion.div
        className="absolute top-20 right-20 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-12 h-12 border border-white/20 bg-white/5 backdrop-blur-sm"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-8 h-8 border border-white/20 bg-white/5 backdrop-blur-sm"></div>
      </motion.div>
    </section>
  );
}
