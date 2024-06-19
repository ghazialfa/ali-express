import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/db/models/product";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("search") || "";

  const products = await ProductModel.getProductByName(name);

  if (products.length === 0) {
    return NextResponse.json({ error: "Products not found" }, { status: 404 });
  }
  return NextResponse.json(products);
}
