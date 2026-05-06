import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/reset-password"];

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.endsWith(route)
  );

  const token = req.cookies.get("access_token")?.value;

  if (!isPublic && !token) {
    const signIn = new URL("/sign-in", req.url);
    return NextResponse.redirect(signIn);
  }

  if (isPublic && token) {
    const locale = pathname.split("/")[1] || "es";
    const selector = new URL(`/${locale}/selector`, req.url);
    return NextResponse.redirect(selector);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
