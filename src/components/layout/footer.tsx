import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" aria-label="Back to homepage">
              <Logo />
            </Link>
            <p className="mt-4 max-w-md text-muted-foreground">
              Preserving and promoting the timeless art of Indian classical dance for future generations.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">Admissions</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <a href="mailto:info@nrityadarpan.art" className="hover:text-primary transition-colors">info@nrityadarpan.art</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 123 456 7890</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Link href="#" aria-label="Instagram"><Instagram className="text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="YouTube"><Youtube className="text-muted-foreground hover:text-primary transition-colors" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nritya Darpan. All rights reserved. Site by NITHYANRUTHYAARADANA.ART</p>
        </div>
      </div>
    </footer>
  );
}
