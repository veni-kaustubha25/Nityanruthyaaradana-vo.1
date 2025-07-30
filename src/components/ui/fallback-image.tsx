'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrcs?: string[];
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

// Function to get deterministic fallback URLs using local images
function getFallbackUrls(originalSrc: string): string[] {
  // Create a hash from the original source to ensure consistency
  let hash = 0;
  for (let i = 0; i < originalSrc.length; i++) {
    const char = originalSrc.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const seed1 = Math.abs(hash) % 12;
  const seed2 = Math.abs(hash + 1) % 12;
  const seed3 = Math.abs(hash + 2) % 12;
  
  const imageFiles = [
    '/images/1.jpg',
    '/images/2.JPG', 
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.JPG',
    '/images/12.JPG',
  ];
  
  return [
    imageFiles[seed1] || '/images/1.jpg',
    imageFiles[seed2] || '/images/2.JPG',
    imageFiles[seed3] || '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
  ];
}

export function FallbackImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = '',
  priority = false,
  fallbackSrcs,
  placeholder,
  onLoad,
  onError,
  style,
}: FallbackImageProps) {
  // Use deterministic fallback URLs if none provided
  const finalFallbackSrcs = fallbackSrcs || getFallbackUrls(src);
  // Ensure we never start with an empty src
  const safeInitialSrc = src || finalFallbackSrcs[0] || '/images/1.jpg';
  const [currentSrc, setCurrentSrc] = useState(safeInitialSrc);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Reset state when src changes
  useEffect(() => {
    const safeSrc = src || finalFallbackSrcs[0] || '/images/1.jpg';
    setCurrentSrc(safeSrc);
    setCurrentIndex(0);
    setHasError(false);
    setRetryCount(0);
  }, [src, finalFallbackSrcs]);

  const handleError = useCallback(() => {
    console.log(`Image failed to load: ${currentSrc}, trying fallback ${currentIndex + 1}/${finalFallbackSrcs.length}`);
    
    if (currentIndex < finalFallbackSrcs.length - 1) {
      setCurrentSrc(finalFallbackSrcs[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [currentSrc, currentIndex, finalFallbackSrcs, onError]);

  const handleLoad = useCallback(() => {
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      // Force re-render by changing src slightly
      setCurrentSrc(`${finalFallbackSrcs[0]}?retry=${retryCount + 1}`);
    }
  }, [retryCount, finalFallbackSrcs]);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg ${className}`}
        style={{ width: width, height: height }}
      >
        <div className="text-center p-4">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground mb-2">Image unavailable</p>
          {retryCount < 3 && (
            <button
              onClick={handleRetry}
              className="text-xs text-primary hover:text-primary/80 underline"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Ensure we never pass an empty string to the Image component
  const safeSrc = currentSrc || finalFallbackSrcs[0] || '/images/1.jpg';

  return (
    <Image
      src={safeSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      onLoad={handleLoad}
      loading={priority ? 'eager' : 'lazy'}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      style={style}
    />
  );
} 