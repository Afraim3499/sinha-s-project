import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_local_secret_please_change_in_production_12345"
)

// Add the roles you want to restrict mapped by route paths.
// If a user doesn't have the required role, we redirect them back to their primary hub.
const ROLE_RESTRICTIONS: Record<string, string[]> = {
  '/admin/team': ['super_admin'],
  '/admin/settings': ['super_admin', 'admin'],
  '/admin/blogs': ['super_admin', 'admin', 'editor'],
  '/admin/leads': ['super_admin', 'admin', 'viewer'],
  '/admin/subscribers': ['super_admin', 'admin', 'viewer'],
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Only run logic on /admin paths
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // 2. The login page is always accessible if not logged in
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // 3. Verify session
  const token = request.cookies.get('admin_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    const userRole = payload.role as string

    // 4. Implement Role-Based Access Control (RBAC) guard
    for (const [route, allowedRoles] of Object.entries(ROLE_RESTRICTIONS)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          // Send an unauthorized editor back to the main dashboard
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }
    }

    // Pass role through headers so server components can adapt UI
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-admin-role', userRole)
    requestHeaders.set('x-admin-email', payload.email as string)
    requestHeaders.set('x-admin-name', payload.name as string)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch {
    // Token is invalid/expired
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// Config to run this middleware only on admin routes to prevent slowing down the main public site
export const config = {
  matcher: ['/admin/:path*'],
}
