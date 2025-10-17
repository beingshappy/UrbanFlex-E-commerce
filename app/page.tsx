import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck, Star, Users, Award } from "lucide-react"
import Link from "next/link"
import HeroCarousel from "@/components/hero-carousel"

// Sample product data
const featuredProducts = [
  {
    id: "1",
    name: "Urban Elite Hoodie",
    price: 2999,
    originalPrice: 3999,
    image: "/modern-navy-hoodie-with-orange-accents.jpg",
    badge: "New" as const,
    reviews: 124,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Flex Zone Joggers",
    price: 1999,
    originalPrice: 2499,
    image: "/premium-black-joggers-streetwear.jpg",
    badge: "Bestseller" as const,
    reviews: 256,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Street Glow Tee",
    price: 1299,
    image: "/orange-streetwear-t-shirt-modern-design.jpg",
    badge: "Limited" as const,
    reviews: 89,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Urban Tech Jacket",
    price: 4999,
    originalPrice: 5999,
    image: "/navy-tech-jacket-with-orange-details.jpg",
    reviews: 67,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Flex Cargo Pants",
    price: 2499,
    image: "/modern-cargo-pants-streetwear-style.jpg",
    reviews: 143,
    rating: 4.5,
  },
  {
    id: "6",
    name: "Urban Sneakers",
    price: 3499,
    originalPrice: 4299,
    image: "/modern-sneakers-navy-and-orange-colorway.jpg",
    badge: "New" as const,
    reviews: 78,
    rating: 4.8,
  },
]

const categories = [
  {
    name: "Hoodies & Sweatshirts",
    image: "/modern-hoodie-collection-display.jpg",
    count: "24 items",
  },
  {
    name: "T-Shirts & Tops",
    image: "/streetwear-t-shirt-collection.jpg",
    count: "36 items",
  },
  {
    name: "Pants & Joggers",
    image: "/modern-joggers-and-pants-collection.jpg",
    count: "18 items",
  },
  {
    name: "Accessories",
    image: "/streetwear-accessories-collection.jpg",
    count: "42 items",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="px-4 container mx-auto my-6">
        <HeroCarousel />
      </div>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-card/30 hover-scale">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose UrbanFlex</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We're committed to delivering the highest quality streetwear with unmatched style and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center space-y-6 group">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Crafted with the finest materials and attention to detail for ultimate comfort and durability that
                lasts.
              </p>
            </div>
            <div className="text-center space-y-6 group">
              <div className="h-16 w-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Authentic Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Original streetwear designs that reflect urban culture and help you express your unique personality.
              </p>
            </div>
            <div className="text-center space-y-6 group">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quick and secure delivery straight to your doorstep with real-time tracking and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-24 hover-scale">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our curated collections designed for every aspect of urban lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-24 bg-card/30 hover-scale">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Drops</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our latest streetwear collection designed to make you stand out from the crowd.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* View All Products button links to /shop */}
          <div className="text-center mt-16">
            <Link href="/shop" className="inline-flex">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-8 py-4 text-lg font-semibold"
              >
                View All Products <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-24 hover-scale">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Trusted by Thousands</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join the UrbanFlex community and see why we're the go-to choice for streetwear enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">50K+</h3>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">4.8/5</h3>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">100+</h3>
                <p className="text-muted-foreground">Products Launched</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground hover-scale">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay in the Loop</h2>
            <p className="text-lg text-primary-foreground/90">
              Be the first to know about new drops, exclusive offers, and street style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-3 neon-glow-orange">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
