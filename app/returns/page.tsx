"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Returns & Exchanges</h1>
          <p className="text-muted-foreground">Hassle-free returns within 30 days of delivery.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Eligibility</h2>
            <p className="text-muted-foreground">
              Items must be unworn, unwashed, and in original packaging with tags attached.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Process</h2>
            <p className="text-muted-foreground">
              Start a return by contacting support with your order ID and reason. We'll guide you through the steps.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Refunds</h2>
            <p className="text-muted-foreground">
              Refunds are issued to the original payment method within 5–7 business days of approval.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Non-Returnable Items</h2>
            <p className="text-muted-foreground text-sm">
              Gift cards, final sale items, and worn or washed garments are not eligible for return.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Exchanges</h2>
            <p className="text-muted-foreground text-sm">
              For size exchanges, initiate a return and select your preferred replacement. We’ll ship the new size once
              the original is scanned by the carrier.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Defective Items</h2>
            <p className="text-muted-foreground text-sm">
              If you receive a damaged or defective product, contact support within 7 days with photos. We’ll prioritize
              a replacement or refund.
            </p>
          </div>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">How to Start a Return</h2>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
            <li>Locate your order ID in your confirmation email.</li>
            <li>Email support@urbanflex.example with the subject “Return + Order ID”.</li>
            <li>Print your label and package items securely; include all tags and accessories.</li>
          </ol>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Refund Timelines</h2>
          <p className="text-muted-foreground">
            Once approved, refunds typically post within 5–7 business days depending on your bank or payment provider.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
