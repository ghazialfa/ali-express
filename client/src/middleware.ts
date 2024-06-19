import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PayloadJose, verifyToken } from "./lib/jwt";

export default async function middleware(request: NextRequest) {
  const authentication = cookies().get("Authorization");

  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    if (!authentication) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const [type, token] = authentication.value.split(" ");
    if (type !== "Bearer" || !token) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    try {
      const decoded = await PayloadJose<{ _id: string; username: string }>(
        token
      );
      const requestHeaders = new Headers(request.headers);

      requestHeaders.set("x-user-id", decoded._id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!authentication) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlist/:path*", "/wishlist"],
};
