"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Youtube, MapPin, Clock, ArrowRight } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#8B0000] text-white">
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 border-t border-gray-400">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              aria-label="Back to homepage"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <AnimatedLogo />
            </Link>
            <p className="mt-4 sm:mt-6 max-w-md text-gray-300 leading-relaxed text-sm sm:text-base">
              Preserving and promoting the timeless art of Indian classical dance for future generations. 
              Join our vibrant community and discover the transformative power of Bharatanatyam.
            </p>
            <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
              <Link href="#" aria-label="Instagram" className="bg-white text-[#8B0000] p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="bg-white text-[#8B0000] p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" aria-label="YouTube" className="bg-white text-[#8B0000] p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-yellow-300">
              Quick Links
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link href="/about" className="text-gray-200 hover:text-yellow-300 transition-colors flex items-center gap-2 group text-sm sm:text-base">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-200 hover:text-yellow-300 transition-colors flex items-center gap-2 group text-sm sm:text-base">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-200 hover:text-yellow-300 transition-colors flex items-center gap-2 group text-sm sm:text-base">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-yellow-300 transition-colors flex items-center gap-2 group text-sm sm:text-base">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-yellow-300">
              Contact Info
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="bg-white text-[#8B0000] p-1.5 sm:p-2 rounded-full mt-1 flex-shrink-0">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-200 text-sm sm:text-base">Email</div>
                  <a href="mailto:info@nithyanruthyaaradana.art" className="text-gray-200 hover:text-yellow-300 transition-colors text-xs sm:text-sm break-all">
                    info@nithyanruthyaaradana.art
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="bg-white text-[#8B0000] p-1.5 sm:p-2 rounded-full mt-1 flex-shrink-0">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-200 text-sm sm:text-base">Phone</div>
                  <a href="tel:+911234567890" className="text-gray-200 hover:text-yellow-300 transition-colors text-xs sm:text-sm">
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="bg-white text-[#8B0000] p-1.5 sm:p-2 rounded-full mt-1 flex-shrink-0">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-200 text-sm sm:text-base">Address</div>
                  <div className="text-gray-200 text-xs sm:text-sm">
                    123 Dance Street,<br />
                    Cultural District,<br />
                    Mumbai, Maharashtra 400001
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="bg-white text-[#8B0000] p-1.5 sm:p-2 rounded-full mt-1 flex-shrink-0">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-200 text-sm sm:text-base">Hours</div>
                  <div className="text-gray-200 text-xs sm:text-sm">
                    Tue,Thur,Sat: 5:30 PM - 8:30 PM<br />
                    Sunday: open
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="border-t border-gray-400 py-4 sm:py-6">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} Nithyanruthyaaradana. All rights reserved.
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-gray-300 text-xs sm:text-sm">
                Site Developed by{" "}
                <Button asChild variant="link" className="p-0 h-auto text-xs sm:text-sm text-yellow-300 font-bold underline">
                  <Link href="https://anandverse.space" target="_blank" rel="noopener noreferrer">
                    AnandVerse Web Services
                  </Link>
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
