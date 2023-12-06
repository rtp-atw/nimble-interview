import { NextResponse } from "next/server";

import { COOKIE_KEY } from "@/hooks";

import type { NextRequest } from "next/server";

const unprotectPages = ["/users/sign-in", "/users/sign-up"];

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  let jwt = request.cookies.get(COOKIE_KEY);

  if (unprotectPages.includes(request.nextUrl.pathname)) {
    if (jwt) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  if (!jwt) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/users/:path*"],
};
