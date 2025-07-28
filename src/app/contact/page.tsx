import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div>
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        We would love to hear from you. Whether you have a question about our classes or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="font-headline text-3xl font-bold mb-4">Get in Touch</h2>
                            <p className="mb-8 text-muted-foreground">
                                Reach out to us via phone, email, or by visiting our institute. You can also use the form to send us a direct message.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Address</h3>
                                        <p className="text-muted-foreground">123 Natyanjali Road, Cultural District,<br /> Bangalore, Karnataka 560001, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Us</h3>
                                        <a href="mailto:info@nrityadarpan.art" className="text-muted-foreground hover:text-primary transition-colors">info@nrityadarpan.art</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Call Us</h3>
                                        <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">+91 123 456 7890</a>
                                    </div>
                                </div>
                            </div>
                             <div className="mt-8 rounded-lg bg-muted h-64 w-full flex items-center justify-center">
                                <p className="text-muted-foreground">Map Placeholder</p>
                             </div>
                        </div>

                        <div className="lg:col-span-3">
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Send an Inquiry</CardTitle>
                                    <CardDescription>Have a question? Fill out the form below.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
