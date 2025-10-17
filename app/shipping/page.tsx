"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shipping Information</h1>
          <p className="text-muted-foreground">
            Learn about delivery timelines, shipping fees, and international availability.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Processing Times</h2>
            <p className="text-muted-foreground">
              Orders ship within 1–2 business days. Personalized prints may require an additional 1–2 days.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Shipping Fees</h2>
            <p className="text-muted-foreground">
              Free shipping on orders over ₹2000. Standard shipping is ₹199 below the threshold.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Delivery Estimates</h2>
            <p className="text-muted-foreground">
              Metro cities: 2–4 days, Other regions: 4–7 days. International: 7–14 days.
            </p>
          </div>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Tracking</h2>
          <p className="text-muted-foreground">
            You’ll receive tracking details via email/SMS as soon as your order ships.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">International Shipping</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Duties and taxes may be collected by the carrier on delivery, depending on your country.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">Carriers</h2>
            <p className="text-sm text-muted-foreground mt-2">
              We work with Delhivery, Bluedart, and India Post domestically; DHL and FedEx for cross‑border.
            </p>
          </div>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Address Changes & PO Boxes</h2>
          <p className="text-muted-foreground">
            For address corrections, contact support within 1 hour of placing the order. PO boxes may require India
            Post.
          </p>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Lost or Delayed Shipments</h2>
          <p className="text-muted-foreground">
            If your package appears stalled, reach out with your tracking ID. We’ll coordinate with the carrier and keep
            you updated.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
