<<<<<<< HEAD
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nithyanruthyaaradana - Bharatanatyam Academy",
  description: "Premier institution dedicated to the preservation and promotion of Bharatanatyam, one of the oldest and most revered classical dance forms of India.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
=======
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from '@/components/page-transition';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
        className="flex min-h-screen flex-col bg-background" 
    >
        <Header />
        <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <Toaster />
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
    </div>
  );
}
