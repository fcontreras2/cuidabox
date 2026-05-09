import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const PUBLIC_ROUTES = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/reset-password",
];

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.endsWith(route),
  );

  const token = req.cookies.get("access_token")?.value;

  if (!isPublic && !token) {
    const signIn = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(signIn);
  }

  if (isPublic && token) {
    const home = new URL("/", req.url);
    return NextResponse.redirect(home);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
