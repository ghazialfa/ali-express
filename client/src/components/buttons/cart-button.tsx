"use client";
import { addWishlist } from "@/actions/wishlist";
import { Button } from "../ui/button";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CartButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async (id: string) => {
    setLoading(true);

    try {
      const response = await addWishlist(id);
      Swal.fire("Success", "Item has been added to wishlist!", "success");
      console.log("Wishlist added successfully:", response);
    } catch (err: any) {
      console.error("Failed to add to wishlist:", err);
      const errorMessage = err.message || "Failed to add to wishlist";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleAddToWishlist(id)}
        size="sm"
        disabled={loading}>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <ShoppingCartIcon className="w-5 h-5 mr-1" />
          </>
        )}
      </Button>
    </>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
