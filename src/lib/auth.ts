import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_local_secret_please_change_in_production_12345"
)

export type AdminRole = "super_admin" | "admin" | "editor" | "viewer"

export interface JWTPayload {
  sub: string
  email: string
  name: string
  role: AdminRole
  iat?: number
  exp?: number
}

// 1. Create a session
export async function createSession(payload: Omit<JWTPayload, "iat" | "exp">) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

// 2. Verify and return the session
export async function verifySession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

// 3. Clear session
export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

// 4. Client/UI helper to check role hierarchy
export function hasRole(userRole: AdminRole, requiredRoles: AdminRole[]) {
  if (userRole === "super_admin") return true // Super admin can do everything
  return requiredRoles.includes(userRole)
}
