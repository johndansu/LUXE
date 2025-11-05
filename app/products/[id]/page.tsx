"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Heart,
} from "lucide-react";
import type { Product, CartItem } from "@/lib/supabase-db";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();

  const fetchCartCount = async () => {
    try {
      const response = await fetch("/api/cart");
      const cartItems: CartItem[] = await response.json();
      const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartItemCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    fetchCartCount();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      await fetchCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded-lg animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4 text-balance">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    (4.5) • 127 reviews
                  </span>
                </div>
                <p className="text-muted-foreground text-lg text-pretty">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-accent">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.stock_quantity <= 5 &&
                    product.stock_quantity > 0 && (
                      <Badge variant="destructive">
                        Only {product.stock_quantity} left!
                      </Badge>
                    )}
                  {product.stock_quantity === 0 && (
                    <Badge variant="secondary">Out of Stock</Badge>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stock_quantity, quantity + 1)
                        )
                      }
                      disabled={quantity >= product.stock_quantity}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock_quantity === 0}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.stock_quantity === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      On orders over $50
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      SSL protected checkout
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <RotateCcw className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Easy Returns</h3>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
