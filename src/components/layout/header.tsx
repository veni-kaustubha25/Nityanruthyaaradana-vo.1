"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Phone } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { LiveTime } from "@/components/live-time";
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
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#8B0000]/95 backdrop-blur supports-[backdrop-filter]:bg-[#8B0000]/80 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-1 sm:py-2 border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
                         <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-300 group">
             <div className="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-all duration-300">
               <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
             </div>
             <span className="hidden xs:inline font-medium text-xs">+91 123 456 7890</span>
             <span className="xs:hidden font-medium text-xs">+91 123 456 7890</span>
           </a>
                         <a href="mailto:info@nithyanruthyaaradana.art" className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-300 group">
             <div className="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-all duration-300">
               <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
             </div>
             <span className="hidden sm:inline font-medium text-xs">info@nithyanruthyaaradana.art</span>
             <span className="sm:hidden font-medium text-xs">info@academy.art</span>
           </a>
            </div>

            {/* Business Hours & Live Time */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                         <div className="hidden sm:flex items-center gap-2">
             <div className="bg-white/10 rounded-full p-1">
               <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <span className="hidden lg:inline font-medium text-xs">Mon-Sat: 9:00 AM - 8:00 PM</span>
             <span className="lg:hidden font-medium text-xs">Mon-Sat: 9AM-8PM</span>
           </div>
                         <div className="hidden md:flex items-center">
             <div className="bg-white/10 rounded-lg px-2 py-1 border border-white/20">
               <LiveTime />
             </div>
           </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
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
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
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
                  className="text-sm lg:text-base font-medium text-white transition-colors hover:text-yellow-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
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
              <Button asChild size="sm" className="bg-white text-[#8B0000] hover:bg-gray-100">
                <Link href="/register">Enroll Now</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Large Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-4">
            {navigation.slice(0, 3).map((item, index) => (
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
                  className="text-sm font-medium text-white transition-colors hover:text-yellow-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Button asChild size="sm" className="bg-white text-[#8B0000] hover:bg-gray-100">
                <Link href="/register">Enroll</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Medium Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-3">
            {navigation.slice(0, 2).map((item, index) => (
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
                  className="text-xs font-medium text-white transition-colors hover:text-yellow-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Button asChild size="sm" className="bg-white text-[#8B0000] hover:bg-gray-100 text-xs px-3">
                <Link href="/register">Join</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
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
                  <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white">
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
                          className="text-base sm:text-lg font-medium transition-colors hover:text-[#8B0000] py-3 border-b border-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="pt-4 border-t border-gray-200">
                      <Button asChild className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white">
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
