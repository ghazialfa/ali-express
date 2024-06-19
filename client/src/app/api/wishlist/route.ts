import WishlistModel from "@/db/models/wishlist";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");
  const wishlists = await WishlistModel.getAllWishlists(userId as string);

  return Response.json(wishlists);
}
