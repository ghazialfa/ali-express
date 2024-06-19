import { Product } from "@/types/types";
import { getCollection } from "../config/index";

class ProductModel {
  //* ─── Get Collection ─────────────────────────────────────────────────
  static getCollection() {
    return getCollection("products");
  }

  //* ─── Get All Product ─────────────────────────────────────────────────
  static async getAllProducts(page: string): Promise<Product[]> {
    const products = (await this.getCollection()
      .find()
      .skip((+page - 1) * 10)
      .limit(10)
      .toArray()) as Product[];

    return products;
  }

  //* ─── Get Product By Slug ---------------------------------------------
  static async getProductBySlug(slug: string): Promise<Product> {
    const product = (await this.getCollection().findOne({ slug })) as Product;

    return product;
  }

  //* ─── Get Product By Name ---------------------------------------------
  static async getProductByName(name: string): Promise<Product[]> {
    const products = (await this.getCollection()
      .find({ name: { $regex: name, $options: "i" } })
      .sort({ name: 1 })
      .toArray()) as Product[];

    return products;
  }
}

export default ProductModel;
