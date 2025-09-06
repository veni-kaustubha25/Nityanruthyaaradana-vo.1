import { NextRequest, NextResponse } from 'next/server';
import { SecurityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear all authentication cookies
    response.cookies.delete('admin_token');
    response.cookies.delete('csrf-token');
    
    // Set additional security headers
    const securityHeaders = SecurityHeaders.getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for logout (redirect)
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  
  // Clear cookies
  response.cookies.delete('admin_token');
  response.cookies.delete('csrf-token');
  
  return response;
}
