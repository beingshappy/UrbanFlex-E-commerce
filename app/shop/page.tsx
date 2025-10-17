"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample product data - expanded for shop page
const allProducts = [
  {
    id: "1",
    name: "Neon Strike Hoodie",
    price: 2999,
    originalPrice: 3999,
    image: "/neon-blue-streetwear-hoodie.jpg",
    badge: "New" as const,
    reviews: 24,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: "blue",
  },
  {
    id: "2",
    name: "Urban Flex Joggers",
    price: 1999,
    originalPrice: 2499,
    image: "/black-streetwear-joggers.jpg",
    badge: "Bestseller" as const,
    reviews: 156,
    category: "bottoms",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "black",
  },
  {
    id: "3",
    name: "Street Glow Tee",
    price: 1299,
    image: "/pink-neon-streetwear-tshirt.jpg",
    badge: "Limited" as const,
    reviews: 89,
    category: "tshirts",
    size: ["S", "M", "L", "XL"],
    color: "pink",
  },
  {
    id: "4",
    name: "Flex Zone Jacket",
    price: 4999,
    originalPrice: 5999,
    image: "/black-streetwear-jacket-neon-accents.jpg",
    reviews: 67,
    category: "jackets",
    size: ["M", "L", "XL"],
    color: "black",
  },
  {
    id: "5",
    name: "Cyber Punk Hoodie",
    price: 3499,
    image: "/placeholder.svg?key=cyber",
    badge: "New" as const,
    reviews: 12,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: "black",
  },
  {
    id: "6",
    name: "Neon Dreams Tee",
    price: 1499,
    originalPrice: 1999,
    image: "/placeholder.svg?key=dreams",
    badge: "Limited" as const,
    reviews: 45,
    category: "tshirts",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "blue",
  },
  {
    id: "7",
    name: "Street Runner Joggers",
    price: 2299,
    image: "/placeholder.svg?key=runner",
    badge: "Bestseller" as const,
    reviews: 203,
    category: "bottoms",
    size: ["S", "M", "L", "XL"],
    color: "gray",
  },
  {
    id: "8",
    name: "Urban Legend Jacket",
    price: 5499,
    originalPrice: 6999,
    image: "/placeholder.svg?key=legend",
    badge: "Limited" as const,
    reviews: 34,
    category: "jackets",
    size: ["M", "L", "XL", "XXL"],
    color: "black",
  },
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "Hoodies & Sweatshirts", name: "Hoodies & Sweatshirts" },
  { id: "T-Shirts & Tops", name: "T-Shirts & Tops" },
  { id: "Pants & Joggers", name: "Pants & Joggers" },
  { id: "Accessories", name: "Accessories" },
]

const colors = [
  { id: "all", name: "All Colors" },
  { id: "black", name: "Black" },
  { id: "blue", name: "Blue" },
  { id: "pink", name: "Pink" },
  { id: "gray", name: "Gray" },
]

const sizes = ["S", "M", "L", "XL", "XXL"]

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "newest", name: "Newest First" },
  { id: "reviews", name: "Most Reviewed" },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedColor, setSelectedColor] = useState("all")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyBestseller, setShowOnlyBestseller] = useState(false)
  const [showOnlyLimited, setShowOnlyLimited] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 24

  const selectedBadge = useMemo(() => {
    const toggles = [
      showOnlyNew ? "New" : null,
      showOnlyBestseller ? "Bestseller" : null,
      showOnlyLimited ? "Limited" : null,
    ].filter(Boolean) as Array<"New" | "Bestseller" | "Limited">
    return toggles.length === 1 ? toggles[0] : undefined
  }, [showOnlyNew, showOnlyBestseller, showOnlyLimited])

  const params = new URLSearchParams()
  if (searchQuery) params.set("q", searchQuery)
  if (selectedCategory !== "all") params.set("category", selectedCategory)
  if (selectedColor !== "all") params.set("color", selectedColor)
  if (selectedSizes[0]) params.set("size", selectedSizes[0]) // single size for API
  if (selectedBadge) params.set("badge", selectedBadge)
  if (sortBy !== "featured") params.set("sort", sortBy)
  params.set("page", String(page))
  params.set("limit", String(limit))
  const key = `/api/products?${params.toString()}`

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, isLoading } = useSWR<{ items: any[]; total: number; page: number; pageCount: number }>(key, fetcher)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedColor("all")
    setSelectedSizes([])
    setShowOnlyNew(false)
    setShowOnlyBestseller(false)
    setShowOnlyLimited(false)
    setSortBy("featured")
    setPage(1)
  }

  const products = data?.items ?? []
  const total = data?.total ?? 0
  const pageCount = data?.pageCount ?? 1

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedColor !== "all",
    selectedSizes.length > 0,
    showOnlyNew,
    showOnlyBestseller,
    showOnlyLimited,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="font-sans font-bold text-3xl md:text-4xl">Shop Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our complete streetwear collection. Express your unique style with UrbanFlex.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-semibold">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <h4 className="font-medium">Category</h4>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <h4 className="font-medium">Color</h4>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <h4 className="font-medium">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                        )
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div className="space-y-2">
                <h4 className="font-medium">Special</h4>
                <div className="space-y-2">
                  <Button
                    variant={showOnlyNew ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowOnlyNew(!showOnlyNew)}
                  >
                    New Arrivals
                  </Button>
                  <Button
                    variant={showOnlyBestseller ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowOnlyBestseller(!showOnlyBestseller)}
                  >
                    Bestsellers
                  </Button>
                  <Button
                    variant={showOnlyLimited ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowOnlyLimited(!showOnlyLimited)}
                  >
                    Limited Edition
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Mobile filter content - same as desktop */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Category</h4>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Color</h4>
                      <Select value={selectedColor} onValueChange={setSelectedColor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setSelectedSizes((prev) =>
                                prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                              )
                            }}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Special</h4>
                      <div className="space-y-2">
                        <Button
                          variant={showOnlyNew ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setShowOnlyNew(!showOnlyNew)}
                        >
                          New Arrivals
                        </Button>
                        <Button
                          variant={showOnlyBestseller ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setShowOnlyBestseller(!showOnlyBestseller)}
                        >
                          Bestsellers
                        </Button>
                        <Button
                          variant={showOnlyLimited ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setShowOnlyLimited(!showOnlyLimited)}
                        >
                          Limited Edition
                        </Button>
                      </div>
                    </div>

                    {activeFiltersCount > 0 && (
                      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Search & Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{total} products</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                  </Badge>
                )}
                {selectedColor !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {colors.find((c) => c.id === selectedColor)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedColor("all")} />
                  </Badge>
                )}
                {selectedSizes.map((size) => (
                  <Badge key={size} variant="secondary" className="flex items-center gap-1">
                    Size {size}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedSizes((prev) => prev.filter((s) => s !== size))}
                    />
                  </Badge>
                ))}
                {showOnlyNew && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    New Arrivals
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnlyNew(false)} />
                  </Badge>
                )}
                {showOnlyBestseller && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Bestsellers
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnlyBestseller(false)} />
                  </Badge>
                )}
                {showOnlyLimited && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Limited Edition
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnlyLimited(false)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className="h-64 bg-card border border-border rounded-lg animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-sans font-semibold text-lg mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm text-muted-foreground px-3 py-2">
                      Page {page} of {pageCount}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      className={page >= pageCount ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
