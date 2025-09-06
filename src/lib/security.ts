/**
 * Comprehensive Security Utilities
 * Provides input validation, sanitization, and security helpers
 */

// Simple HTML sanitization without external dependencies

// Input validation schemas
export const ValidationSchemas = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    maxLength: 254,
    minLength: 5,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  name: {
    maxLength: 100,
    minLength: 2,
    pattern: /^[a-zA-Z\s\u00C0-\u017F\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]+$/,
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    maxLength: 20,
  },
  url: {
    pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    maxLength: 2048,
  },
  text: {
    maxLength: 10000,
    minLength: 1,
  },
  review: {
    maxLength: 2000,
    minLength: 10,
  },
};

// Security validation functions
export class SecurityValidator {
  /**
   * Sanitize HTML content to prevent XSS
   */
  static sanitizeHTML(input: string): string {
    if (typeof input !== 'string') return '';
    
    // Remove all HTML tags except basic formatting
    const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br'];
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
    
    let sanitized = input.replace(tagRegex, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        return match;
      }
      return '';
    });
    
    // Remove any remaining script tags and event handlers
    sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/vbscript:/gi, '');
    
    return sanitized;
  }

  /**
   * Validate and sanitize email
   */
  static validateEmail(email: string): { isValid: boolean; sanitized: string; error?: string } {
    if (!email || typeof email !== 'string') {
      return { isValid: false, sanitized: '', error: 'Email is required' };
    }

    const sanitized = email.trim().toLowerCase();
    
    if (sanitized.length < ValidationSchemas.email.minLength) {
      return { isValid: false, sanitized: '', error: 'Email is too short' };
    }
    
    if (sanitized.length > ValidationSchemas.email.maxLength) {
      return { isValid: false, sanitized: '', error: 'Email is too long' };
    }
    
    if (!ValidationSchemas.email.pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid email format' };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { isValid: boolean; error?: string } {
    if (!password || typeof password !== 'string') {
      return { isValid: false, error: 'Password is required' };
    }

    if (password.length < ValidationSchemas.password.minLength) {
      return { isValid: false, error: `Password must be at least ${ValidationSchemas.password.minLength} characters` };
    }
    
    if (password.length > ValidationSchemas.password.maxLength) {
      return { isValid: false, error: `Password must be less than ${ValidationSchemas.password.maxLength} characters` };
    }
    
    if (!ValidationSchemas.password.pattern.test(password)) {
      return { 
        isValid: false, 
        error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' 
      };
    }

    return { isValid: true };
  }

  /**
   * Validate and sanitize name
   */
  static validateName(name: string): { isValid: boolean; sanitized: string; error?: string } {
    if (!name || typeof name !== 'string') {
      return { isValid: false, sanitized: '', error: 'Name is required' };
    }

    const sanitized = name.trim();
    
    if (sanitized.length < ValidationSchemas.name.minLength) {
      return { isValid: false, sanitized: '', error: 'Name is too short' };
    }
    
    if (sanitized.length > ValidationSchemas.name.maxLength) {
      return { isValid: false, sanitized: '', error: 'Name is too long' };
    }
    
    if (!ValidationSchemas.name.pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Name contains invalid characters' };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate and sanitize phone number
   */
  static validatePhone(phone: string): { isValid: boolean; sanitized: string; error?: string } {
    if (!phone || typeof phone !== 'string') {
      return { isValid: false, sanitized: '', error: 'Phone number is required' };
    }

    const sanitized = phone.replace(/[\s\-\(\)]/g, '');
    
    if (sanitized.length > ValidationSchemas.phone.maxLength) {
      return { isValid: false, sanitized: '', error: 'Phone number is too long' };
    }
    
    if (!ValidationSchemas.phone.pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid phone number format' };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate and sanitize URL
   */
  static validateURL(url: string): { isValid: boolean; sanitized: string; error?: string } {
    if (!url || typeof url !== 'string') {
      return { isValid: false, sanitized: '', error: 'URL is required' };
    }

    const sanitized = url.trim();
    
    if (sanitized.length > ValidationSchemas.url.maxLength) {
      return { isValid: false, sanitized: '', error: 'URL is too long' };
    }
    
    if (!ValidationSchemas.url.pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid URL format' };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate and sanitize text content
   */
  static validateText(text: string, fieldName: string = 'Text'): { isValid: boolean; sanitized: string; error?: string } {
    if (!text || typeof text !== 'string') {
      return { isValid: false, sanitized: '', error: `${fieldName} is required` };
    }

    const sanitized = this.sanitizeHTML(text.trim());
    
    if (sanitized.length < ValidationSchemas.text.minLength) {
      return { isValid: false, sanitized: '', error: `${fieldName} is too short` };
    }
    
    if (sanitized.length > ValidationSchemas.text.maxLength) {
      return { isValid: false, sanitized: '', error: `${fieldName} is too long` };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate and sanitize review content
   */
  static validateReview(review: string): { isValid: boolean; sanitized: string; error?: string } {
    if (!review || typeof review !== 'string') {
      return { isValid: false, sanitized: '', error: 'Review is required' };
    }

    const sanitized = this.sanitizeHTML(review.trim());
    
    if (sanitized.length < ValidationSchemas.review.minLength) {
      return { isValid: false, sanitized: '', error: 'Review must be at least 10 characters' };
    }
    
    if (sanitized.length > ValidationSchemas.review.maxLength) {
      return { isValid: false, sanitized: '', error: 'Review is too long' };
    }

    return { isValid: true, sanitized };
  }

  /**
   * Validate rating (1-5)
   */
  static validateRating(rating: number): { isValid: boolean; error?: string } {
    if (typeof rating !== 'number' || isNaN(rating)) {
      return { isValid: false, error: 'Rating must be a number' };
    }
    
    if (rating < 1 || rating > 5) {
      return { isValid: false, error: 'Rating must be between 1 and 5' };
    }

    return { isValid: true };
  }

  /**
   * Check for SQL injection patterns
   */
  static detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+['"]\s*=\s*['"])/i,
      /(\b(OR|AND)\s+['"]\s*LIKE\s*['"])/i,
      /(\b(OR|AND)\s+['"]\s*IN\s*\()/i,
      /(\b(OR|AND)\s+['"]\s*BETWEEN\s+)/i,
      /(\b(OR|AND)\s+['"]\s*EXISTS\s*\()/i,
      /(\b(OR|AND)\s+['"]\s*NOT\s+EXISTS\s*\()/i,
      /(\b(OR|AND)\s+['"]\s*IS\s+NULL)/i,
      /(\b(OR|AND)\s+['"]\s*IS\s+NOT\s+NULL)/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for XSS patterns
   */
  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>.*?<\/embed>/gi,
      /<applet[^>]*>.*?<\/applet>/gi,
      /<meta[^>]*>.*?<\/meta>/gi,
      /<link[^>]*>.*?<\/link>/gi,
      /<style[^>]*>.*?<\/style>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi,
      /onclick\s*=/gi,
      /onmouseover\s*=/gi,
      /onfocus\s*=/gi,
      /onblur\s*=/gi,
      /onchange\s*=/gi,
      /onsubmit\s*=/gi,
      /onreset\s*=/gi,
      /onselect\s*=/gi,
      /onkeydown\s*=/gi,
      /onkeyup\s*=/gi,
      /onkeypress\s*=/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Comprehensive input validation
   */
  static validateInput(input: string, type: keyof typeof ValidationSchemas): { isValid: boolean; sanitized: string; error?: string } {
    // Check for SQL injection
    if (this.detectSQLInjection(input)) {
      return { isValid: false, sanitized: '', error: 'Invalid input detected' };
    }

    // Check for XSS
    if (this.detectXSS(input)) {
      return { isValid: false, sanitized: '', error: 'Invalid input detected' };
    }

    // Validate based on type
    switch (type) {
      case 'email':
        return this.validateEmail(input);
      case 'name':
        return this.validateName(input);
      case 'phone':
        return this.validatePhone(input);
      case 'url':
        return this.validateURL(input);
      case 'text':
        return this.validateText(input);
      case 'review':
        return this.validateReview(input);
      default:
        return this.validateText(input);
    }
  }
}

// CSRF token utilities
export class CSRFProtection {
  /**
   * Generate CSRF token
   */
  static generateToken(): string {
    return crypto.randomUUID();
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string, cookieToken: string): boolean {
    return token === cookieToken && token.length > 0;
  }
}

// Rate limiting utilities
export class RateLimiter {
  private static store = new Map<string, { count: number; resetTime: number }>();

  static checkLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const key = identifier;
    
    // Clean up expired entries
    for (const [k, v] of this.store.entries()) {
      if (now > v.resetTime) {
        this.store.delete(k);
      }
    }
    
    const current = this.store.get(key);
    
    if (!current) {
      this.store.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (now > current.resetTime) {
      this.store.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (current.count >= maxRequests) {
      return false;
    }
    
    current.count++;
    return true;
  }
}

// Security headers utilities
export class SecurityHeaders {
  static getSecurityHeaders(): Record<string, string> {
    return {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    };
  }
}
