import { NextRequest, NextResponse } from 'next/server';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin user
    const admin = ADMIN_USERS.find(user => user.email === email && user.isActive);
    
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

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
