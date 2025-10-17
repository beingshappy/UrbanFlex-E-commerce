"use client"
import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: string | number
  title: string
  price: number
  image?: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (id: CartItem["id"]) => void
  changeQty: (id: CartItem["id"], quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "urbanflex_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], quantity: copy[i].quantity + item.quantity }
        return copy
      }
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: CartItem["id"]) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const changeQty = useCallback((id: CartItem["id"], quantity: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])
  const count = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, subtotal, count, addItem, removeItem, changeQty, clear }),
    [items, subtotal, count, addItem, removeItem, changeQty, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
