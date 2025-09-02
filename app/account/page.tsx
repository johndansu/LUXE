"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, MapPin, Settings, CreditCard, Heart } from "lucide-react"
import type { User as UserType, CartItem } from "@/lib/auth"

export default function AccountPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartItemCount, setCartItemCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

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

    fetchUserData()
    fetchCartCount()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={cartItemCount} />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.first_name}! Manage your account and view your orders.
            </p>
          </div>

          {/* Account Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.first_name} {user.last_name}
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No orders yet</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  <Package className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Addresses</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No addresses saved</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">View Orders</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <MapPin className="h-6 w-6 mb-2" />
                  <span className="text-sm">Manage Addresses</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-sm">Payment Methods</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Heart className="h-6 w-6 mb-2" />
                  <span className="text-sm">Wishlist</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{user.phone || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since:</span>
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Status</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active Account
                    </Badge>
                    <p className="text-sm text-muted-foreground">Your account is in good standing. Enjoy shopping!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
