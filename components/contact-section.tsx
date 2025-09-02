"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Twitter,
  Heart,
  Train,
  Car,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Contact Content */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-px h-20 bg-black/20 mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-wide text-black">
              Contact Us
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              We'd love to hear from you. Whether you have questions about our
              collections or want to collaborate, we're here to help.
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-light tracking-wide mb-8 text-black">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-light tracking-wide text-black/70 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-light tracking-wide text-black/70 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-light tracking-wide text-black/70 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black/20 bg-transparent text-black focus:border-black/40 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collection">Collection Question</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-light tracking-wide text-black/70 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-black/20 bg-transparent text-black placeholder-black/40 focus:border-black/40 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white hover:bg-black/90 transition-all duration-500 overflow-hidden group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-light">
                    Send Message
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-light tracking-wide mb-8 text-black">
                Get in Touch
              </h3>

              <div className="space-y-8">
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-black/60 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-2">
                        Email
                      </h4>
                      <p className="text-black/80">hello@luxe.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-black/60 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-2">
                        Phone
                      </h4>
                      <p className="text-black/80">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-black/60 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-2">
                        Address
                      </h4>
                      <p className="text-black/80">
                        123 Fashion Avenue
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-black/60 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-4">
                      Business Hours
                    </h4>
                    <div className="space-y-2 text-black/80">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-sm font-light tracking-[0.2em] uppercase text-black/60 mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 border border-black/20 text-black/70 hover:border-black/40 hover:text-black transition-all duration-300 text-sm tracking-[0.1em] uppercase"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 border border-black/20 text-black/70 hover:border-black/40 hover:text-black transition-all duration-300 text-sm tracking-[0.1em] uppercase"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 border border-black/20 text-black/70 hover:border-black/40 hover:text-black transition-all duration-300 text-sm tracking-[0.1em] uppercase"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Pinterest</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
              Visit Our Studio
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience our collection in person at our flagship studio
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto mt-8"></div>
          </motion.div>

          <motion.div
            className="relative aspect-[16/9] bg-black/10 overflow-hidden rounded-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=675&fit=crop"
              alt="LUXE Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-light tracking-wide mb-2">
                  LUXE Studio
                </h3>
                <p className="text-white/80">
                  123 Fashion Avenue, New York, NY 10001
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-black">
              Find Us
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Located in the heart of Manhattan's fashion district
            </p>
            <div className="w-32 h-px bg-black/20 mx-auto mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map Container */}
            <motion.div
              className="relative aspect-[4/3] bg-black/5 overflow-hidden rounded-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Interactive Map Placeholder - In a real app, you'd embed Google Maps or similar */}
              <div className="w-full h-full bg-gradient-to-br from-black/10 to-black/5 flex items-center justify-center">
                <div className="text-center text-black/60">
                  <div className="w-16 h-16 border border-black/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <p className="text-sm tracking-wide uppercase">
                    Interactive Map
                  </p>
                  <p className="text-xs mt-2">123 Fashion Avenue</p>
                </div>
              </div>

              {/* Map overlay with location pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            </motion.div>

            {/* Location Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="text-xl font-light tracking-wide mb-4 text-black">
                  Studio Location
                </h3>
                <div className="space-y-4 text-black/70">
                  <p className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-black/60" />
                    <span>
                      123 Fashion Avenue
                      <br />
                      New York, NY 10001
                    </span>
                  </p>
                  <p className="flex items-center">
                    <Train className="w-5 h-5 mr-3 text-black/60" />
                    <span>5 min walk from Times Square Station</span>
                  </p>
                  <p className="flex items-center">
                    <Car className="w-5 h-5 mr-3 text-black/60" />
                    <span>Valet parking available</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-black/60 mt-0.5" />
                <div>
                  <h3 className="text-xl font-light tracking-wide mb-4 text-black">
                    Studio Hours
                  </h3>
                  <div className="space-y-2 text-black/70">
                    <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                    <p>Saturday: 11:00 AM - 6:00 PM</p>
                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light tracking-wide mb-4 text-black">
                  Book an Appointment
                </h3>
                <p className="text-black/60 mb-4">
                  Schedule a private consultation to explore our collection
                </p>
                <button className="px-6 py-3 border border-black/20 text-black hover:border-black/40 transition-all duration-300">
                  <span className="text-sm tracking-[0.15em] uppercase font-light">
                    Book Now
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
