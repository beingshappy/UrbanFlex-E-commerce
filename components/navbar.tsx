"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image" // use image for logo wordmark
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, ShoppingCart, User, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider" // show cart count badge

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { count } = useCart() // cart item count

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "New Drops", href: "/new" },
    { name: "About", href: "/about" },
    { name: "Street Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
  <span className="text-2xl font-bold text-gray-900 tracking-wide">
    Urban<span className="text-blue-600">Flex</span>
  </span>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/shop" className="hidden sm:flex" aria-label="Search catalogue">
              <Button variant="ghost" size="icon" className="icon-tap">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile#wishlist" aria-label="Wishlist">
              <Button variant="ghost" size="icon" className="icon-tap">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative">
              <Button variant="ghost" size="icon" className="icon-tap">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {count > 0 && (
                <span
                  className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center"
                  aria-live="polite"
                >
                  {count}
                </span>
              )}
            </Link>
            <Link href="/profile" aria-label="Account">
              <Button variant="ghost" size="icon" className="icon-tap">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
