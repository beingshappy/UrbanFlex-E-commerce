"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"

// Sample cart data
const initialCartItems = [
  {
    id: "1",
    name: "Neon Strike Hoodie",
    price: 2999,
    originalPrice: 3999,
    image: "/neon-blue-streetwear-hoodie.jpg",
    size: "M",
    color: "Neon Blue",
    quantity: 1,
    customPrint: "FLEX ZONE",
    inStock: true,
  },
  {
    id: "2",
    name: "Urban Flex Joggers",
    price: 1999,
    originalPrice: 2499,
    image: "/black-streetwear-joggers.jpg",
    size: "L",
    color: "Midnight Black",
    quantity: 2,
    customPrint: "",
    inStock: true,
  },
  {
    id: "3",
    name: "Street Glow Tee",
    price: 1299,
    image: "/pink-neon-streetwear-tshirt.jpg",
    size: "M",
    color: "Electric Pink",
    quantity: 1,
    customPrint: "",
    inStock: false,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // Sample promo codes
    const promoCodes = {
      FLEX10: 10,
      STREET15: 15,
      URBAN20: 20,
    }

    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
      setPromoCode("")
    } else {
      alert("Invalid promo code")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const customPrintFee = cartItems.filter((item) => item.customPrint).length * 199 // ₹199 per custom print
  const shipping = subtotal > 2000 ? 0 : 199 // Free shipping over ₹2000
  const promoDiscount = appliedPromo ? Math.round((subtotal * appliedPromo.discount) / 100) : 0
  const total = subtotal + customPrintFee + shipping - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <div>
              <h1 className="font-sans font-bold text-2xl mb-2">Your Cart is Empty</h1>
              <p className="text-muted-foreground">Add some streetwear to get started!</p>
            </div>
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-sans font-bold text-2xl md:text-3xl mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-card">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium hover:text-primary transition-colors">{item.name}</h3>
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                          {item.customPrint && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Custom Print: "{item.customPrint}" (+₹199)
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!item.inStock}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!item.inStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link href="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <span className="font-medium text-green-700 dark:text-green-400">{appliedPromo.code}</span>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        {appliedPromo.discount}% discount applied
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removePromoCode}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} disabled={!promoCode.trim()}>
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {customPrintFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Custom Print ({cartItems.filter((item) => item.customPrint).length} items)</span>
                      <span>₹{customPrintFee}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Promo Discount ({appliedPromo?.code})</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">Add ₹{2000 - subtotal} more for free shipping</p>
                )}

                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90 neon-glow" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Secure checkout powered by Stripe & Razorpay</p>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Easy returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free shipping on orders over ₹2000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
