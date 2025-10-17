"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/components/cart-provider" // wire quick add
import { useToast } from "@/hooks/use-toast" // feedback toast

interface ProductCardProps {
  id: string | number // allow number ids too
  name: string
  price: number
  originalPrice?: number
  image?: string
  img?: string // accept alias from different data shapes
  badge?: "New" | "Limited" | "Bestseller"
  rating?: number
  reviews?: number
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  img,
  badge,
  rating = 4.5,
  reviews = 0,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart() // wire quick add
  const { toast } = useToast() // feedback toast
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const displayImage = image || img || "/urban-streetwear-product.jpg" // hard-coded placeholder query

  const handleQuickAdd = () => {
    addItem({
      id,
      title: String(name),
      price: Number(price),
      image: displayImage,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${name} added to your cart`,
    })
  }

  return (
    <Card
      className={`group relative overflow-hidden border-border/50 bg-card hover-scale hover:border-primary/50 transition-all duration-300 ${badge ? "featured-glow" : ""}`}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Subtle tap overlay with light purple tint */}
          <div className="absolute inset-0 bg-[color:var(--accent-light-purple)]/15 opacity-0 group-active:opacity-100 transition-opacity" />
          <Link href={`/product/${id}`} aria-label={`View ${name}`}>
            <Image
              src={displayImage || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {badge && (
              <Badge
                variant={badge === "New" ? "default" : badge === "Limited" ? "destructive" : "secondary"}
                className="text-xs font-semibold badge-pulse"
              >
                {badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs font-semibold">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>

          {/* Quick Add Button - Shows on Hover */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow"
              size="sm"
              onClick={handleQuickAdd} // wire quick add
              aria-label={`Quick add ${name} to cart`}
            >
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <Link href={`/product/${id}`} className="block">
            <h3 className="font-medium text-sm md:text-base line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          {reviews > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-base md:text-lg">₹{price}</span>
            {originalPrice && <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
