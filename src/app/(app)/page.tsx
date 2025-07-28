import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Award, Users, Theater } from "lucide-react";

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

const features = [
    {
        icon: Award,
        title: "Authentic Training",
        description: "Learn from gurus dedicated to preserving the traditional guru-shishya parampara and the purity of the art form."
    },
    {
        icon: Users,
        title: "Vibrant Community",
        description: "Become part of a supportive family of artists who share a passion for dance, culture, and personal growth."
    },
    {
        icon: Theater,
        title: "Performance Opportunities",
        description: "Showcase your talent on stage through our regular recitals, annual productions, and prestigious events."
    }
];

const courseSnippets = [
  {
    level: "Beginner",
    title: "Foundations of Bharatanatyam",
    description: "An introductory course covering the fundamental postures, hand gestures, and basic steps.",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Young students learning basic dance postures.",
      hint: "beginner dance class"
    },
  },
  {
    level: "Intermediate",
    title: "Developing Artistry",
    description: "Builds upon foundational skills, introducing more complex sequences and expressive elements.",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Dancer performing a complex sequence.",
      hint: "expressive dance"
    },
  },
  {
    level: "Advanced",
    title: "Mastery and Performance",
    description: "Designed for dedicated students aiming for proficiency and performance skills.",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "A senior dancer in full costume.",
      hint: "professional classical dancer"
    },
  }
];

const gallerySnippets = [
  { src: "https://placehold.co/600x800.png", alt: "Dancer in an expressive pose, close-up.", hint: "bharatanatyam expression" },
  { src: "https://placehold.co/600x400.png", alt: "A group of students practicing in the studio.", hint: "dance practice studio" },
  { src: "https://placehold.co/600x400.png", alt: "A live orchestra accompanying a dance performance.", hint: "live music dance" },
  { src: "https://placehold.co/600x800.png", alt: "Portrait of a dancer with traditional makeup.", hint: "dancer portrait makeup" },
];


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

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Why Choose Us?</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Discover the unique qualities that make our academy the perfect place to nurture your passion for dance.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-card/80">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                        <feature.icon className="h-8 w-8" />
                    </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-headline mb-2">{feature.title}</CardTitle>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Courses Snippet Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Our Structured Curriculum</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                From fundamental steps to advanced performance, our courses are designed for every stage of a dancer's journey.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courseSnippets.map((course) => (
                    <Card key={course.title} className="overflow-hidden shadow-lg flex flex-col bg-card/80">
                         <div className="relative h-48">
                            <Image
                            src={course.image.src}
                            alt={course.image.alt}
                            data-ai-hint={course.image.hint}
                            fill
                            className="object-cover"
                            />
                        </div>
                        <CardHeader>
                            <p className="text-sm font-semibold text-accent">{course.level}</p>
                            <CardTitle className="text-xl font-headline">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{course.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" asChild className="p-0">
                                <Link href="/courses">Learn more <ArrowRight className="ml-2"/></Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/courses">View All Courses</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Gallery Snippet Section */}
      <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Moments in Motion</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">A glimpse into the vibrant life and culture at our academy.</p>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallerySnippets.map((item, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-lg shadow-lg ${index === 0 || index === 3 ? 'row-span-2' : ''}`}>
                        <Image
                            src={item.src}
                            alt={item.alt}
                            data-ai-hint={item.hint}
                            width={600}
                            height={item.src.includes('x800') ? 800 : 400}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/gallery">Explore Full Gallery</Link>
                </Button>
            </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-background">
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
                    <Card className="h-full flex flex-col bg-card/80">
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
      <section className="py-16 lg:py-24 bg-secondary">
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
