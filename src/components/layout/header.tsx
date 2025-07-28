"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/gallery", label: "Gallery" },
  { href: "/register", label: "Admissions" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Back to homepage">
          <Logo />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname.startsWith(link.href) && link.href !== "/" || pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="mt-8 flex justify-center">
                 <Link href="/" aria-label="Back to homepage">
                    <Logo />
                </Link>
              </div>
              <nav className="mt-8 flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <SheetTrigger asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                          "text-xl font-medium transition-colors hover:text-primary",
                          pathname.startsWith(link.href) && link.href !== "/" || pathname === link.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetTrigger>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
