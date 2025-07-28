import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-secondary -mx-8 -mt-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-headline">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Contact Form</CardTitle>
                  <CardDescription>Send us a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
                <h3 className="text-2xl font-bold font-headline">Our Information</h3>
                <p className="text-muted-foreground">Find us at our studio or contact us via email or phone.</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-accent text-accent-foreground p-3 rounded-full">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Our Studio</h4>
                            <p className="text-muted-foreground">123 Dance Avenue, Art City, 560001, India</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-accent text-accent-foreground p-3 rounded-full">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Email Us</h4>
                            <a href="mailto:info@nithyanruthyaaradana.art" className="text-muted-foreground hover:text-primary transition-colors">info@nithyanruthyaaradana.art</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-accent text-accent-foreground p-3 rounded-full">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Call Us</h4>
                            <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">+91 123 456 7890</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
