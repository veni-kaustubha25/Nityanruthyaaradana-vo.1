'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMonitorProps {
  onImageLoad?: (imageUrl: string, loadTime: number) => void;
  onImageError?: (imageUrl: string, error: string) => void;
  onModalOpen?: (imageIndex: number) => void;
  onModalClose?: () => void;
  onNavigation?: (fromIndex: number, toIndex: number) => void;
}

export function PerformanceMonitor({
  onImageLoad,
  onImageError,
  onModalOpen,
  onModalClose,
  onNavigation,
}: PerformanceMonitorProps) {
  const startTime = useRef<number>(Date.now());
  const imageLoadTimes = useRef<Map<string, number>>(new Map());
  const modalOpenTime = useRef<number>(0);

  useEffect(() => {
    // Track page load performance
    const handleLoad = () => {
      const loadTime = Date.now() - startTime.current;
      console.log(`Page loaded in ${loadTime}ms`);
    };

    // Track image loading performance
    const handleImageLoad = (event: Event) => {
      const img = event.target as HTMLImageElement;
      const loadTime = Date.now() - startTime.current;
      imageLoadTimes.current.set(img.src, loadTime);
      
      onImageLoad?.(img.src, loadTime);
      console.log(`Image loaded: ${img.src} in ${loadTime}ms`);
    };

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      onImageError?.(img.src, 'Failed to load image');
      console.error(`Image failed to load: ${img.src}`);
    };

    // Track user interactions
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-image-modal]')) {
        modalOpenTime.current = Date.now();
        onModalOpen?.(0); // Default index, will be updated by actual modal
      }
    };

    // Add event listeners
    window.addEventListener('load', handleLoad);
    document.addEventListener('click', handleClick);

    // Monitor all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
    });

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('click', handleClick);
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      });
    };
  }, [onImageLoad, onImageError, onModalOpen]);

  // Track modal interactions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const modalOpenDuration = Date.now() - modalOpenTime.current;
        onModalClose?.();
        console.log(`Modal was open for ${modalOpenDuration}ms`);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onModalClose]);

  // Performance metrics
  const getAverageImageLoadTime = () => {
    const times = Array.from(imageLoadTimes.current.values());
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  };

  const getSlowestImage = () => {
    let slowestUrl = '';
    let slowestTime = 0;
    
    imageLoadTimes.current.forEach((time, url) => {
      if (time > slowestTime) {
        slowestTime = time;
        slowestUrl = url;
      }
    });
    
    return { url: slowestUrl, time: slowestTime };
  };

  // Expose performance data for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__PERFORMANCE_MONITOR__ = {
        getAverageImageLoadTime,
        getSlowestImage,
        imageLoadTimes: imageLoadTimes.current,
      };
    }
  }, []);

  return null; // This component doesn't render anything
}

// Hook for tracking image performance
export function useImagePerformance() {
  const imageStats = useRef({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    totalLoadTime: 0,
  });

  const trackImageLoad = (loadTime: number) => {
    imageStats.current.loadedImages++;
    imageStats.current.totalLoadTime += loadTime;
  };

  const trackImageError = () => {
    imageStats.current.failedImages++;
  };

  const getStats = () => {
    const { totalImages, loadedImages, failedImages, totalLoadTime } = imageStats.current;
    return {
      totalImages,
      loadedImages,
      failedImages,
      successRate: totalImages > 0 ? (loadedImages / totalImages) * 100 : 0,
      averageLoadTime: loadedImages > 0 ? totalLoadTime / loadedImages : 0,
    };
  };

  return {
    trackImageLoad,
    trackImageError,
    getStats,
  };
} 