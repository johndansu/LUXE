import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { SeriousModeProvider } from "@/lib/serious-mode";
import { MinimalNav } from "@/components/minimal-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EliteStore - Professional Business Solutions",
  description:
    "Enterprise-grade products and services designed for modern businesses. Enhance productivity, security, and performance with our curated solutions.",
  generator: "EliteStore Professional Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MinimalNav />
        {children}
      </body>
    </html>
  );
}
