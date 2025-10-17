import { NextResponse } from "next/server"
import { filterProducts, generateProducts } from "@/lib/products"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get("q") ?? undefined
  const category = url.searchParams.get("category") ?? undefined
  const color = url.searchParams.get("color") ?? undefined
  const size = url.searchParams.get("size") ?? undefined
  const sort = (url.searchParams.get("sort") as any) ?? undefined
  const page = Number.parseInt(url.searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(url.searchParams.get("limit") || "24", 10)
  const badgeParam = url.searchParams.get("badge")
  const badge = badgeParam === "New" || badgeParam === "Bestseller" || badgeParam === "Limited" ? badgeParam : undefined

  const all = generateProducts(240)
  const data = filterProducts({ q, category, color, size, sort, page, limit, badge }, all)
  return NextResponse.json(data)
}
