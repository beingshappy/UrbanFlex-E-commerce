"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Edit, Eye, Star, Truck } from "lucide-react"
import Image from "next/image"

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  avatar: "/placeholder.svg?key=avatar",
  loyaltyPoints: 1250,
  memberSince: "January 2024",
}

// Sample order data
const orderHistory = [
  {
    id: "UF123456789",
    date: "2024-01-15",
    status: "Delivered",
    total: 6497,
    items: [
      {
        name: "Neon Strike Hoodie",
        image: "/neon-blue-streetwear-hoodie.jpg",
        size: "M",
        color: "Neon Blue",
        price: 2999,
      },
      {
        name: "Urban Flex Joggers",
        image: "/black-streetwear-joggers.jpg",
        size: "L",
        color: "Black",
        price: 1999,
      },
    ],
  },
  {
    id: "UF987654321",
    date: "2024-01-08",
    status: "Shipped",
    total: 3299,
    items: [
      {
        name: "Street Glow Tee",
        image: "/pink-neon-streetwear-tshirt.jpg",
        size: "M",
        color: "Pink",
        price: 1299,
      },
    ],
  },
]

// Sample wishlist data
const wishlistItems = [
  {
    id: "3",
    name: "Street Glow Tee",
    price: 1299,
    image: "/pink-neon-streetwear-tshirt.jpg",
    badge: "Limited" as const,
  },
  {
    id: "4",
    name: "Flex Zone Jacket",
    price: 4999,
    originalPrice: 5999,
    image: "/black-streetwear-jacket-neon-accents.jpg",
  },
]

// Sample addresses
const savedAddresses = [
  {
    id: "1",
    type: "Home",
    name: "John Doe",
    address: "123 Street Name, Area Name",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "2",
    type: "Office",
    name: "John Doe",
    address: "456 Business District, Corporate Area",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400002",
    phone: "+91 98765 43210",
    isDefault: false,
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-sans font-semibold text-lg">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                    <p className="text-xs text-muted-foreground">Member since {userData.memberSince}</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                    <p className="text-sm font-medium">Loyalty Points</p>
                    <p className="text-2xl font-bold text-primary">{userData.loyaltyPoints}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "addresses" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === "payments" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("payments")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{orderHistory.length}</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{wishlistItems.length}</p>
                      <p className="text-sm text-muted-foreground">Wishlist Items</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
                      <p className="text-sm text-muted-foreground">Loyalty Points</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderHistory.slice(0, 2).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 2).map((item, index) => (
                                <div
                                  key={index}
                                  className="w-10 h-10 rounded-lg overflow-hidden border-2 border-background"
                                >
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            <p className="text-sm font-medium mt-1">₹{order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => setActiveTab("orders")}>
                        View All Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                              <p className="text-lg font-semibold mt-1">₹{order.total}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-card">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.size} • {item.color}
                                  </p>
                                  <p className="font-semibold">₹{item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm">
                                <Star className="mr-2 h-4 w-4" />
                                Write Review
                              </Button>
                            )}
                            {order.status === "Shipped" && (
                              <Button variant="outline" size="sm">
                                <Truck className="mr-2 h-4 w-4" />
                                Track Order
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-card">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {item.badge && (
                              <Badge
                                variant={item.badge === "Limited" ? "destructive" : "secondary"}
                                className="absolute top-2 left-2"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium mb-2">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button>Add New Address</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{address.type}</h3>
                                {address.isDefault && (
                                  <Badge variant="secondary" className="text-xs">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="font-medium">{address.name}</p>
                              <p className="text-sm text-muted-foreground">{address.address}</p>
                              <p className="text-sm text-muted-foreground">
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              <p className="text-sm text-muted-foreground">{address.phone}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payments" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Payment Methods</CardTitle>
                    <Button>Add New Card</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 1234</p>
                              <p className="text-sm text-muted-foreground">Expires 12/26</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-6 bg-gradient-to-r from-red-600 to-red-400 rounded"></div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 5678</p>
                              <p className="text-sm text-muted-foreground">Expires 08/27</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <Button variant="outline">Edit Profile</Button>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Password</h3>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Notifications</h3>
                        <Button variant="outline">Manage Preferences</Button>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Privacy</h3>
                        <Button variant="outline">Privacy Settings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
