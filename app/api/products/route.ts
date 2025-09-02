import { NextResponse } from "next/server"
import { getProducts, getFeaturedProducts, searchProducts } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")
  const search = searchParams.get("search")

  try {
    let products

    if (featured === "true") {
      products = await getFeaturedProducts()
    } else if (search) {
      products = await searchProducts(search)
    } else {
      products = await getProducts()
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
