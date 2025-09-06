import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'super_admin';
  iat: number;
  exp: number;
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clear rate limit store (useful for development)
function clearRateLimitStore() {
  rateLimitStore.clear();
}

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // Max requests per window
  loginMaxRequests: process.env.NODE_ENV === 'development' ? 50 : 10, // More lenient in development
  apiMaxRequests: 200, // Max API requests per window
};

// Security headers for all responses
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  
  // Add HSTS header for HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  return response;
}

// Rate limiting function
function checkRateLimit(ip: string, endpoint: string): boolean {
  const now = Date.now();
  const key = `${ip}:${endpoint}`;
  const windowMs = RATE_LIMIT.windowMs;
  
  // Clean up expired entries
  for (const [k, v] of rateLimitStore.entries()) {
    if (now > v.resetTime) {
      rateLimitStore.delete(k);
    }
  }
  
  const current = rateLimitStore.get(key);
  
  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  // Determine max requests based on endpoint
  let maxRequests = RATE_LIMIT.maxRequests;
  if (endpoint.includes('login')) {
    maxRequests = RATE_LIMIT.loginMaxRequests;
  } else if (endpoint.includes('api')) {
    maxRequests = RATE_LIMIT.apiMaxRequests;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// CSRF token validation
function validateCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get('csrf-token')?.value;
  
  if (!csrfToken || !cookieToken) {
    return false;
  }
  
  return csrfToken === cookieToken;
}

// Enhanced JWT validation
function validateJWT(token: string): JWTPayload | null {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    
    // Additional security checks
    if (!decoded.userId || !decoded.email || !decoded.role) {
      return null;
    }
    
    // Check if token is not expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  // Add security headers to all responses
  const response = NextResponse.next();
  addSecurityHeaders(response);
  
  // Development-only: Clear rate limits endpoint
  if (process.env.NODE_ENV === 'development' && pathname === '/api/clear-rate-limit') {
    clearRateLimitStore();
    return new NextResponse(JSON.stringify({ success: true, message: 'Rate limits cleared' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Rate limiting for all requests
  if (!checkRateLimit(ip, pathname)) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '900', // 15 minutes
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT.windowMs).toISOString(),
      }
    });
  }
  
  // CSRF protection for state-changing operations
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    // Skip CSRF validation for auth endpoints
    const skipCSRF = [
      '/api/auth/login',
      '/api/auth/verify',
      '/api/auth/refresh',
      '/api/auth/logout'
    ];
    
    if (pathname.startsWith('/api/') && !skipCSRF.includes(pathname)) {
      if (!validateCSRFToken(request)) {
        return new NextResponse('CSRF token validation failed', { status: 403 });
      }
    }
  }
  
  // Admin route protection
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const decoded = validateJWT(token);
    if (!decoded) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(loginUrl);
    }
    
    // Add user info to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // API route protection
  if (pathname.startsWith('/api/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = validateJWT(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Add user info to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Additional security for login endpoint
  if (pathname === '/admin/login') {
    // Add CSRF token to login page
    const csrfToken = crypto.randomUUID();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Protect all admin routes
    '/admin/:path*',
    // Protect all API routes
    '/api/:path*',
    // Protect all pages that need security headers
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
