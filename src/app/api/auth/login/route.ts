import { NextRequest, NextResponse } from 'next/server';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SecurityValidator, RateLimiter, CSRFProtection } from '@/lib/security';

interface AdminUser {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
}

// Mock admin user - in production, this would come from a database
const ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin_1',
    email: 'admin@nithyanruthyaaradana.art',
    password: '$2b$10$KmeiaIgBzptWZEtk/Erzjuvgv.kMRgGW7jd3KRd.u6Sa8oket8Rl6',
    role: 'admin',
    isActive: true
  }
];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `login:${ip}`;
    
    if (!RateLimiter.checkLimit(rateLimitKey, 5, 15 * 60 * 1000)) { // 5 attempts per 15 minutes
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // CSRF protection is handled by middleware for non-auth endpoints
    // Login endpoint is excluded from CSRF validation

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = SecurityValidator.validateEmail(email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password (more lenient for admin login)
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Find admin user
    const admin = ADMIN_USERS.find(user => user.email === emailValidation.sanitized && user.isActive);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
    const payload = { 
      userId: admin.id, 
      email: admin.email, 
      role: admin.role 
    };
    const token = jwt.sign(payload, jwtSecret, { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    } as any);

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

    // Set secure HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Clear CSRF token after successful login
    response.cookies.delete('csrf-token');

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
