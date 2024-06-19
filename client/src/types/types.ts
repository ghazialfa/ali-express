import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string | undefined;
  username: string;
  email: string;
  password: string;
};

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  products: ObjectId;
  productDetails: Product;
  createdAt: Date;
  updatedAt: Date;
};
