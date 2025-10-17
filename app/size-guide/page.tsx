"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SizeGuidePage() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const chart = [
    { label: "Chest (in)", values: ["34–36", "36–38", "38–40", "40–42", "42–44", "44–46"] },
    { label: "Length (in)", values: ["25", "26", "27", "28", "29", "30"] },
    { label: "Sleeve (in)", values: ["23", "24", "25", "26", "27", "28"] },
  ]
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 space-y-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Size Guide</h1>
          <p className="text-muted-foreground">
            Use this guide to find your ideal fit. Measurements may vary slightly by style.
          </p>
        </header>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Measurement</th>
                {sizes.map((s) => (
                  <th key={s} className="p-3 text-left">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.map((row) => (
                <tr key={row.label} className="border-b">
                  <td className="p-3 font-medium">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${i}`} className="p-3 text-muted-foreground">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">How to Measure</h2>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Chest: Measure around the fullest part with the tape under your arms.</li>
              <li>Length: Measure from the shoulder seam to the hem.</li>
              <li>Sleeve: Measure from shoulder seam to the end of cuff.</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">Category Notes</h2>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Tees: True to size with a relaxed silhouette.</li>
              <li>Hoodies: Slightly oversized; size down for a closer fit.</li>
              <li>Bottoms: Elastic waist with drawcord; refer to hip measurement.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl space-y-2">
          <h2 className="font-semibold">Fit Tips</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>For an oversized look, consider one size up.</li>
            <li>Measure a similar garment you own and compare with the chart.</li>
            <li>Contact support for personalized fit assistance.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
