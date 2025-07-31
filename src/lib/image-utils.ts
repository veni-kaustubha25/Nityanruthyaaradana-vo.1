// This file is kept for utility functions but no longer holds static image lists.

// Function to get placeholder image dimensions based on category
export function getImageDimensions(category: string): { width: number; height: number } {
  const dimensions: { [key: string]: { width: number; height: number } } = {
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
  
  if (url.startsWith('/')) {
    // Local image paths are no longer used, but keeping logic for robustness
    return false; 
  }
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Function to create a placeholder URL
export function getPlaceholderUrl(width: number, height: number, text?: string): string {
    const url = `https://placehold.co/${width}x${height}/8B1A1A/FFFFFF.png`;
    if (text) {
        return `${url}?text=${encodeURIComponent(text)}`;
    }
    return url;
}

// Function to get optimized image URL with parameters (less relevant for placehold.co but good practice)
export function getOptimizedImageUrl(url: string, width: number = 600, height: number = 400, quality: number = 85): string {
  if (!isValidImageUrl(url)) {
    return getPlaceholderUrl(width, height, 'Invalid URL');
  }
  
  try {
    const urlObj = new URL(url);
    
    // Add optimization parameters if it's not a placeholder
    if (!url.includes('placehold.co')) {
        urlObj.searchParams.set('w', width.toString());
        urlObj.searchParams.set('h', height.toString());
        urlObj.searchParams.set('q', quality.toString());
        urlObj.searchParams.set('fit', 'crop');
        urlObj.searchParams.set('crop', 'center');
    }
    
    return urlObj.toString();
  } catch {
    return url;
  }
}
