// middleware.ts
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProfileRoute = req.nextUrl.pathname.startsWith('/profile');

  if (isProfileRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }
})

// Optionally, don't invoke Middleware on some paths to save execution time
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
