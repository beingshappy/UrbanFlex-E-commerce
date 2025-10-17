"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">The rules that govern using UrbanFlex.</p>
        </header>

        <section className="max-w-3xl space-y-4">
          <h2 className="font-semibold">Use of Service</h2>
          <p className="text-muted-foreground">
            By accessing the site you agree to comply with local laws and our policies.
          </p>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="font-semibold">Orders & Payments</h2>
          <p className="text-muted-foreground">
            We reserve the right to refuse or cancel orders. Prices and availability are subject to change.
          </p>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="font-semibold">Liability</h2>
          <p className="text-muted-foreground">
            UrbanFlex is not liable for indirect or incidental damages beyond the order value.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Accounts & Eligibility</h2>
          <p className="text-muted-foreground">
            You must be of legal age in your jurisdiction and provide accurate information to create an account.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Pricing, Promotions & Availability</h2>
          <p className="text-muted-foreground">
            Prices and promotions may change without notice. Some items may have limited quantities or sell out.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">User Content & IP</h2>
          <p className="text-muted-foreground">
            By submitting content, you grant UrbanFlex the right to display and share it with attribution.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential
            damages.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Governing Law & Disputes</h2>
          <p className="text-muted-foreground">
            These terms are governed by Indian law. Disputes will be resolved in the courts of Bangalore, India.
          </p>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may update these terms periodically. Material changes will be communicated via the website or email.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
