# JWT Authentication Setup Guide

This guide will help you set up JWT-based authentication for the Nithyanruthyaaradana admin panel.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install jsonwebtoken bcryptjs @types/jsonwebtoken @types/bcryptjs
```

### 2. Run Setup Script
```bash
npm run setup:auth
```

### 3. Add Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@nithyanruthyaaradana.art
ADMIN_PASSWORD_HASH=your_hashed_password_here
```

### 4. Generate Admin Password Hash
```bash
npm run generate:hash your_password_here
```

## 🔐 Default Admin Credentials

- **Email**: admin@nithyanruthyaaradana.art
- **Password**: admin123

⚠️ **Important**: Change the default password in production!

## 📁 Files Created

### API Routes
- `src/app/api/auth/login/route.ts` - Login endpoint
- `src/app/api/auth/verify/route.ts` - Token verification
- `src/app/api/auth/refresh/route.ts` - Token refresh

### Components
- `src/contexts/auth-context.tsx` - React authentication context
- `src/components/protected-route.tsx` - Route protection component
- `src/app/admin/login/page.tsx` - Admin login page

### Middleware
- `middleware.ts` - Next.js middleware for route protection

### Scripts
- `scripts/setup-auth.js` - Authentication setup script
- `scripts/generate-admin-hash.js` - Password hash generator

## 🛡️ Security Features

### JWT Token Security
- Secure secret key generation
- 7-day token expiration
- Automatic token refresh
- Server-side token verification

### Route Protection
- Middleware-based protection
- Client-side route guards
- Role-based access control
- Automatic redirects

### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: restricted permissions

## 🔧 Usage

### Login
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access admin dashboard

### Protected Routes
All admin routes are automatically protected:
- `/admin/dashboard`
- `/admin/gallery`
- `/admin/reviews`
- `/admin/settings`

### API Authentication
Include JWT token in API requests:
```javascript
fetch('/api/admin/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🚨 Production Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (64+ characters)
- [ ] Set up HTTPS
- [ ] Configure secure cookies
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Regular security audits

## 🐛 Troubleshooting

### Common Issues

1. **"No token provided" error**
   - Check if JWT_SECRET is set in environment variables
   - Verify token is being sent in Authorization header

2. **"Invalid token" error**
   - Token may be expired
   - Check JWT_SECRET matches between client and server

3. **Login not working**
   - Verify password hash is correct
   - Check admin email matches environment variable

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📚 API Documentation

### POST /api/auth/login
```typescript
// Request
{
  "email": "admin@nithyanruthyaaradana.art",
  "password": "admin123"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin_1",
    "email": "admin@nithyanruthyaaradana.art",
    "role": "admin"
  },
  "expiresIn": "7d"
}
```

### GET /api/auth/verify
```typescript
// Headers
Authorization: Bearer <jwt_token>

// Response
{
  "valid": true,
  "user": {
    "id": "admin_1",
    "email": "admin@nithyanruthyaaradana.art",
    "role": "admin"
  }
}
```

### POST /api/auth/refresh
```typescript
// Headers
Authorization: Bearer <jwt_token>

// Response
{
  "success": true,
  "token": "new_jwt_token",
  "expiresIn": "7d"
}
```

## 🎯 Next Steps

1. **Test the authentication system**
2. **Customize admin roles and permissions**
3. **Add two-factor authentication**
4. **Implement audit logging**
5. **Set up user management**

---

For more information, see the main [README.md](../README.md) file.
