"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Smartphone, QrCode } from "lucide-react"

interface UPIPaymentProps {
  amount: number
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

export default function UPIPayment({ amount, onSuccess, onError }: UPIPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [upiId, setUpiId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"upi_id" | "qr">("upi_id")

  const handlePayment = async () => {
    if (paymentMethod === "upi_id" && !upiId) {
      onError("Please enter a valid UPI ID")
      return
    }

    setIsProcessing(true)

    try {
      // Create UPI payment request
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          method: "upi",
        }),
      })

      const { orderId } = await response.json()

      if (!response.ok) {
        throw new Error("Failed to create UPI payment")
      }

      // Simulate UPI payment processing
      setTimeout(() => {
        setIsProcessing(false)
        onSuccess(`upi_${Math.random().toString(36).substr(2, 9)}`)
      }, 3000)
    } catch (error) {
      setIsProcessing(false)
      onError(error instanceof Error ? error.message : "UPI payment failed")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          UPI Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            variant={paymentMethod === "upi_id" ? "default" : "outline"}
            size="sm"
            onClick={() => setPaymentMethod("upi_id")}
            className="flex-1"
          >
            UPI ID
          </Button>
          <Button
            variant={paymentMethod === "qr" ? "default" : "outline"}
            size="sm"
            onClick={() => setPaymentMethod("qr")}
            className="flex-1"
          >
            <QrCode className="h-4 w-4 mr-1" />
            QR Code
          </Button>
        </div>

        {paymentMethod === "upi_id" ? (
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input id="upiId" placeholder="yourname@paytm" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            <p className="text-xs text-muted-foreground">Enter your UPI ID (e.g., yourname@paytm, yourname@phonepe)</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">QR Code will appear here</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Scan this QR code with any UPI app to pay ₹{amount}</p>
          </div>
        )}

        <Button
          onClick={handlePayment}
          className="w-full bg-primary hover:bg-primary/90 neon-glow"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              <span>Processing UPI Payment...</span>
            </div>
          ) : (
            `Pay ₹${amount} via UPI`
          )}
        </Button>

        <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
          <span>Supported:</span>
          <span>PhonePe</span>
          <span>Paytm</span>
          <span>GPay</span>
          <span>BHIM</span>
        </div>
      </CardContent>
    </Card>
  )
}
