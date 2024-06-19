"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { getWishlist, removeWishlist } from "@/actions/wishlist";
import { Wishlist } from "@/types/types";
import { formatCurrency } from "@/lib/currency";

export default function Component() {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeWishlist(id);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id.toString() !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item removed from wishlist",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to remove from wishlist";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  const totalPrice = wishlist.reduce(
    (acc, item) => acc + item.productDetails.price,
    0
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                <img
                  src={item.productDetails.thumbnail}
                  alt={item.productDetails.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{item.productDetails.name}</h3>
                  <p className="text-gray-500">
                    {formatCurrency(item.productDetails.price)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(item._id.toString())}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Wishlist Anda masih kosong.</p>
        )}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span className="text-gray-500">
              Rp {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
