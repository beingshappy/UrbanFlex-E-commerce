"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { getProductById, generateProducts } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

// Sample reviews
const reviews = [
  {
    id: 1,
    name: "Alex Chen",
    rating: 5,
    date: "2024-01-15",
    comment: "Amazing quality! The neon accents really pop and the fit is perfect. Definitely worth the price.",
    verified: true,
  },
  {
    id: 2,
    name: "Jordan Smith",
    rating: 4,
    date: "2024-01-10",
    comment: "Great hoodie, very comfortable. The material feels premium. Only wish it came in more colors.",
    verified: true,
  },
  {
    id: 3,
    name: "Maya Patel",
    rating: 5,
    date: "2024-01-08",
    comment: "Love this hoodie! Gets so many compliments. The neon blue is exactly as shown in the photos.",
    verified: false,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const all = generateProducts(240)
  const productGen = getProductById(productId, all)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [customPrint, setCustomPrint] = useState("")

  const { addItem } = useCart()
  const { toast } = useToast()

  if (!productGen) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-sans font-bold text-2xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = productGen.originalPrice
    ? Math.round(((productGen.originalPrice - productGen.price) / productGen.originalPrice) * 100)
    : 0
  const availableSizes = productGen.sizes.map((s) => ({ size: s, inStock: true }))
  const availableColors = [
    { name: productGen.color, value: productGen.color.toLowerCase(), hex: "#1a237e", inStock: true },
    { name: "Black", value: "black", hex: "#111111", inStock: true },
  ]

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }
    addItem({
      id: productGen.id,
      title: productGen.name,
      price: productGen.price,
      image: productGen.image,
      quantity,
    })
    toast({ title: "Added to cart", description: `${productGen.name} (${selectedSize}, ${selectedColor}) added.` })
  }

  const product = {
    id: productGen.id,
    name: productGen.name,
    price: productGen.price,
    originalPrice: productGen.originalPrice,
    description: productGen.description,
    images: [productGen.image],
    badge: productGen.badge,
    rating: productGen.rating,
    reviews: productGen.reviews,
    sizes: availableSizes,
    colors: availableColors,
    features: ["Premium fabric", "Durable stitching", "Tailored urban fit", "Breathable material"],
    sizeGuide: {
      S: { chest: "36-38", length: "26", sleeve: "24" },
      M: { chest: "38-40", length: "27", sleeve: "25" },
      L: { chest: "40-42", length: "28", sleeve: "26" },
      XL: { chest: "42-44", length: "29", sleeve: "27" },
    },
  }

  const relatedProducts = all
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      badge: p.badge,
      reviews: p.reviews,
    }))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <Badge
                  variant={
                    product.badge === "New" ? "default" : product.badge === "Limited" ? "destructive" : "secondary"
                  }
                  className="absolute top-4 left-4"
                >
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="secondary" className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  -{discount}%
                </Badge>
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={() =>
                      setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1)
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={() =>
                      setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1)
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-sans font-bold text-2xl md:text-3xl mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-bold text-2xl">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Save {discount}%
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="font-medium">
                Color: {selectedColor && availableColors.find((c) => c.value === selectedColor)?.name}
              </Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => color.inStock && setSelectedColor(color.value)}
                    disabled={!color.inStock}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-primary scale-110"
                        : "border-border hover:border-primary/50"
                    } ${!color.inStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {!color.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 rotate-45"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="font-medium">Size: {selectedSize}</Label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sizeOption) => (
                  <Button
                    key={sizeOption.size}
                    variant={selectedSize === sizeOption.size ? "default" : "outline"}
                    size="sm"
                    onClick={() => sizeOption.inStock && setSelectedSize(sizeOption.size)}
                    disabled={!sizeOption.inStock}
                    className={`w-12 h-12 ${!sizeOption.inStock ? "opacity-50" : ""}`}
                  >
                    {sizeOption.size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Print Field */}
            <div className="space-y-3">
              <Label htmlFor="custom-print" className="font-medium">
                Custom Print (Optional)
              </Label>
              <Input
                id="custom-print"
                placeholder="Enter custom text for printing..."
                value={customPrint}
                onChange={(e) => setCustomPrint(e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">Max 50 characters. Additional charges may apply.</p>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="font-medium">Quantity</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ₹{product.price * quantity}
              </Button>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setIsWishlisted(!isWishlisted)} className="flex-1">
                  <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-sans font-semibold">Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{product.description}</p>
                    <div>
                      <h4 className="font-sans font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="size-guide" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-2 font-medium">Size</th>
                          {Object.keys(product.sizeGuide.S).map((measurement) => (
                            <th key={measurement} className="text-left p-2 font-medium capitalize">
                              {measurement} (inches)
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                          <tr key={size} className="border-b border-border/50">
                            <td className="p-2 font-medium">{size}</td>
                            {Object.values(measurements).map((value, index) => (
                              <td key={index} className="p-2 text-muted-foreground">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold">{product.rating}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Based on {product.reviews} reviews</p>
                      </div>
                      <Button variant="outline">Write a Review</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-sans font-bold text-2xl mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      <div className="sticky-cta md:hidden px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            className="flex-1 rounded-md gradient-cta px-4 py-3 font-semibold animate-pulse-soft"
            onClick={handleAddToCart}
          >
            Add to Cart • ₹{product.price * quantity}
          </button>
          <button
            className="rounded-md border border-border px-3 py-3 icon-tap"
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Wishlist"
          >
            ❤
          </button>
          <Link href="/contact" className="rounded-md border border-border px-3 py-3 icon-tap" aria-label="Chat">
            ?
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
