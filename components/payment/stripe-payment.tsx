"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock } from "lucide-react"

interface StripePaymentProps {
  amount: number
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

export default function StripePayment({ amount, onSuccess, onError }: StripePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          paymentMethod: "stripe",
        }),
      })

      const { clientSecret, paymentIntentId } = await response.json()

      if (!response.ok) {
        throw new Error("Failed to create payment intent")
      }

      // Simulate payment processing
      setTimeout(() => {
        // In a real implementation, you would use Stripe Elements here
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        // const result = await stripe.confirmCardPayment(clientSecret, {
        //   payment_method: {
        //     card: elements.getElement(CardElement)!,
        //     billing_details: {
        //       name: cardDetails.name,
        //     },
        //   },
        // })

        setIsProcessing(false)
        onSuccess(paymentIntentId)
      }, 3000)
    } catch (error) {
      setIsProcessing(false)
      onError(error instanceof Error ? error.message : "Payment failed")
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              required
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              maxLength={19}
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                required
                maxLength={5}
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                required
                maxLength={4}
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/[^0-9]/g, "") })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              `Pay ₹${amount}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
