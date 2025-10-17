"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-10">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Careers at UrbanFlex</h1>
          <p className="text-muted-foreground">
            Join a team shaping the future of streetwear. We’re looking for creative, driven people.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Product Designer", location: "Remote / Bangalore", type: "Full-time" },
            { title: "Frontend Engineer", location: "Remote / Mumbai", type: "Full-time" },
            { title: "Brand Marketing Manager", location: "Remote / Delhi", type: "Full-time" },
            { title: "Customer Experience Lead", location: "Remote / Hybrid", type: "Full-time" },
          ].map((role) => (
            <div key={role.title} className="p-6 rounded-lg border bg-card">
              <h2 className="font-semibold">{role.title}</h2>
              <p className="text-sm text-muted-foreground">
                {role.location} • {role.type}
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                Help us deliver premium experiences across product, brand, and community.
              </p>
            </div>
          ))}
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="font-semibold">Our Values</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Craft with care: details and durability come first.</li>
            <li>Move fast responsibly: iterate without compromising quality.</li>
            <li>Community over clout: build with our audience, not at them.</li>
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { k: "Hybrid-first", v: "Remote-friendly roles with in-person offsites" },
            { k: "Benefits", v: "Health cover, learning stipends, gear discounts" },
            { k: "Growth", v: "Clear leveling, mentorship, measurable impact" },
          ].map((b) => (
            <div key={b.k} className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">{b.k}</h3>
              <p className="text-sm text-muted-foreground mt-2">{b.v}</p>
            </div>
          ))}
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">How to Apply</h2>
          <p className="text-muted-foreground">
            Email careers@urbanflex.example with your CV, portfolio links, and a short note about why you want to join.
          </p>
          <p className="text-xs text-muted-foreground">We’re an equal opportunity employer.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
