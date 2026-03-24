import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-email/set-password",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refresh_token")?.value;
  const scope = request.cookies.get("auth_scope")?.value;

  const isLoggedIn = Boolean(refreshToken);
  const isAdmin = scope === "admin";

  // 0) Root: always redirect somewhere
  if (pathname === "/") {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.redirect(
      new URL(isAdmin ? "/admin/dashboard" : "/dashboard", request.url),
    );
  }

  // 1) Public routes (login/register/forgot/reset)
  if (isPublicRoute(pathname)) {
    // If logged in and trying to access /login, redirect by scope
    if (isLoggedIn && pathname === "/login") {
      return NextResponse.redirect(
        new URL(isAdmin ? "/admin/dashboard" : "/dashboard", request.url),
      );
    }
    return NextResponse.next();
  }

  // 2) Protected routes: require refresh token
  // if (!refreshToken) {
  //   // Safety: if already heading to login, don't redirect again
  //   // (prevents any accidental loop if config changes later)
  //   if (pathname === "/login") return NextResponse.next();

  //   const loginUrl = new URL("/login", request.url);
  //   // loginUrl.searchParams.set("next", pathname + search);
  //   return NextResponse.redirect(loginUrl);
  // }

  // 2) Protected routes require login
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3) Admin area protection
  if (pathname.startsWith("/admin")) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 4) Optional: prevent admin from entering learner area
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

/**
 * matcher option allows you to target specific paths for the Middleware to run on.
 * For multiple paths: Use an array: Ex:  matcher: ['/about/:path*', '/dashboard/:path*'],
 * Below matcher shows that any URL or route which not stated below will run the Authentication check => Protected route
 */
export const config = {
  matcher: [
    "/", // root redirect
    "/login", // allow/redirect logic
    "/verify-email/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/dashboard/:path*", // protected
    "/reports/:path*", // protected
    "/programs/:path*",
    "/onboarding",
    "/onboarding/:path*",
    "/profile",
  ],
};
// export const config = {
//   matcher: ["/dashboard/:path*", "/reports/:path*"],
// };
// export const config = {
//   matcher: [
//     `/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login).*)`,
//   ],
// };
