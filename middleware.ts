import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a simplified version for demo purposes
  // In a real app, you would verify a JWT token or session cookie

  const authCookie = request.cookies.get("auth-storage")
  const isAuthenticated = authCookie && authCookie.value.includes('"isAuthenticated":true')

  // Check if the request is for the dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
