"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSizes: string[]
  setSelectedSizes: (sizes: string[]) => void
  showOnlyNew: boolean
  setShowOnlyNew: (show: boolean) => void
  showOnlyBestseller: boolean
  setShowOnlyBestseller: (show: boolean) => void
  showOnlyLimited: boolean
  setShowOnlyLimited: (show: boolean) => void
  clearFilters: () => void
  activeFiltersCount: number
}

const categories = [
  { id: "all", name: "All Products" },
  { id: "hoodies", name: "Hoodies" },
  { id: "tshirts", name: "T-Shirts" },
  { id: "bottoms", name: "Bottoms" },
  { id: "jackets", name: "Jackets" },
]

const colors = [
  { id: "all", name: "All Colors" },
  { id: "black", name: "Black" },
  { id: "blue", name: "Blue" },
  { id: "pink", name: "Pink" },
  { id: "gray", name: "Gray" },
]

const sizes = ["S", "M", "L", "XL", "XXL"]

export default function Filters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedSizes,
  setSelectedSizes,
  showOnlyNew,
  setShowOnlyNew,
  showOnlyBestseller,
  setShowOnlyBestseller,
  showOnlyLimited,
  setShowOnlyLimited,
  clearFilters,
  activeFiltersCount,
}: FiltersProps) {
  return (
    <div className="space-y-6">
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
                  setSelectedSizes(
                    selectedSizes.includes(size) ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size],
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
  )
}
