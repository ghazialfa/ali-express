import ProductModel from "@/db/models/product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const products = await ProductModel.getAllProducts(page);
  // console.log("🚀 ~ GET ~ products:", products);

  return Response.json(
    { page: +page, amount: products.length, data: { products } },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
