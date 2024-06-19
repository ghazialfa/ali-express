import UserModel from "@/db/models/user";
import { NextRequest } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  username: z.string({ required_error: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = userSchema.parse(body);

    const userRegistered = await UserModel.getUserByEmail(parsedData.email);

    if (userRegistered) {
      return Response.json(
        { message: "This account already registered" },
        { status: 400 }
      );
    }

    const { name, username, email, password } = parsedData;
    await UserModel.register({ name, username, email, password });

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
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
