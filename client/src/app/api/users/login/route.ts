import UserModel from "@/db/models/user";
import { verifyPassword } from "@/lib/bcrypt";
import { createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const inputSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).nonempty(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = inputSchema.parse(body);

    const isUser = await UserModel.getUserByEmail(email);

    if (!isUser) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isValid = verifyPassword(password, isUser.password);

    if (!isValid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const access_token = createToken({
      _id: isUser._id,
      username: isUser.username,
    });

    cookies().set("Authorization", "Bearer " + access_token);

    return Response.json(
      { data: { access_token, userId: isUser._id } },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    } else {
      return Response.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
