import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { routes } from "@/config/routes";

const protectedRoutes = [routes.dashboard, routes.products];

export const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;
  const sessionCookie = getSessionCookie(request);

  const response = NextResponse.next();
  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }

  return response;
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
