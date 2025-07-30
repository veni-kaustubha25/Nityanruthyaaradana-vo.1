"use client";

import { motion } from "framer-motion";

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export function LoadingAnimation({ 
  size = "md", 
  color = "primary",
  className = ""
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export function LoadingDots({ 
  size = "md", 
  color = "primary",
  className = ""
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: index * 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}
    </div>
  );
}

interface LoadingPulseProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export function LoadingPulse({ 
  size = "md", 
  color = "primary",
  className = ""
}: LoadingPulseProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />
  );
}

interface LoadingWaveProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export function LoadingWave({ 
  size = "md", 
  color = "primary",
  className = ""
}: LoadingWaveProps) {
  const sizeClasses = {
    sm: "w-1 h-4",
    md: "w-2 h-6",
    lg: "w-3 h-8"
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
          animate={{
            height: ["100%", "50%", "100%"],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}
    </div>
  );
} 