export type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: "New" | "Bestseller" | "Limited"
  reviews: number
  rating: number
  category: string
  color: string
  sizes: string[]
  description: string
}

const categoryPool = [
  { name: "Hoodies & Sweatshirts", image: "/modern-hoodie-collection-display.jpg" },
  { name: "T-Shirts & Tops", image: "/streetwear-t-shirt-collection.jpg" },
  { name: "Pants & Joggers", image: "/modern-joggers-and-pants-collection.jpg" },
  { name: "Accessories", image: "/streetwear-accessories-collection.jpg" },
] as const

const imagePool = [
  "/modern-navy-hoodie-with-orange-accents.jpg",
  "/premium-black-joggers-streetwear.jpg",
  "/orange-streetwear-t-shirt-modern-design.jpg",
  "/navy-tech-jacket-with-orange-details.jpg",
  "/modern-cargo-pants-streetwear-style.jpg",
  "/modern-sneakers-navy-and-orange-colorway.jpg",
  "/black-streetwear-jacket-neon-accents.jpg",
  "/pink-neon-streetwear-tshirt.jpg",
  "/neon-blue-streetwear-hoodie.jpg",
]

const colorPool = ["Black", "Navy", "White", "Gray", "Orange", "Pink", "Blue"]
const sizePool = ["XS", "S", "M", "L", "XL", "XXL"]
const badgePool: Array<Product["badge"]> = [undefined, "New", "Bestseller", "Limited"]

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function roundTo99(n: number) {
  return Math.max(499, Math.round(n / 100) * 100 + 99)
}

export function generateProducts(count = 240): Product[] {
  const rng = mulberry32(1337)
  const items: Product[] = []
  for (let i = 1; i <= count; i++) {
    const cat = categoryPool[i % categoryPool.length]
    const img = imagePool[i % imagePool.length]
    const priceBase = 999 + Math.floor(rng() * 5000)
    const original = rng() > 0.6 ? priceBase + Math.floor(rng() * 1200) : undefined
    const rating = 3.8 + rng() * 1.2
    const reviews = 20 + Math.floor(rng() * 1000)
    const color = colorPool[i % colorPool.length]
    const sizes = sizePool.slice(0, 3 + (i % 3))
    const badge = badgePool[i % badgePool.length]

    items.push({
      id: String(i),
      name: `UrbanFlex ${cat.name.split(" ")[0]} ${i.toString().padStart(3, "0")}`,
      price: roundTo99(priceBase),
      originalPrice: original ? roundTo99(original) : undefined,
      image: img,
      badge,
      reviews,
      rating: Math.min(5, Math.round(rating * 10) / 10),
      category: cat.name,
      color,
      sizes,
      description:
        "Premium UrbanFlex streetwear engineered for comfort and style. Breathable fabric, durable stitching, and a tailored urban fit.",
    })
  }
  return items
}

export type ProductQuery = {
  q?: string
  category?: string
  color?: string
  size?: string
  sort?: "price-asc" | "price-desc" | "rating" | "reviews" | "newest"
  page?: number
  limit?: number
  badge?: "New" | "Bestseller" | "Limited"
}

export function filterProducts(query: ProductQuery, all: Product[]) {
  let filtered = [...all]
  const { q, category, color, size, sort, page = 1, limit = 24, badge } = query

  if (q) {
    const t = q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t) || p.color.toLowerCase().includes(t),
    )
  }
  if (category) filtered = filtered.filter((p) => p.category === category)
  if (color) filtered = filtered.filter((p) => p.color.toLowerCase() === color.toLowerCase())
  if (size) filtered = filtered.filter((p) => p.sizes.includes(size))
  if (badge) filtered = filtered.filter((p) => p.badge === badge)

  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case "reviews":
      filtered.sort((a, b) => b.reviews - a.reviews)
      break
    case "newest":
      filtered.sort((a, b) => Number(b.id) - Number(a.id))
      break
  }

  const total = filtered.length
  const start = (page - 1) * limit
  const end = start + limit
  const items = filtered.slice(start, end)

  return { items, total, page, pageCount: Math.max(1, Math.ceil(total / limit)) }
}

export function getProductById(id: string, all?: Product[]) {
  const list = all ?? generateProducts()
  return list.find((p) => p.id === id) ?? null
}
