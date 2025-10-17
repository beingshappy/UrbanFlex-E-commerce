import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | UrbanFlex",
  description:
    "UrbanFlex is premium streetwear crafted for movement, longevity, and expression. Learn about our mission, materials, sustainability, and community.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 space-y-12">
      <header className="max-w-3xl">
        <h1 className="text-balance text-3xl md:text-5xl font-bold tracking-tight">
          Built for the Streets. Engineered to Last.
        </h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          UrbanFlex creates premium streetwear that balances form and function. We obsess over fit, fabric, and finish
          so you can move through the city with confidence—day or night.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Mission",
            body: "Design elevated essentials that perform, endure, and express individuality—without compromising comfort.",
          },
          {
            title: "Design Approach",
            body: "Every piece begins with movement: ergonomics-first patterning, breathable knits, and durable stitching.",
          },
          {
            title: "Quality & Longevity",
            body: "We test for pilling, colorfastness, and seam strength. UrbanFlex garments are made to be worn hard.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Materials That Work</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Combed cotton blends for everyday softness and breathability.</li>
            <li>Reinforced ribbing and coverstitch seams at high‑stress points.</li>
            <li>Moisture-wicking, quick-dry fabrics for training and commuting.</li>
            <li>Pre-shrunk and garment‑dyed finishes to stabilize fit and color.</li>
          </ul>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Sustainability in Practice</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Smarter cuts and lean production to minimize fabric waste.</li>
            <li>Responsible dye houses that meet wastewater standards.</li>
            <li>Plastic‑reduced packaging with recyclable mailers.</li>
            <li>Repair guidance and care resources to extend garment life.</li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: "2019", v: "Founded" },
          { k: "240+", v: "Core Products" },
          { k: "60+", v: "City Drops" },
          { k: "97%", v: "Customer Rating" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border bg-card p-4 text-center">
            <div className="text-2xl font-bold">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.k}</div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl">
        <h2 className="font-semibold">Community & Collaboration</h2>
        <p className="text-muted-foreground text-pretty mt-2">
          We partner with local artists, photographers, and athletes to bring authentic perspectives to each collection.
          Our Street Gallery highlights real looks from the community. Tag your fits with{" "}
          <span className="font-mono">#UrbanFlex</span> for a chance to be featured.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Press & Partnerships</h3>
          <p className="text-sm text-muted-foreground mt-2">
            For features, lookbooks, or collabs, email press@urbanflex.example. Include links to your work and
            timelines.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Where We Are</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Global team with studios across Bangalore, Mumbai, and Delhi; fulfillment partners in India and the EU.
          </p>
        </div>
      </section>
    </main>
  )
}
