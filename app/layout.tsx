import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SeriousModeProvider } from "@/lib/serious-mode";
import { MinimalNav } from "@/components/minimal-nav";
import { ToastContainer } from "@/components/toast";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUXE - Timeless Style",
  description:
    "Discover the art of sophisticated dressing. Each piece tells a story of craftsmanship, elegance, and timeless beauty that transcends seasons.",
  generator: "LUXE E-commerce Platform",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SeriousModeProvider>
          <CartProvider>
            <WishlistProvider>
              <MinimalNav />
              {children}
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </SeriousModeProvider>
      </body>
    </html>
  );
}
