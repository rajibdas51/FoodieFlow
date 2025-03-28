import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = { role: 'ADMIN' };
  const path = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/menu',
    '/about',
    '/contact',
  ];

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some(
    (publicPath) =>
      publicPath === path || (publicPath !== '/' && path.startsWith(publicPath))
  );

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the path starts with dashboard
  const isDashboardRoute = path.startsWith('/dashboard');

  // If trying to access a dashboard route without authentication
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated, check role-based access
  if (isDashboardRoute && token) {
    const userRole = token.role; // Assuming role is stored in the token

    // Admin-specific routes
    const adminRoutes = path.startsWith('/dashboard/admin');
    // User-specific routes
    const userRoutes = path.startsWith('/dashboard/user');

    if (adminRoutes && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }

    if (userRoutes && userRole !== 'USER') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Matching routes for middleware
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/menu',
    '/about',
    '/contact',
    '/dashboard/:path*',
  ],
};
