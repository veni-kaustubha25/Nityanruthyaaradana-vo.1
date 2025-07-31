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
  'data-ai-hint'?: string;
}

// Function to get deterministic fallback URLs from placehold.co
function getFallbackUrls(originalSrc: string, width: number, height: number): string[] {
    let hash = 0;
    for (let i = 0; i < originalSrc.length; i++) {
        const char = originalSrc.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    const seed1 = Math.abs(hash);
    const seed2 = Math.abs(hash + 1);
    const seed3 = Math.abs(hash + 2);

    return [
        `https://placehold.co/${width}x${height}/8B1A1A/FFFFFF.png?text=Image+${seed1}`,
        `https://placehold.co/${width}x${height}/6A1A1A/FFFFFF.png?text=Image+${seed2}`,
        `https://placehold.co/${width}x${height}/4A1A1A/FFFFFF.png?text=Image+${seed3}`,
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
  onLoad,
  onError,
  ...props
}: FallbackImageProps) {
  const finalFallbackSrcs = fallbackSrcs || getFallbackUrls(src, width, height);
  const safeInitialSrc = src || finalFallbackSrcs[0] || `https://placehold.co/${width}x${height}.png`;
  
  const [currentSrc, setCurrentSrc] = useState(safeInitialSrc);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const safeSrc = src || finalFallbackSrcs[0] || `https://placehold.co/${width}x${height}.png`;
    setCurrentSrc(safeSrc);
    setCurrentIndex(0);
    setHasError(false);
    setRetryCount(0);
  }, [src, width, height, finalFallbackSrcs]);

  const handleError = useCallback(() => {
    if (currentIndex < finalFallbackSrcs.length - 1) {
      setCurrentSrc(finalFallbackSrcs[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [currentIndex, finalFallbackSrcs, onError]);

  const handleLoad = useCallback(() => {
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setCurrentSrc(`${finalFallbackSrcs[0]}?retry=${retryCount + 1}`);
    }
  }, [retryCount, finalFallbackSrcs]);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg ${className}`}
        style={{ width, height }}
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

  const safeSrc = currentSrc || finalFallbackSrcs[0] || `https://placehold.co/${width}x${height}.png`;

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
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      {...props}
    />
  );
}
