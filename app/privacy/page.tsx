"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Your privacy matters. Here’s how we handle your data.</p>
        </header>

        <section className="max-w-3xl space-y-4">
          <h2 className="font-semibold">Data We Collect</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Account & order details you provide.</li>
            <li>Payment confirmations from processors (no full card data stored).</li>
            <li>Technical logs and analytics (device, pages, events).</li>
          </ul>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="font-semibold">How We Use Data</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Fulfill orders, provide support, and personalize content.</li>
            <li>Prevent fraud and ensure platform security.</li>
            <li>Improve features and measure performance.</li>
          </ul>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Your Choices & Rights</h2>
          <p className="text-muted-foreground">
            Request access, correction, deletion, or export of your data by contacting privacy@urbanflex.example.
          </p>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Cookies & Analytics</h2>
          <p className="text-muted-foreground">
            We use cookies for essential functions and performance analytics. You can disable non‑essential cookies in
            your browser.
          </p>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Sharing & Transfers</h2>
          <p className="text-muted-foreground">
            We share data with service providers (e.g., payment, logistics) under contractual safeguards. International
            transfers may occur.
          </p>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Security & Retention</h2>
          <p className="text-muted-foreground">
            We use technical and organizational measures appropriate to risk and retain data only as long as necessary
            for the stated purposes.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
