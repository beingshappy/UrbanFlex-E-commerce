"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Lock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import StripePayment from "@/components/payment/stripe-payment"
import RazorpayPayment from "@/components/payment/razorpay-payment"
import UPIPayment from "@/components/payment/upi-payment"

// Sample order data (would come from cart context)
const orderItems = [
  {
    id: "1",
    name: "Neon Strike Hoodie",
    price: 2999,
    image: "/neon-blue-streetwear-hoodie.jpg",
    size: "M",
    color: "Neon Blue",
    quantity: 1,
    customPrint: "FLEX ZONE",
  },
  {
    id: "2",
    name: "Urban Flex Joggers",
    price: 1999,
    image: "/black-streetwear-joggers.jpg",
    size: "L",
    color: "Midnight Black",
    quantity: 2,
  },
]

const orderSummary = {
  subtotal: 6997,
  customPrintFee: 199,
  shipping: 0,
  promoDiscount: 699,
  total: 6497,
}

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Review
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)

  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  })

  const [billingForm, setBillingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSuccess = (paymentId: string) => {
    console.log("Payment successful:", paymentId)
    router.push("/order-confirmation")
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    alert(`Payment failed: ${error}`)
  }

  const states = [
    "Andhra Pradesh",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Uttar Pradesh",
    "West Bengal",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="font-sans font-bold text-2xl md:text-3xl">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, title: "Shipping" },
              { step: 2, title: "Payment" },
              { step: 3, title: "Review" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= item.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.step}
                </div>
                <span className={`ml-2 text-sm ${step >= item.step ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.title}
                </span>
                {index < 2 && <div className="w-8 h-px bg-border mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={shippingForm.state}
                          onValueChange={(value) => setShippingForm({ ...shippingForm, state: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input
                          id="pincode"
                          required
                          value={shippingForm.pincode}
                          onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label htmlFor="razorpay" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <CreditCard className="h-4 w-4" />
                          <span>Razorpay (Cards, UPI, Net Banking)</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label htmlFor="stripe" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit/Debit Card (Stripe)</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <Smartphone className="h-4 w-4" />
                          <span>UPI Payment</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Component */}
                <div>
                  {paymentMethod === "stripe" && (
                    <StripePayment
                      amount={orderSummary.total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                  {paymentMethod === "razorpay" && (
                    <RazorpayPayment
                      amount={orderSummary.total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                  {paymentMethod === "upi" && (
                    <UPIPayment
                      amount={orderSummary.total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back to Shipping
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-card">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color}
                        </p>
                        {item.customPrint && (
                          <p className="text-xs text-muted-foreground">Print: "{item.customPrint}"</p>
                        )}
                        <p className="font-semibold text-sm">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{orderSummary.subtotal}</span>
                  </div>

                  {orderSummary.customPrintFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Custom Print</span>
                      <span>₹{orderSummary.customPrintFee}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{orderSummary.shipping === 0 ? "Free" : `₹${orderSummary.shipping}`}</span>
                  </div>

                  {orderSummary.promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Promo Discount</span>
                      <span>-₹{orderSummary.promoDiscount}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{orderSummary.total}</span>
                </div>

                {/* Security Info */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
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
