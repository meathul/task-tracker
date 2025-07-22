import { updateSession } from "@/utils/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  // Update the session
  await updateSession(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define routes
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                    request.nextUrl.pathname.startsWith('/register') ||
                    request.nextUrl.pathname.startsWith('/forgot-password');
                    
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/tasks') ||
                          request.nextUrl.pathname === '/';

  // Redirect to login if accessing protected route without session
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If logged in and trying to access auth pages, redirect to tasks
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  // Redirect root to tasks or login based on auth status
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(session ? '/tasks' : '/login', request.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
