import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth");

  // Always allow access to auth API routes
  if (isApiAuth) return NextResponse.next();

  // Redirect logged-in users away from login page
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect unauthenticated users to login (except for login page itself)
  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static files and images
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
