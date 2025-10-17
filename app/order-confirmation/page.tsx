import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Home } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = "UF" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-950/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="font-sans font-bold text-3xl md:text-4xl">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <Badge variant="secondary" className="font-mono">
                  {orderNumber}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="font-semibold text-lg">₹6,497</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{estimatedDelivery}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">Confirmed</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Processing</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Shipped</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-4">
            <h2 className="font-sans font-semibold text-xl">What's Next?</h2>
            <div className="text-left space-y-2 text-muted-foreground">
              <p>• You'll receive an email confirmation shortly</p>
              <p>• We'll send you tracking information once your order ships</p>
              <p>• Your order will be delivered within 3-5 business days</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile/orders">
              <Button variant="outline" size="lg">
                Track Your Order
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team at{" "}
              <Link href="mailto:support@urbanflex.com" className="text-primary hover:underline">
                support@urbanflex.com
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
