import { NextRequest, NextResponse } from 'next/server';
import jwt, { SignOptions } from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'super_admin';
  iat: number;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
      
      // Generate new token with same payload
      const payload = { 
        userId: decoded.userId, 
        email: decoded.email, 
        role: decoded.role 
      };
      const newToken = jwt.sign(payload, jwtSecret, { 
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      } as any);

      return NextResponse.json({
        success: true,
        token: newToken,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      });
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
