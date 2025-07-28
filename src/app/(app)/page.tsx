import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const heroContent = {
  headline: "Experience the Divine Art of Bharatanatyam",
  subheadline: "Join our classes to explore the rich heritage of Indian classical dance, guided by experienced masters in a vibrant and supportive community.",
  cta: "Enroll Now",
  image: {
    src: "https://placehold.co/1200x800.png",
    alt: "Lead dancer in a dramatic Bharatanatyam pose on stage",
    hint: "bharatanatyam dance performance"
  }
};

const testimonials = [
    {
      quote: "The teaching methodology is simply outstanding. My daughter has not only learned the dance form but also the cultural values associated with it.",
      author: "Priya S., Parent",
      stars: 5,
    },
    {
      quote: "A truly immersive experience. The instructors are passionate and dedicated, making every class a joy to attend. I've grown so much as a dancer here.",
      author: "Ananya K., Student",
      stars: 5,
    },
    {
      quote: "Nithyanruthyaaradana has a wonderful, welcoming atmosphere. It feels like a second home. The attention to detail in every aspect of training is commendable.",
      author: "Rohan M., Student",
      stars: 5,
    },
];

const faqs = [
    {
      question: "What is the minimum age to enroll?",
      answer: "We welcome students from the age of 5. We believe in nurturing talent from a young age, providing a strong foundation in Bharatanatyam.",
    },
    {
      question: "Do you provide costumes for performances?",
      answer: "Yes, for our annual showcases and major events, the institution arranges for professionally designed costumes. For regular classes, a specific dress code is to be followed.",
    },
    {
      question: "Are there different batches for different skill levels?",
      answer: "Absolutely. We have structured courses for Beginners, Intermediate, and Advanced learners. Students are assessed and placed in the appropriate batch to ensure personalized attention and growth.",
    },
    {
        question: "How often are classes held?",
        answer: "Classes are typically held twice a week. We offer both weekday and weekend batches to accommodate different schedules. Detailed schedules are available on our Courses page."
    }
];

export default function HomePage() {
  return (
    <div className="flex flex-col -mx-8 -mt-8">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          data-ai-hint={heroContent.image.hint}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">{heroContent.headline}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">{heroContent.subheadline}</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/register">{heroContent.cta} <ArrowRight className="ml-2"/></Link>
          </Button>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold font-headline mb-4">Welcome to Nithyanruthyaaradana</h2>
                    <p className="text-muted-foreground mb-4">
                        We are a premier institution dedicated to the preservation and promotion of Bharatanatyam, one of the oldest and most revered classical dance forms of India. Our mission is to impart authentic training and foster a deep appreciation for this divine art.
                    </p>
                    <p className="text-muted-foreground mb-6">
                        Founded by renowned artists, our academy offers a nurturing environment where students of all ages can embark on a journey of artistic discovery, discipline, and self-expression.
                    </p>
                    <Button asChild variant="outline">
                        <Link href="/about">Learn More About Us</Link>
                    </Button>
                </div>
                <div className="order-1 md:order-2">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Founder of the dance academy"
                        data-ai-hint="indian woman dancer"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center font-headline mb-12">What Our Community Says</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="pt-6 flex-grow flex flex-col justify-between">
                        <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                        <div>
                            <div className="flex items-center mb-2">
                                {Array.from({ length: testimonial.stars }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                                ))}
                            </div>
                            <p className="font-semibold">{testimonial.author}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

       {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
