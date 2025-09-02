"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import type { CartItem } from "@/lib/db"

export default function CheckoutSuccessPage() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    async function fetchCartCount() {
      try {
        const response = await fetch("/api/cart")
        const cartItems: CartItem[] = await response.json()
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        setCartItemCount(totalItems)
      } catch (error) {
        console.error("Error fetching cart count:", error)
      }
    }

    fetchCartCount()
  }, [])

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground text-lg">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-2xl font-bold text-accent">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Mail className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold">Confirmation Email</p>
                    <p className="text-muted-foreground">Sent to your email address</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Package className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold">Estimated Delivery</p>
                    <p className="text-muted-foreground">3-5 business days</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We'll send you tracking information once your order ships.
                  </p>
                  <p className="text-sm text-muted-foreground">Questions about your order? Contact our support team.</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/account">View Account</Link>
              </Button>
            </div>

            {/* Additional Information */}
            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold mb-4">What happens next?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <p className="font-semibold">Order Processing</p>
                  <p className="text-muted-foreground">We prepare your items for shipment</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <p className="font-semibold">Shipping</p>
                  <p className="text-muted-foreground">Your order is on its way</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <p className="font-semibold">Delivery</p>
                  <p className="text-muted-foreground">Enjoy your new products!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
