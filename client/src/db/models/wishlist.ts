import { ObjectId } from "mongodb";
import { Wishlist } from "./../../types/types";
import { getCollection } from "./../config/index";
class WishlistModel {
  //* ─── Get Collection ──────────────────────────────────────────────────
  static getCollection() {
    return getCollection("wishlists");
  }

  //* ─── Add Wishlist ────────────────────────────────────────────────────
  static async addWishlist(productId: string, userId: string) {
    const wishlist = await this.getCollection().insertOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return wishlist;
  }

  //* ─── Delete Wishlist ────────────────────────────────────────────────-
  static async deleteWishlist(productId: string, userId: string) {
    return await this.getCollection().deleteOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });
  }

  //* ─── Get Wishlist ────────────────────────────────────────────────────
  static async getWishlist(productId: string, userId: string) {
    const itemFound = await this.getCollection().findOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });
    // console.log("🚀 ~ WishlistModel ~ itemFound ~ itemFound:", itemFound);
    return itemFound;
  }

  //* ─── Get all Wishlists ────────────────────────────────────────────────
  static async getAllWishlists(userId: string) {
    const wishlists = await this.getCollection()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: {
            path: "$productDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    console.log("🚀 ~ WishlistModel ~ getAllWishlists ~ wishlists:", wishlists);

    return wishlists;
  }
}

export default WishlistModel;
