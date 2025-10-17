"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Smartphone, Building2 } from "lucide-react"

interface RazorpayPaymentProps {
  amount: number
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

export default function RazorpayPayment({ amount, onSuccess, onError }: RazorpayPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Create Razorpay order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
        }),
      })

      const { orderId } = await response.json()

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      // This is a demo implementation - in production, you would integrate with the actual Razorpay SDK

      // Simulate payment processing for demo
      setTimeout(() => {
        setIsProcessing(false)
        onSuccess(`pay_${Math.random().toString(36).substr(2, 9)}`)
      }, 3000)
    } catch (error) {
      setIsProcessing(false)
      onError(error instanceof Error ? error.message : "Payment failed")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Razorpay Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">Pay securely using Cards, UPI, Net Banking, and Wallets</div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 p-2 border rounded">
            <CreditCard className="h-3 w-3" />
            <span>Cards</span>
          </div>
          <div className="flex items-center gap-1 p-2 border rounded">
            <Smartphone className="h-3 w-3" />
            <span>UPI</span>
          </div>
          <div className="flex items-center gap-1 p-2 border rounded">
            <Building2 className="h-3 w-3" />
            <span>Banking</span>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          className="w-full bg-primary hover:bg-primary/90 neon-glow"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              <span>Opening Razorpay...</span>
            </div>
          ) : (
            `Pay ₹${amount} with Razorpay`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
