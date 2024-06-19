import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { Product } from "@/types/types";
import Image from "next/image";
import CartButton from "./buttons/cart-button";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto h-[500px]">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <img
            src={product.thumbnail}
            alt="Product Image"
            width={500}
            height={400}
            className="w-full h-64 object-cover"
          />
        </div>
      </Link>
      <div className="p-6" style={{ maxHeight: "calc(100% - 4rem)" }}>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{product.excerpt}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-l font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <CartButton id={product._id.toString()} />
        </div>
      </div>
    </div>
  );
}
