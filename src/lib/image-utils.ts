// Local image URLs from public/images folder
export const reliableImages = {
  // Dance performance images
  performance: [
    '/images/1.jpg',
    '/images/2.JPG',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ],
  
  // Group practice images
  groupPractice: [
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
  ],
  
  // Training images
  training: [
    '/images/11.JPG',
    '/images/12.JPG',
    '/images/1.jpg',
    '/images/2.JPG',
    '/images/3.jpg',
  ],
  
  // Event images
  events: [
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
  ],
  
  // Teacher/Founder images
  teacher: [
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.JPG',
    '/images/12.JPG',
    '/images/1.jpg',
  ],
  
  // Studio images
  studio: [
    '/images/2.JPG',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ],

  // Student life images
  studentLife: [
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.JPG',
  ],

  // Cultural events images
  cultural: [
    '/images/12.JPG',
    '/images/1.jpg',
    '/images/2.JPG',
    '/images/3.jpg',
    '/images/4.jpg',
  ],
};

// Fallback URLs using local images
export const fallbackUrls = {
  performance: [
    '/images/1.jpg',
    '/images/2.JPG',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ],
  practice: [
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
  ],
  training: [
    '/images/11.JPG',
    '/images/12.JPG',
    '/images/1.jpg',
    '/images/2.JPG',
    '/images/3.jpg',
  ],
  events: [
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
  ],
  teacher: [
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.JPG',
    '/images/12.JPG',
    '/images/1.jpg',
  ],
  studentLife: [
    '/images/2.JPG',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ],
  cultural: [
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.JPG',
  ],
};

// Function to get a deterministic image from a category based on a seed
export function getRandomImage(category: keyof typeof reliableImages, seed?: string): string {
  // Validate category and provide fallback
  const validCategory = reliableImages[category] ? category : 'performance';
  const images = reliableImages[validCategory];
  
  // Ensure images array exists and has items
  if (!images || images.length === 0) {
    return '/images/1.jpg';
  }
  
  // Use a deterministic seed if provided, otherwise use category name
  const seedValue = seed || validCategory;
  let hash = 0;
  for (let i = 0; i < seedValue.length; i++) {
    const char = seedValue.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % images.length;
  return images[index];
}

// Function to get fallback URLs for a category
export function getFallbackUrls(category: keyof typeof fallbackUrls): string[] {
  return fallbackUrls[category] || fallbackUrls.performance;
}

// Function to replace problematic Unsplash URLs with local images
export function replaceUnsplashUrl(originalUrl: string, category: keyof typeof reliableImages = 'performance'): string {
  // Validate input URL
  if (!originalUrl || typeof originalUrl !== 'string') {
    return getRandomImage('performance', 'fallback');
  }
  
  // Validate category and provide fallback
  const validCategory = reliableImages[category] ? category : 'performance';
  
  // Check if it's one of the problematic Unsplash URLs (with or without query parameters)
  const problematicUrls = [
    'https://images.unsplash.com/photo-1547153760-180fc612c570',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
  ];
  
  const isProblematic = problematicUrls.some(url => originalUrl.includes(url));
  
  if (isProblematic) {
    // Use the original URL as a seed to ensure consistency
    return getRandomImage(validCategory, originalUrl);
  }
  
  // Also replace any other Unsplash URLs to prevent future issues
  if (originalUrl.includes('images.unsplash.com')) {
    return getRandomImage(validCategory, originalUrl);
  }
  
  return originalUrl;
}

// Function to get image dimensions based on category
export function getImageDimensions(category: keyof typeof reliableImages): { width: number; height: number } {
  const dimensions = {
    performance: { width: 600, height: 800 },
    groupPractice: { width: 600, height: 400 },
    training: { width: 600, height: 400 },
    events: { width: 600, height: 400 },
    teacher: { width: 600, height: 400 },
    studio: { width: 600, height: 400 },
    studentLife: { width: 600, height: 400 },
    cultural: { width: 600, height: 400 },
  };
  
  return dimensions[category] || { width: 600, height: 400 };
}

// Function to validate image URL
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // For local images, just check if it starts with /
  if (url.startsWith('/')) {
    return true;
  }
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Function to get optimized image URL with parameters
export function getOptimizedImageUrl(url: string, width: number = 600, height: number = 400, quality: number = 85): string {
  if (!isValidImageUrl(url)) {
    return getRandomImage('performance', 'optimized');
  }
  
  // For local images, return as is since Next.js handles optimization
  if (url.startsWith('/')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    
    // Add optimization parameters
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('fit', 'crop');
    urlObj.searchParams.set('crop', 'center');
    
    return urlObj.toString();
  } catch {
    return url;
  }
} 