import { NextRequest } from 'next/server'

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  max: number // Max requests per window
  message?: string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, max, message = 'Too many requests, please try again later.' } = options

  return (request: NextRequest) => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const key = `${ip}:${request.nextUrl.pathname}`
    const now = Date.now()

    if (!store[key] || now > store[key].resetTime) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      }
      return null // Allow
    }

    if (store[key].count >= max) {
      return new Response(message, {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((store[key].resetTime - now) / 1000).toString(),
          'Content-Type': 'text/plain'
        }
      })
    }

    store[key].count++
    return null // Allow
  }
}

// Clean up expired entries periodically (simple implementation)
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
}, 60000) // Clean every minute