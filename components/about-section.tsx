"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <>
      {/* Story Section */}
      <section className="py-20 px-4 bg-black/5 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-black/5 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-black/3 rounded-full"></div>
          <motion.div
            className="absolute top-1/2 right-1/3 w-2 h-16 bg-gradient-to-b from-transparent via-black/8 to-transparent"
            animate={{
              height: [64, 80, 64],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-black">
                Our Story
              </h2>
              <div className="space-y-6 text-black/70 leading-relaxed">
                <p>
                  Founded on the principle that true luxury lies in the details,
                  LUXE emerged from a vision to redefine contemporary fashion.
                  We believe that exceptional style is not just about what you
                  wear, but how it makes you feel.
                </p>
                <p>
                  Every piece in our collection is carefully selected for its
                  craftsmanship, quality, and ability to elevate your personal
                  aesthetic. We work with artisans and designers who share our
                  commitment to excellence and innovation.
                </p>
                <p>
                  Our mission is to provide you with fashion that transcends
                  trends, creating a wardrobe that reflects your individuality
                  and stands the test of time.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-black/10 to-black/5 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=750&fit=crop"
                  alt="Fashion Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black/10 backdrop-blur-sm"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[size:50px_50px] opacity-40" />
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
              Our Values
            </h2>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Quality",
                description:
                  "We source only the finest materials and work with master craftspeople to ensure every piece meets our exacting standards.",
                number: "01",
              },
              {
                title: "Authenticity",
                description:
                  "Every design tells a story. We celebrate genuine creativity and original thinking in all our collaborations.",
                number: "02",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to responsible fashion, working with partners who share our values of environmental consciousness.",
                number: "03",
              },
            ].map((value, index) => (
              <motion.div
                key={value.number}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="relative mb-8">
                  <div className="text-6xl md:text-7xl font-extralight text-black/5 group-hover:text-black/10 transition-colors duration-700">
                    {value.number}
                  </div>
                  <h3 className="absolute inset-0 flex items-center justify-center text-xl font-light tracking-wide text-black">
                    {value.title}
                  </h3>
                </div>
                <p className="text-black/60 leading-relaxed max-w-xs mx-auto">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-px h-16 bg-white/20 mx-auto mb-8"></div>
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
              Our Team
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              A collective of passionate individuals dedicated to bringing you
              the finest in contemporary fashion.
            </p>
            <div className="w-32 h-px bg-white/20 mx-auto mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Creative Director",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format",
              },
              {
                name: "Marcus Rivera",
                role: "Head of Design",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",
              },
              {
                name: "Elena Volkov",
                role: "Brand Strategist",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="aspect-[3/4] bg-white/10 rounded-sm overflow-hidden mb-6 group-hover:bg-white/20 transition-colors duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg font-light tracking-wide mb-2">
                  {member.name}
                </h3>
                <p className="text-white/60 text-sm tracking-[0.1em] uppercase">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
