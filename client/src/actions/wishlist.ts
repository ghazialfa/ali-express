import { Wishlist } from "@/types/types";

export async function getWishlist(): Promise<Wishlist[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
}

export async function addWishlist(id: string): Promise<Wishlist> {
  // console.log("🚀 ~ addWishlist ~ id:", id);
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("🚀 ~ addWishlist ~ response:", response);

  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }

  return response.json();
}

export async function removeWishlist(id: string): Promise<void> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("🚀 ~ removeWishlist ~ error:", error);
    throw error;
  }
}
