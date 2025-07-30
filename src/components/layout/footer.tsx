"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <Link 
              href="/" 
              aria-label="Back to homepage"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <AnimatedLogo />
            </Link>
            <p className="mt-4 max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
              Preserving and promoting the timeless art of Indian classical dance for future generations.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">About Us</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Gallery</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Admissions</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-base sm:text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                <a href="mailto:info@nithyanruthyaaradana.art" className="hover:text-primary transition-colors text-sm sm:text-base">info@nithyanruthyaaradana.art</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors text-sm sm:text-base">+91 123 456 7890</a>
              </li>
            </ul>
            <div className="mt-4 sm:mt-6 flex gap-4">
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-border pt-4 sm:pt-6 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nithyanruthyaaradana. All rights reserved.</p>
          <p className="mt-1">Site Developed by <Button asChild variant="link" className="p-0 h-auto text-xs sm:text-sm text-primary font-bold underline"><Link href="https://anandverse.space" target="_blank" rel="noopener noreferrer">AnandVerse Web Services</Link></Button></p>
        </div>
      </div>
    </footer>
  );
}
