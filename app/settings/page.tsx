"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  CreditCard,
  Building2,
  Zap,
  Eye,
  Lock,
  Download,
  Upload,
  Trash2,
  Plus,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { SeriousModeToggle } from "@/components/serious-mode-toggle";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    biometric: false,
    sessionTimeout: 30,
  });

  const [theme, setTheme] = useState("business");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-600">
                  Manage your account and preferences
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="border-slate-200 text-slate-600"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                All Changes Saved
              </Badge>
              <SeriousModeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 bg-white border border-slate-200 shadow-sm">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex items-center space-x-2"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <Card className="lg:col-span-2 bg-white border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-slate-600" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your personal and business information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue="John"
                        className="border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue="Doe"
                        className="border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      defaultValue="john.doe@company.com"
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      defaultValue="Acme Corporation"
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      defaultValue="Senior Developer"
                      className="border-slate-300"
                    />
                  </div>
                  <Button className="bg-slate-800 hover:bg-slate-900 text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <div className="space-y-6">
                <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Member Since</span>
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700"
                      >
                        Jan 2024
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Account Type</span>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        <Building2 className="h-3 w-3 mr-1" />
                        Business
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Last Login</span>
                      <span className="text-sm text-slate-500">
                        2 hours ago
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-slate-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">
                      Communication
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-notifications"
                            className="text-sm font-medium"
                          >
                            Email Notifications
                          </Label>
                          <p className="text-xs text-slate-500">
                            Receive updates via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              email: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="push-notifications"
                            className="text-sm font-medium"
                          >
                            Push Notifications
                          </Label>
                          <p className="text-xs text-slate-500">
                            Get instant browser notifications
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              push: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="sms-notifications"
                            className="text-sm font-medium"
                          >
                            SMS Notifications
                          </Label>
                          <p className="text-xs text-slate-500">
                            Receive text messages
                          </p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, sms: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Content</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="marketing-notifications"
                            className="text-sm font-medium"
                          >
                            Marketing Updates
                          </Label>
                          <p className="text-xs text-slate-500">
                            Product announcements and offers
                          </p>
                        </div>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              marketing: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="bg-slate-200" />
                <Button className="bg-slate-800 hover:bg-slate-900 text-white">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-slate-600" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="two-factor"
                        className="text-sm font-medium"
                      >
                        Two-Factor Authentication
                      </Label>
                      <p className="text-xs text-slate-500">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={security.twoFactor}
                      onCheckedChange={(checked) =>
                        setSecurity({ ...security, twoFactor: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="biometric"
                        className="text-sm font-medium"
                      >
                        Biometric Login
                      </Label>
                      <p className="text-xs text-slate-500">
                        Use fingerprint or face ID
                      </p>
                    </div>
                    <Switch
                      id="biometric"
                      checked={security.biometric}
                      onCheckedChange={(checked) =>
                        setSecurity({ ...security, biometric: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          sessionTimeout: parseInt(e.target.value),
                        })
                      }
                      className="border-slate-300"
                    />
                  </div>
                  <Button className="bg-slate-800 hover:bg-slate-900 text-white">
                    Update Security Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Login from Chrome
                      </p>
                      <p className="text-xs text-slate-500">
                        2 hours ago • New York, US
                      </p>
                    </div>
                    <Eye className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Password Changed
                      </p>
                      <p className="text-xs text-slate-500">
                        1 day ago • New York, US
                      </p>
                    </div>
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Failed Login Attempt
                      </p>
                      <p className="text-xs text-slate-500">
                        3 days ago • Unknown Location
                      </p>
                    </div>
                    <AlertTriangle className="h-4 w-4 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-slate-600" />
                  <span>Theme & Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      theme === "business"
                        ? "border-slate-800 bg-slate-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setTheme("business")}
                  >
                    <div className="w-full h-20 bg-gradient-to-br from-slate-800 to-slate-600 rounded mb-3"></div>
                    <h3 className="font-medium text-slate-900">Business</h3>
                    <p className="text-sm text-slate-500">
                      Professional and clean
                    </p>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      theme === "modern"
                        ? "border-slate-800 bg-slate-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setTheme("modern")}
                  >
                    <div className="w-full h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded mb-3"></div>
                    <h3 className="font-medium text-slate-900">Modern</h3>
                    <p className="text-sm text-slate-500">
                      Bold and contemporary
                    </p>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      theme === "minimal"
                        ? "border-slate-800 bg-slate-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setTheme("minimal")}
                  >
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-3"></div>
                    <h3 className="font-medium text-slate-900">Minimal</h3>
                    <p className="text-sm text-slate-500">Simple and focused</p>
                  </div>
                </div>
                <Button className="bg-slate-800 hover:bg-slate-900 text-white">
                  Apply Theme
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-slate-600" />
                  <span>Billing & Subscription</span>
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900">
                        Business Plan
                      </h3>
                      <p className="text-sm text-slate-500">
                        $29/month • Next billing: Feb 1, 2024
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full border-slate-300">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-slate-600" />
                  <span>Advanced Settings</span>
                </CardTitle>
                <CardDescription>
                  Advanced configuration and system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">API Access</Label>
                    <p className="text-xs text-slate-500">
                      Enable API access for integrations
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Debug Mode</Label>
                    <p className="text-xs text-slate-500">
                      Enable detailed logging and debugging
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Beta Features</Label>
                    <p className="text-xs text-slate-500">
                      Access to experimental features
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button className="bg-slate-800 hover:bg-slate-900 text-white">
                  Save Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
