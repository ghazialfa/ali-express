import WishlistModel from "@/db/models/wishlist";
import { NextRequest } from "next/server";
import { z } from "zod";

const wishlistSchema = z.object({
  userId: z.string({ required_error: "User ID is required" }),
  productId: z.string({ required_error: "Product ID is required" }),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const userId = request.headers.get("x-user-id");

    const data = wishlistSchema.parse({ userId, productId });

    const itemExist = await WishlistModel.getWishlist(
      data.productId,
      data.userId
    );

    if (itemExist) {
      return Response.json(
        { message: "Wishlist item already exists" },
        { status: 400 }
      );
    }

    await WishlistModel.addWishlist(data.productId, data.userId);

    return Response.json(
      { message: "Wishlist item added successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors[0].message }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    // console.log("🚀 ~ productId:", productId);
    const userId = request.headers.get("x-user-id");

    const data = wishlistSchema.parse({ userId, productId });

    const itemExist = await WishlistModel.getWishlist(
      data.productId,
      data.userId
    );

    if (!itemExist) {
      return Response.json(
        { message: "Wishlist item does not exist" },
        { status: 400 }
      );
    }

    await WishlistModel.deleteWishlist(data.productId, data.userId);

    return Response.json(
      { message: "Wishlist item deleted successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors[0].message }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
