<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FadeIn, 
  Slide, 
  Scale, 
  StaggerContainer, 
  StaggerItem, 
  HoverAnimation, 
  TextAnimation,
  PageTransition 
} from "@/components/ui/professional-animations";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@nithyanruthyaaradana.art",
    link: "mailto:info@nithyanruthyaaradana.art"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 123 456 7890",
    link: "tel:+911234567890"
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Dance Street, Cultural District, Chennai, Tamil Nadu 600001"
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Monday - Saturday: 8:00 AM - 8:00 PM"
  }
];

export default function ContactPage() {
  return (
    <PageTransition>
      <div>
        {/* Page Header */}
        <section className="py-12 sm:py-16 text-center bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
                Get in touch with us to learn more about our programs or to schedule a visit to our academy.
              </p>
            </TextAnimation>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form */}
              <div>
                <TextAnimation type="slide" direction="left" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Send us a Message</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Have questions about our programs or want to schedule a visit? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </TextAnimation>
                <HoverAnimation effect="lift" tapEffect="scale">
                  <Card className="bg-card/80">
                    <CardContent className="p-4 sm:p-6">
                      <ContactForm />
                    </CardContent>
                  </Card>
                </HoverAnimation>
              </div>

              {/* Contact Information */}
              <div>
                <TextAnimation type="slide" direction="right" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Get in Touch</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    We're here to help you on your dance journey. Reach out to us through any of the following channels.
                  </p>
                </TextAnimation>

                <StaggerContainer className="space-y-4 sm:space-y-6" delay={0.6}>
                  {contactInfo.map((info, index) => (
                    <StaggerItem key={index} animation="slide" direction="up">
                      <HoverAnimation effect="lift" tapEffect="scale">
                        <Card className="bg-card/80">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                                <info.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-base sm:text-lg mb-1">{info.title}</h3>
                                {info.link ? (
                                  <a 
                                    href={info.link} 
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base leading-relaxed"
                                  >
                                    {info.content}
                                  </a>
                                ) : (
                                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{info.content}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </HoverAnimation>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
=======
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-background -mx-8 -mt-8">
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
              <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2">
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
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
  );
}
