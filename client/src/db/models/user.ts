import { hashPassword, verifyPassword } from "./../../lib/bcrypt";
import { User } from "@/types/types";
import { getCollection } from "../config/index";

class UserModel {
  //* ─── Get Collection ──────────────────────────────────────────────────
  static getCollection() {
    return getCollection("users");
  }

  //* ─── Get User By Email ───────────────────────────────────────────────
  static async getUserByEmail(email: string) {
    const users = await this.getCollection().findOne({ email });
    return users;
  }

  //* ─── User Register ───────────────────────────────────────────────────
  static async register(user: Omit<User, "_id">) {
    user.password = hashPassword(user.password);

    const users = await this.getCollection().insertOne(user);
    return users;
  }

  //* ─── User Login ──────────────────────────────────────────────────────
  static async login(email: string, password: string) {
    const users = await this.getCollection().findOne({ email });

    if (!users) {
      throw new Error("Invalid email or password");
    }

    const isMatch = verifyPassword(password, users.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return users;
  }
}

export default UserModel;
