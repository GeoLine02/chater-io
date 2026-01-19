import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authRoutes = ["/login", "/register"];
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Not authenticated → redirect to login
  if (!refreshToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated → trying to access login/register → redirect to /
  if (accessToken && refreshToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// 🔹 Include auth routes in matcher so middleware runs there
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
