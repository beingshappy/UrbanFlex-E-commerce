"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import useSWR from "swr"

export default function LimitedPage() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, isLoading } = useSWR<{ items: any[] }>(`/api/products?badge=Limited&limit=24&sort=newest`, fetcher)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Limited Edition</h1>
          <p className="text-muted-foreground">Exclusive pieces in limited quantities. Don’t miss out.</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="h-64 bg-card border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data?.items?.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
