"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link 
              href="/" 
              className="flex items-center space-x-2"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <AnimatedLogo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={item.href}
                  className="text-sm xl:text-base font-medium transition-colors hover:text-primary relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Button asChild size="sm" className="text-sm xl:text-base px-4 xl:px-6">
                <Link href="/register">Enroll Now</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col space-y-6 h-full">
                    <div className="flex items-center justify-between">
                      <AnimatedLogo />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <nav className="flex flex-col space-y-4 flex-grow">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium transition-colors hover:text-primary py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="pt-4 border-t">
                      <Button asChild className="w-full text-base py-3">
                        <Link href="/register">Enroll Now</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
