import ProductModel from "@/db/models/product";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  if (!slug) {
    return Response.json(
      { error: "Slug parameter is required" },
      { status: 400 }
    );
  }

  const product = await ProductModel.getProductBySlug(slug);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
