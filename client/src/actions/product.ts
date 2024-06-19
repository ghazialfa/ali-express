import { Product } from "./../types/types";

export async function getProducts(page: number): Promise<Product[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products?page=" + page,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  // console.log("🚀 ~ getProducts ~ data:", data.data.products[0]);
  return data.data.products;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`
  );
  const data = await response.json();
  // console.log("🚀 ~ getProductBySlug ~ data:", data);
  return data;
}
