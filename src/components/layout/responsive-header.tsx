"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail, Clock, MapPin } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { LiveTime } from "@/components/live-time";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function ResponsiveHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#8B0000]/98 backdrop-blur-md shadow-lg border-gray-200/20' 
          : 'bg-[#8B0000]/95 backdrop-blur supports-[backdrop-filter]:bg-[#8B0000]/80 shadow-sm border-gray-200'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Top Bar - Hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-1.5 border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Contact Information */}
            <div className="flex items-center gap-6">
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-300 group">
                <div className="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="font-medium text-sm">+91 8639399385</span>
              </a>
              <a href="mailto:info@nithyanruthyaaradana.art" className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-300 group">
                <div className="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="font-medium text-sm">info@nithyanruthyaaradana.art</span>
              </a>
            </div>

            {/* Business Hours & Live Time */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 rounded-full p-1">
                  <Clock className="h-3 w-3" />
                </div>
                <span className="font-medium text-sm">Mon-Sat: 9AM-8PM</span>
              </div>
              <LiveTime />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white shrink-0"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <motion.path
                  d="M12 6C9.13 6 6.88 8.05 6.2 10.74C7.05 10.25 8.05 10 9.12 10C11.83 10 14.05 11.84 14.68 14.39C16.14 13.6 17.34 12.06 17.79 10.21C16.41 7.84 14.37 6 12 6Z"
                  fill="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.svg>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="hidden sm:inline">Nithyanruthyaaradana</span>
                <span className="sm:hidden">Nithyanruthyaaradana</span>
              </motion.span>
              <span className="text-xs sm:text-sm text-yellow-200/80 font-medium">
                Classical Dance Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link href="/register">
              <Button 
                size="sm" 
                className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-[#8B0000] font-semibold transition-all duration-300 hover:scale-105"
              >
                Register Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-300 hover:bg-white/10 p-2"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#8B0000] border-l border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white shrink-0"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M12 6C9.13 6 6.88 8.05 6.2 10.74C7.05 10.25 8.05 10 9.12 10C11.83 10 14.05 11.84 14.68 14.39C16.14 13.6 17.34 12.06 17.79 10.21C16.41 7.84 14.37 6 12 6Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                  <div>
                    <SheetTitle className="text-white text-lg font-bold">
                      Nithyanruthyaaradana
                    </SheetTitle>
                    <p className="text-yellow-200/80 text-sm">Classical Dance Academy</p>
                  </div>
                </div>
                
                {/* Mobile Contact Info */}
                <div className="mb-6 p-4 bg-white/10 rounded-lg">
                  <div className="space-y-3">
                    <a href="tel:+911234567890" className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">+91 8639399385</span>
                    </a>
                    <a href="mailto:info@nithyanruthyaaradana.art" className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">info@nithyanruthyaaradana.art</span>
                    </a>
                    <div className="flex items-center gap-3 text-white">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Mon-Sat: 9AM-8PM</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-4 py-3 text-white hover:text-yellow-300 hover:bg-white/10 rounded-md transition-all duration-300 text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button 
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#8B0000] font-semibold py-3 text-lg"
                      >
                        Register Now
                      </Button>
                    </Link>
                  </motion.div>
                </nav>

                {/* Mobile Live Time */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center">
                    <LiveTime />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
