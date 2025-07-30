"use client";

import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Professional easing curves
const EASINGS = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.055, 0.675, 0.19],
  easeInOut: [0.645, 0.045, 0.355, 1],
} as const;

// Professional animation variants
const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASINGS.smooth,
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASINGS.smooth,
      }
    }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASINGS.smooth,
      }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: EASINGS.smooth,
      }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: EASINGS.smooth,
      }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: EASINGS.smooth,
      }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASINGS.smooth,
      }
    }
  },
  reveal: {
    hidden: { 
      opacity: 0, 
      clipPath: "inset(0 100% 0 0)",
      y: 20 
    },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0 0% 0 0)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASINGS.smooth,
      }
    }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }
} as const;

// Professional Fade In Animation
interface FadeInProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function FadeIn({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.6,
  once = true 
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Professional Slide Animation
interface SlideProps extends PropsWithChildren {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  once?: boolean;
}

export function Slide({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0,
  distance = 30,
  once = true
}: SlideProps) {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: EASINGS.smooth,
        }
      }
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "down":
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "left":
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case "right":
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}

// Professional Scale Animation
interface ScaleProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  scale?: number;
  once?: boolean;
}

export function Scale({ 
  children, 
  className = "", 
  delay = 0,
  scale = 0.9,
  once = true
}: ScaleProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, scale },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: 0.6,
            delay,
            ease: EASINGS.smooth,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Professional Stagger Container
interface StaggerContainerProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({ 
  children, 
  className = "", 
  delay = 0,
  staggerDelay = 0.1,
  once = true
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Professional Stagger Item
interface StaggerItemProps extends PropsWithChildren {
  className?: string;
  animation?: "fade" | "slide" | "scale" | "reveal";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggerItem({ 
  children, 
  className = "",
  animation = "fade",
  direction = "up",
  distance = 30
}: StaggerItemProps) {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: EASINGS.smooth,
        }
      }
    };

    switch (animation) {
      case "fade":
        return baseVariants;
      case "slide":
        switch (direction) {
          case "up":
            return {
              hidden: { opacity: 0, y: distance },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASINGS.smooth } }
            };
          case "down":
            return {
              hidden: { opacity: 0, y: -distance },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASINGS.smooth } }
            };
          case "left":
            return {
              hidden: { opacity: 0, x: distance },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASINGS.smooth } }
            };
          case "right":
            return {
              hidden: { opacity: 0, x: -distance },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASINGS.smooth } }
            };
          default:
            return baseVariants;
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASINGS.smooth } }
        };
      case "reveal":
        return {
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", y: distance },
          visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", y: 0, transition: { duration: 0.6, ease: EASINGS.smooth } }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}

// Professional Hover Animation
interface HoverAnimationProps extends PropsWithChildren {
  className?: string;
  scale?: number;
  y?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  effect?: "scale" | "lift" | "rotate" | "glow" | "tilt";
  tapEffect?: "scale" | "lift" | "rotate" | "glow" | "tilt";
}

export function HoverAnimation({ 
  children, 
  className = "",
  scale = 1.05,
  y = -8,
  rotate = 2,
  duration = 0.3,
  delay = 0,
  effect = "lift",
  tapEffect = "scale"
}: HoverAnimationProps) {
  const getHoverVariants = () => {
    switch (effect) {
      case "scale":
        return {
          scale,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
      case "lift":
        return {
          y,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
      case "rotate":
        return {
          rotate,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
      case "glow":
        return {
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(139, 26, 26, 0.15)",
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
      case "tilt":
        return {
          rotateY: 5,
          rotateX: 2,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
      default:
        return {
          scale,
          transition: {
            duration,
            delay,
            ease: EASINGS.smooth,
          }
        };
    }
  };

  const getTapVariants = () => {
    switch (tapEffect) {
      case "scale":
        return {
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
      case "lift":
        return {
          y: y * 0.5,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
      case "rotate":
        return {
          rotate: rotate * 0.5,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
      case "glow":
        return {
          scale: 0.98,
          boxShadow: "0 10px 20px rgba(139, 26, 26, 0.1)",
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
      case "tilt":
        return {
          rotateY: 2,
          rotateX: 1,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
      default:
        return {
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: EASINGS.smooth,
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      whileHover={getHoverVariants()}
      whileTap={getTapVariants()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: EASINGS.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

// Professional Text Animation
interface TextAnimationProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  type?: "fade" | "slide" | "scale" | "reveal" | "typing";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export function TextAnimation({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.8,
  type = "fade",
  direction = "up",
  distance = 30,
  once = true
}: TextAnimationProps) {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: EASINGS.smooth,
        }
      }
    };

    switch (type) {
      case "fade":
        return baseVariants;
      case "slide":
        switch (direction) {
          case "up":
            return {
              hidden: { opacity: 0, y: distance },
              visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASINGS.smooth } }
            };
          case "down":
            return {
              hidden: { opacity: 0, y: -distance },
              visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASINGS.smooth } }
            };
          case "left":
            return {
              hidden: { opacity: 0, x: distance },
              visible: { opacity: 1, x: 0, transition: { duration, delay, ease: EASINGS.smooth } }
            };
          case "right":
            return {
              hidden: { opacity: 0, x: -distance },
              visible: { opacity: 1, x: 0, transition: { duration, delay, ease: EASINGS.smooth } }
            };
          default:
            return baseVariants;
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: EASINGS.smooth,
            }
          }
        };
      case "reveal":
        return {
          hidden: { 
            opacity: 0, 
            clipPath: "inset(0 100% 0 0)",
            y: distance 
          },
          visible: { 
            opacity: 1, 
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            transition: {
              duration,
              delay,
              ease: EASINGS.smooth,
            }
          }
        };
      case "typing":
        return {
          hidden: { 
            opacity: 0, 
            width: 0,
            overflow: "hidden"
          },
          visible: { 
            opacity: 1, 
            width: "100%",
            overflow: "visible",
            transition: {
              duration,
              delay,
              ease: EASINGS.smooth,
            }
          }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}

// Professional Page Transition
interface PageTransitionProps extends PropsWithChildren {
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: EASINGS.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

// Professional Loading Animation
interface LoadingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingAnimation({ className = "", size = "md" }: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={cn("border-2 border-primary/20 border-t-primary rounded-full", sizeClasses[size])}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}

// Professional Parallax Animation
interface ParallaxProps extends PropsWithChildren {
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({ 
  children, 
  className = "", 
  speed = 0.5,
  direction = "up"
}: ParallaxProps) {
  return (
    <motion.div
      className={className}
      style={{
        y: useTransform(
          useScroll().scrollYProgress,
          [0, 1],
          direction === "up" ? [0, -100 * speed] : [0, 100 * speed]
        )
      }}
    >
      {children}
    </motion.div>
  );
} 