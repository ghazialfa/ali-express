import { getProductBySlug } from "@/actions/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { Product } from "@/types/types";
import { Metadata, ResolvingMetadata } from "next";
import img from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  // console.log("🚀 ~ product:", product);
  return {
    title: product.name,
    // thumbnail: product.thumbnail,
    description: product.description,
    openGraph: {},
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = (await getProductBySlug(params.slug)) as Product;
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt="Product image"
            width={600}
            height={600}
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          />
        )}
        <div className="grid grid-cols-4 gap-4">
          {product.images &&
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index}`}
                width={150}
                height={150}
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              />
            ))}
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div>
            <p>{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {formatCurrency(product.price)}
            </div>
          </div>
          <div className="flex gap-2">
            {product.tags &&
              product.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-green-600 bg-white dark:bg-gray-950">
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="grid gap-4 text-sm leading-loose">
            <p>{product.excerpt}</p>
          </div>
          <div className="mt-4">
            <Button size="lg">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
