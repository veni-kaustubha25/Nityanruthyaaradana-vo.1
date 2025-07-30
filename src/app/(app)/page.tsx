<<<<<<< HEAD
'use client';

=======
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
<<<<<<< HEAD
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
import { FallbackImage } from "@/components/ui/fallback-image";
import { ImageModal } from "@/components/ui/image-modal";
import Link from "next/link";
import { ArrowRight, Star, Award, Users, Theater, Maximize2 } from "lucide-react";
import { replaceUnsplashUrl, getFallbackUrls } from "@/lib/image-utils";
import { useState } from "react";
=======
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Award, Users, Theater } from "lucide-react";
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6

const heroContent = {
  headline: "Experience the Divine Art of Bharatanatyam",
  subheadline: "Join our classes to explore the rich heritage of Indian classical dance, guided by experienced masters in a vibrant and supportive community.",
  cta: "Enroll Now",
  image: {
<<<<<<< HEAD
    src: "/images/1.jpg",
    alt: "Traditional Indian dance performance featuring Krishna and Radha with elaborate costumes, golden crowns, and vibrant LED lighting creating a festive atmosphere",
    hint: "traditional indian dance performance krishna radha elaborate costumes"
=======
    src: "https://placehold.co/1200x800.png",
    alt: "Lead dancer in a dramatic Bharatanatyam pose on stage",
    hint: "bharatanatyam dance performance"
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
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

<<<<<<< HEAD


const gallerySnippetsData = [
  { originalSrc: "https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=800&fit=crop&crop=center", category: "performance", alt: "Bharatanatyam dancer in an expressive pose, close-up.", hint: "bharatanatyam expression" },
  { originalSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", category: "groupPractice", alt: "A group of students practicing Bharatanatyam in the studio.", hint: "dance practice studio" },
  { originalSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", category: "events", alt: "A live orchestra accompanying a Bharatanatyam performance.", hint: "live music dance" },
  { originalSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop&crop=center", category: "performance", alt: "Portrait of a Bharatanatyam dancer with traditional makeup.", hint: "dancer portrait makeup" },
];

=======
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


>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
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
<<<<<<< HEAD
      answer: "Absolutely. We have structured programs for Beginners, Intermediate, and Advanced learners. Students are assessed and placed in the appropriate batch to ensure personalized attention and growth.",
    },
    {
        question: "How often are classes held?",
        answer: "Classes are typically held twice a week. We offer both weekday and weekend batches to accommodate different schedules. Detailed schedules are available upon registration."
=======
      answer: "Absolutely. We have structured courses for Beginners, Intermediate, and Advanced learners. Students are assessed and placed in the appropriate batch to ensure personalized attention and growth.",
    },
    {
        question: "How often are classes held?",
        answer: "Classes are typically held twice a week. We offer both weekday and weekend batches to accommodate different schedules. Detailed schedules are available on our Courses page."
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
    }
];

export default function HomePage() {
<<<<<<< HEAD
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Create gallerySnippets array inside component to ensure reactivity
  const gallerySnippets = gallerySnippetsData.map(item => {
    const processedSrc = replaceUnsplashUrl(item.originalSrc || 'https://images.unsplash.com/photo-1547153760-180fc612c570', item.category as any);
    return {
      src: processedSrc || 'https://picsum.photos/600/400?random=1',
      alt: item.alt || 'Dance performance image',
      hint: item.hint || ''
    };
  });

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Image Modal */}
        <ImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          images={gallerySnippets}
          initialIndex={selectedImageIndex}
        />
        {/* Hero Section - Simplified */}
        <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <FallbackImage
              src={heroContent.image.src}
              alt={heroContent.image.alt}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold drop-shadow-lg leading-tight">
                {heroContent.headline}
              </h1>
            </TextAnimation>
            <TextAnimation type="slide" direction="up" delay={0.4}>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                {heroContent.subheadline}
              </p>
            </TextAnimation>
            <Scale delay={0.6}>
              <Button asChild size="lg" className="mt-6 sm:mt-8 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/register">{heroContent.cta} <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/></Link>
              </Button>
            </Scale>
          </div>
        </section>

        {/* About Us Snippet */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                      <TextAnimation type="slide" direction="left" delay={0.2}>
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Welcome to Nithyanruthyaaradana</h2>
                      </TextAnimation>
                      <TextAnimation type="fade" delay={0.4}>
                          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                              We are a premier institution dedicated to the preservation and promotion of Bharatanatyam, one of the oldest and most revered classical dance forms of India. Our mission is to impart authentic training and foster a deep appreciation for this divine art.
                          </p>
                      </TextAnimation>
                      <TextAnimation type="fade" delay={0.6}>
                          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                              Founded by renowned artists, our academy offers a nurturing environment where students of all ages can embark on a journey of artistic discovery, discipline, and self-expression.
                          </p>
                      </TextAnimation>
                      <Scale delay={0.8}>
                          <Button asChild variant="outline" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                              <Link href="/about">Learn More About Us</Link>
                          </Button>
                      </Scale>
                  </div>
                  <div className="order-1 lg:order-2">
                      <div className="relative rounded-lg shadow-lg overflow-hidden">
                        <FallbackImage
                          src={replaceUnsplashUrl("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", "groupPractice")}
                          alt="Founder of the dance academy teaching Bharatanatyam"
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                      </div>
                  </div>
              </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <TextAnimation type="slide" direction="up" delay={0.2}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline">Why Choose Us?</h2>
              </TextAnimation>
              <TextAnimation type="fade" delay={0.4}>
                <p className="mt-2 sm:mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  Discover the unique qualities that make our academy the perfect place to nurture your passion for dance.
                </p>
              </TextAnimation>
            </div>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" delay={0.6}>
              {features.map((feature, index) => (
                <StaggerItem key={index} animation="slide" direction="up">
                  <HoverAnimation effect="lift" tapEffect="scale">
                    <Card className="text-center bg-card/80 h-full p-4 sm:p-6">
                      <CardHeader className="pb-4">
                          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center">
                              <feature.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                          </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <CardTitle className="text-lg sm:text-xl font-headline mb-2">{feature.title}</CardTitle>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </HoverAnimation>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>



        {/* Gallery Snippet Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                  <TextAnimation type="slide" direction="up" delay={0.2}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                      Moments in Motion
                    </h2>
                  </TextAnimation>
                  <TextAnimation type="slide" direction="up" delay={0.4}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mt-2 mb-4">
                      Capturing the Art of Bharatanatyam
                    </h3>
                  </TextAnimation>
                  <TextAnimation type="fade" delay={0.6}>
                    <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      A visual journey through the vibrant life, culture, and performances at our academy. Each image tells a story of dedication, passion, and the timeless beauty of classical dance.
                    </p>
                  </TextAnimation>
              </div>

              {/* Professional Collage Frame */}
              <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
                <StaggerItem animation="scale">
                  <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-6 sm:p-8 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      {/* Top Left - Large */}
                      <div className="row-span-2">
                        <HoverAnimation effect="lift" tapEffect="scale">
                          <div 
                            className="group relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1 cursor-pointer"
                            onClick={() => handleImageClick(0)}
                          >
                            <div className="relative overflow-hidden rounded-xl">
                              <FallbackImage
                                src={replaceUnsplashUrl("https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=800&fit=crop&crop=center", "performance")}
                                alt="Bharatanatyam dancer in dramatic pose on stage"
                                width={600}
                                height={800}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-white font-semibold text-sm sm:text-base">Stage Performance</h5>
                                    <Maximize2 className="h-4 w-4 text-white/80" />
                                  </div>
                                  <p className="text-white/80 text-xs sm:text-sm">Dramatic pose showcasing grace</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </HoverAnimation>
                      </div>

                      {/* Top Right */}
                      <div>
                        <HoverAnimation effect="lift" tapEffect="scale">
                          <div 
                            className="group relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1 cursor-pointer"
                            onClick={() => handleImageClick(1)}
                          >
                            <div className="relative overflow-hidden rounded-xl">
                              <FallbackImage
                                src={replaceUnsplashUrl("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", "groupPractice")}
                                alt="Group practice session in the studio"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-white font-semibold text-xs sm:text-sm">Group Practice</h5>
                                    <Maximize2 className="h-3 w-3 text-white/80" />
                                  </div>
                                  <p className="text-white/80 text-xs">Learning together</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </HoverAnimation>
                      </div>

                      {/* Bottom Right */}
                      <div>
                        <HoverAnimation effect="lift" tapEffect="scale">
                          <div 
                            className="group relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1 cursor-pointer"
                            onClick={() => handleImageClick(2)}
                          >
                            <div className="relative overflow-hidden rounded-xl">
                              <FallbackImage
                                src={replaceUnsplashUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", "events")}
                                alt="Traditional music accompaniment during performances"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-white font-semibold text-xs sm:text-sm">Live Music</h5>
                                    <Maximize2 className="h-3 w-3 text-white/80" />
                                  </div>
                                  <p className="text-white/80 text-xs">Traditional accompaniment</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </HoverAnimation>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full opacity-60"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full opacity-60"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60"></div>
                  </div>
                </StaggerItem>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <Scale delay={1.0}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      <Link href="/gallery">Explore Full Gallery</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                      <Link href="/register">Join Our Community</Link>
                    </Button>
                  </div>
                </Scale>
              </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center font-headline mb-8 sm:mb-12">What Our Community Says</h2>
            </TextAnimation>
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
                        <HoverAnimation effect="lift" tapEffect="scale">
                          <Card className="h-full flex flex-col bg-card/80">
                            <CardContent className="pt-6 flex-grow flex flex-col justify-between">
                              <p className="text-muted-foreground italic mb-4 text-sm sm:text-base leading-relaxed">"{testimonial.quote}"</p>
                              <div>
                                  <div className="flex items-center mb-2">
                                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
                                      ))}
                                  </div>
                                  <p className="font-semibold text-sm sm:text-base">{testimonial.author}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </HoverAnimation>
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
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-6 sm:mb-8">Frequently Asked Questions</h2>
            </TextAnimation>
            <StaggerContainer className="w-full" delay={0.4}>
              {faqs.map((faq, index) => (
                <StaggerItem key={index} animation="slide" direction="up">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${index + 1}`}>
                      <AccordionTrigger className="text-base sm:text-lg text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </div>
    </PageTransition>
=======
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
          <Button asChild size="lg" className="mt-8 transform transition-transform duration-300 hover:scale-105">
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
                    <Button asChild variant="outline" className="transform transition-transform duration-300 hover:scale-105">
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
                        className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Why Choose Us?</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Discover the unique qualities that make our academy the perfect place to nurture your passion for dance.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-card/80 transform transition-transform duration-300 hover:-translate-y-2">
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
                    <Card key={course.title} className="overflow-hidden shadow-lg flex flex-col bg-card/80 transform transition-transform duration-300 hover:-translate-y-2">
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
                <Button asChild size="lg" className="transform transition-transform duration-300 hover:scale-105">
                    <Link href="/courses">View All Courses</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Gallery Snippet Section */}
      <section className="py-16 lg:py-24 bg-background">
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
                <Button asChild size="lg" variant="outline" className="transform transition-transform duration-300 hover:scale-105">
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
                    <Card className="h-full flex flex-col bg-card/80 transform transition-transform duration-300 hover:-translate-y-2">
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
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
  );
}
