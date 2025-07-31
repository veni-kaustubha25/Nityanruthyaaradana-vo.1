
"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import {
  FadeIn,
  Slide,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/professional-animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FallbackImage } from "@/components/ui/fallback-image";

const contactDetails = [
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: "Email Us",
    value: "info@nithyanruthyaaradana.art",
    href: "mailto:info@nithyanruthyaaradana.art",
  },
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: "Call Us",
    value: "+91 123 456 7890",
    href: "tel:+911234567890",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Visit Us",
    value: "Bengaluru, Karnataka, India",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-secondary/50 to-secondary/20">
         <div className="absolute inset-0 z-0 opacity-20">
            <FallbackImage
                src="https://placehold.co/1200x400.png"
                alt="Abstract background texture"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="abstract texture"
            />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-center text-foreground">
              Get In Touch
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-center text-lg sm:text-xl text-muted-foreground">
              We're here to answer any questions you may have. Reach out to us
              and we'll respond as soon as we can.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <Slide direction="right">
              <div>
                <h2 className="text-3xl font-headline font-bold mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Find us at our studio, give us a call, or send us an email.
                  We look forward to hearing from you.
                </p>
                <StaggerContainer className="space-y-6">
                  {contactDetails.map((item, index) => (
                    <StaggerItem key={index}>
                      <a href={item.href} className="flex items-center gap-4 group">
                        <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary/20 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-muted-foreground group-hover:text-primary transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Slide>

            {/* Contact Form */}
            <Slide direction="left">
              <Card className="p-8 shadow-lg bg-card/50">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-headline">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ContactForm />
                </CardContent>
              </Card>
            </Slide>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-12">
              Our Location
            </h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-border">
              <div className="bg-muted flex items-center justify-center">
                 <p className="text-muted-foreground">Interactive map coming soon.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
