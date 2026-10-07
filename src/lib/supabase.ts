import { createClient } from '@supabase/supabase-js'

// Ensure Node.js server resolves Supabase domains using reliable public DNS (8.8.8.8, 1.1.1.1)
// to prevent local ISP/router DNS resolution failures (ENOTFOUND) on developer machines.
if (typeof window === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dns = require('node:dns')
    const originalLookup = dns.lookup
    const resolver = new dns.Resolver()
    resolver.setServers(['8.8.8.8', '1.1.1.1'])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dns.lookup = function (hostname: string, options: any, callback: any) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }
      if (typeof hostname === 'string' && hostname.includes('supabase.co')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver.resolve4(hostname, (err: any, addrs: string[]) => {
          if (err || !addrs || addrs.length === 0) {
            return originalLookup(hostname, options, callback)
          }
          if (options && options.all) {
            callback(null, addrs.map((a: string) => ({ address: a, family: 4 })))
          } else {
            callback(null, addrs[0], 4)
          }
        })
        return
      }
      return originalLookup(hostname, options, callback)
    }
  } catch {
    // Ignore in non-Node runtimes
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// We handle empty strings gracefully to allow local dev without blowing up the build,
// but the client will throw when executing queries if env vars are missing.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
