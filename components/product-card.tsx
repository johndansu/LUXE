"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart } from "lucide-react";
import type { Product } from "@/lib/supabase-db";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Use the cart context if no onAddToCart prop is provided
    if (onAddToCart) {
      onAddToCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Stock Badge */}
        {product.stock_quantity <= 10 && (
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 text-xs z-10"
          >
            Low Stock
          </Badge>
        )}
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button
            variant="secondary"
            size="sm"
            className={`h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg border border-slate-200 ${
              isInWishlist(product._id) ? "text-red-500" : "text-slate-600"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product._id) ? "fill-current" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex flex-1 flex-col space-y-3">
          {/* Category */}
          <Badge
            variant="outline"
            className="text-xs border-slate-200 text-slate-600 bg-slate-50"
          >
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors text-sm leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-600 ml-1">(4.5)</span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="space-y-1">
              <p className="text-lg font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div className="text-right">
              <p
                className={`text-xs font-medium ${
                  product.stock_quantity > 20
                    ? "text-green-600"
                    : product.stock_quantity > 10
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {product.stock_quantity > 20
                  ? "In Stock"
                  : product.stock_quantity > 10
                  ? "Limited Stock"
                  : "Low Stock"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="mt-auto p-4 pt-0">
        <div className="w-full space-y-2">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white h-10"
            disabled={product.stock_quantity === 0}
          >
            {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          {product.stock_quantity > 0 && (
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 h-10"
            >
              Quick View
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
