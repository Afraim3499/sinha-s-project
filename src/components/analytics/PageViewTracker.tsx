"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/app/actions/analytics"

export function PageViewTracker() {
  const pathname = usePathname()
  // Use a ref to prevent double-firing in React 18 strict mode
  const currentPathTracker = useRef<string>("")

  useEffect(() => {
    // Only track if we haven't tracked this exact load cycle
    // and if we're not inside the admin panel
    if (pathname !== currentPathTracker.current && !pathname.startsWith('/admin')) {
      currentPathTracker.current = pathname
      
      const referrer = document.referrer || "direct"

      // Fire and forget server action
      // Wrapped in setTimeout to make it non-blocking
      setTimeout(() => {
        trackPageView(pathname, referrer).catch(() => {})
      }, 500)
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}
