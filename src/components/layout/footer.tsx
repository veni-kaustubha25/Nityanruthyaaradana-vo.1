"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Youtube, 
  MapPin, 
  Clock
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "general");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettings);
        } else {
          setSettings({
            siteName: "Nithyanruthyaaradana",
            contactEmail: "info@nithyanruthyaaradana.art",
            contactPhone: "+91 123 456 7890",
            facebookUrl: "#",
            instagramUrl: "#",
            youtubeUrl: "#",
          });
        }
      } catch (error) {
        console.warn('Failed to fetch settings from Firebase, using fallback data:', error);
        setSettings({
          siteName: "Nithyanruthyaaradana",
          contactEmail: "info@nithyanruthyaaradana.art",
          contactPhone: "+91 123 456 7890",
          facebookUrl: "#",
          instagramUrl: "#",
          youtubeUrl: "#",
        });
      }
    };
    fetchSettings();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#8B0000] text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Nithyanruthyaaradana
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Preserving and promoting the timeless art of Indian classical dance for future generations.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a 
                href={settings?.facebookUrl || "#"} 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={settings?.instagramUrl || "#"} 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={settings?.youtubeUrl || "#"} 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/register", label: "Admissions" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href={`mailto:${settings?.contactEmail || 'info@nithyanruthyaaradana.art'}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {settings?.contactEmail || 'info@nithyanruthyaaradana.art'}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href={`tel:${settings?.contactPhone || '+91 123 456 7890'}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {settings?.contactPhone || '+91 123 456 7890'}
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>123 Dance Street,</p>
                  <p>Cultural District,</p>
                  <p>Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {currentYear} Nithyanruthyaaradana. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs">
              Site by AnandVerse Web Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}