import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/first-login",
  "/first-login/set-password",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const refreshToken = request.cookies.get("refresh_token")?.value;

  // 0) Root: always redirect somewhere
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(refreshToken ? "/dashboard" : "/login", request.url),
    );
  }

  // 1) Public routes (login/register/forgot/reset)
  if (isPublicRoute(pathname)) {
    // If logged in and trying to access /login, redirect to dashboard
    if (refreshToken && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Otherwise allow access to public pages
    return NextResponse.next();
  }

  // 2) Protected routes: require refresh token
  if (!refreshToken) {
    // Safety: if already heading to login, don't redirect again
    // (prevents any accidental loop if config changes later)
    if (pathname === "/login") return NextResponse.next();

    const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
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
    "/first-login/:path*",
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
