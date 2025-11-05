"use client";

import { useState, useEffect } from "react";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  Edit,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { wishlistItems, refreshWishlist } = useWishlist();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setProfileData({
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            email: data.user.email,
          });
        }
      })
      .catch(() => {
        // User not logged in
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleEditProfile = () => {
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would typically make an API call to update the profile
      console.log("Saving profile:", profileData);
      setEditingProfile(false);
      // You could add a success message here
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancelEdit = () => {
    setProfileData({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
    setEditingProfile(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <p className="text-black/60 mb-6">
              You need to be logged in to view your account.
            </p>
            <Link href="/login">
              <Button className="bg-black hover:bg-black/80 text-white">
                Go to Login
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-light tracking-wide mb-2">
                Welcome back, {user.first_name}
              </h1>
              <p className="text-black/60">
                Manage your account and view your orders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="border-black/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1"
                          size="sm"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="flex-1"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Name:</span>{" "}
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                    </div>
                  )}
                  {!editingProfile && (
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={handleEditProfile}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Orders Card */}
              <Card className="border-black/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </CardTitle>
                  <CardDescription>View your order history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60 mb-4">
                    Track your recent orders and view order details
                  </p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={fetchOrders}
                      disabled={ordersLoading}
                    >
                      {ordersLoading ? "Loading..." : "Load Orders"}
                    </Button>
                    {orders.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Recent Orders:</p>
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order._id}
                            className="p-3 border border-black/10 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">
                                  Order #{order._id.slice(-6)}
                                </p>
                                <p className="text-xs text-black/60">
                                  {new Date(
                                    order.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  ${order.total.toFixed(2)}
                                </p>
                                <p className="text-xs text-black/60">
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Wishlist Card */}
              <Card className="border-black/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </CardTitle>
                  <CardDescription>Your saved items</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60 mb-4">
                    Items you've saved for later
                  </p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={refreshWishlist}
                    >
                      Refresh Wishlist
                    </Button>
                    {wishlistItems.length > 0 && (
                      <div className="text-center py-2">
                        <p className="text-sm font-medium">
                          {wishlistItems.length} item
                          {wishlistItems.length !== 1 ? "s" : ""} in wishlist
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-8 border-black/10 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border border-black/10 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Account created</p>
                      <p className="text-xs text-black/60">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {orders.length > 0 && (
                    <div className="flex items-center space-x-3 p-3 border border-black/10 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {orders.length} order{orders.length !== 1 ? "s" : ""}{" "}
                          placed
                        </p>
                        <p className="text-xs text-black/60">
                          Latest:{" "}
                          {new Date(orders[0].created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 p-3 border border-black/10 rounded-lg">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Profile last updated
                      </p>
                      <p className="text-xs text-black/60">
                        {new Date(user.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
