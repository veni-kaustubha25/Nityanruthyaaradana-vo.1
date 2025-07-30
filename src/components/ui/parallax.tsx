"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function Parallax({ children, className, speed = 0.5, offset = 0 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset - (100 * speed)]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

export function ParallaxImage({ 
  src, 
  alt, 
  className, 
  speed = 0.3, 
  overlay = false,
  overlayContent 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, scale }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/40">
            {overlayContent}
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundSpeed?: number;
  contentSpeed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxSection({ 
  children, 
  className, 
  backgroundImage,
  backgroundSpeed = 0.5,
  contentSpeed = 0.2,
  overlay = false,
  overlayOpacity = 0.4
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100 * backgroundSpeed]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100 * contentSpeed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className={cn("relative min-h-screen flex items-center justify-center overflow-hidden", className)}>
      {backgroundImage && (
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={backgroundImage}
            alt="Parallax background"
            className="w-full h-full object-cover"
          />
          {overlay && (
            <motion.div
              style={{ opacity }}
              className="absolute inset-0 bg-black"
            />
          )}
        </motion.div>
      )}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxText({ 
  children, 
  className, 
  speed = 0.5, 
  direction = 'up' 
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
      default:
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
    }
  };

  const transform = getTransform();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y: direction === 'up' || direction === 'down' ? transform : 0,
        x: direction === 'left' || direction === 'right' ? transform : 0,
        opacity 
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
} 