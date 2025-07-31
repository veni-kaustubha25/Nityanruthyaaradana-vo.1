
'use client';

import {
  Zap,
  BookOpen,
  Users,
  Award,
  Heart,
  MessageCircle,
  Feather,
  Star,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  StaggerContainer,
  StaggerItem,
  FadeIn,
  Slide,
} from '@/components/ui/professional-animations';
import { FallbackImage } from '@/components/ui/fallback-image';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LoadingAnimation } from '@/components/ui/loading-animation';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  hint: string;
}

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Authentic Curriculum',
    description:
      'Learn the traditional Pandanallur style of Bharatanatyam, preserved in its purest form.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Experienced Gurus',
    description:
      'Receive personalized instruction from acclaimed artists with decades of performance and teaching experience.',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Performance Opportunities',
    description:
      'Showcase your talent at our annual productions, prestigious festivals, and cultural events.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Holistic Development',
    description:
      'Our training goes beyond dance to instill discipline, confidence, and a deep appreciation for culture.',
  },
];

const classLevels = [
    {
        icon: <Feather className="h-10 w-10 text-primary" />,
        title: 'Beginner Level (Ages 5+)',
        description: 'Introduction to the fundamental adavus (steps), mudras (hand gestures), and basic theories of Bharatanatyam.',
        features: ['Strong Foundation', 'Rhythm & Posture', 'Cultural Stories']
    },
    {
        icon: <Star className="h-10 w-10 text-primary" />,
        title: 'Intermediate Level',
        description: 'Focus on more complex items, refining technique, and developing Abhinaya (expressional dance).',
        features: ['Advanced Adavus', 'Expressional Nuances', 'Solo Item Training']
    },
    {
        icon: <TrendingUp className="h-10 w-10 text-primary" />,
        title: 'Advanced & Pre-Arangetram',
        description: 'Intensive training for senior students, focusing on performance quality, stamina, and preparing for the debut performance (Arangetram).',
        features: ['Full Margam Repertoire', 'Choreography Skills', 'Performance Mastery']
    }
];

const testimonials: Array<{name: string, role: string, quote: string, avatar: string}> = [];

const faqs = [
  {
    question: 'What is the minimum age to enroll?',
    answer:
      'We welcome students from the age of 5. We believe in nurturing talent from a young age, providing a strong foundation in classical dance.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Our fees vary based on the level of the class (beginner, intermediate, advanced). Please contact us for detailed information on our fee structure and payment options.',
  },
  {
    question: 'Are there classes for adults?',
    answer:
      'Yes, we offer classes for adults of all ages and skill levels. It\'s never too late to start your journey in classical dance!',
  },
  {
    question: 'What should students wear to class?',
    answer:
      'Students are required to wear a traditional practice saree or a comfortable salwar kameez with a dupatta. This ensures comfort and adherence to the decorum of a classical dance class.',
  },
];

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('alt', 'desc'), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        'data-ai-hint': doc.data().hint || 'dance'
      })) as GalleryImage[];
      setGalleryImages(imagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gallery images: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-0">
          <FallbackImage
            src="https://placehold.co/1200x800.png"
            alt="Bharatanatyam dancer in a majestic pose"
            className="w-full h-full object-cover"
            priority
            data-ai-hint="bharatanatyam dance"
          />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
          <StaggerContainer>
            <StaggerItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white shadow-md">
                Experience the Divine Art of
                <br />
                <span className="text-primary">Bharatanatyam</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/90 shadow-sm">
                Join our academy to embark on a journey of discipline, grace,
                and cultural immersion. Preserve a timeless tradition with us.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/register">Enroll Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/50 backdrop-blur-sm hover:bg-white/20">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center">
              Why Choose Nithyanruthyaaradana?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              We provide an enriching environment that nurtures talent and fosters a deep love for classical Indian dance.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="text-center h-full bg-card/50 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Classes Section */}
        <section id="classes" className="py-20 sm:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center">
                        Explore Our Classes
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
                        Structured learning paths for every stage of your dance journey, from the first step to the grand performance.
                    </p>
                </FadeIn>
                <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {classLevels.map((level, index) => (
                        <StaggerItem key={index}>
                            <Card className="h-full bg-card/50 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <CardHeader className="items-center text-center">
                                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                        {level.icon}
                                    </div>
                                    <CardTitle className="mt-4 font-headline text-xl">{level.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-center">{level.description}</p>
                                    <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                        {level.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <Star className="h-4 w-4 text-primary/70" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/register">Join this Class</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>

      {/* A Glimpse of Our World Section */}
      <section className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center">A Glimpse of Our World</h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Moments of grace, dedication, and joy from our classes and performances.
            </p>
          </FadeIn>
          <div className="mt-16">
            {loading ? (
              <div className="flex justify-center">
                <LoadingAnimation />
              </div>
            ) : galleryImages.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <StaggerItem key={image.id}>
                    <div className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1 group">
                      <FallbackImage
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.hint}
                      />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <p className="text-center text-muted-foreground">The gallery is currently empty.</p>
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/gallery" className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                View Full Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center">
              Words From Our Community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Hear what our students and parents have to say about their experience at our academy.
            </p>
          </FadeIn>
          <div className="mt-16">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full bg-card/50">
                        <CardContent className="flex-grow p-6">
                          <MessageCircle className="h-8 w-8 text-primary/50 mb-4" />
                          <p className="text-muted-foreground">"{testimonial.quote}"</p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-4 bg-secondary/20 p-4">
                          <FallbackImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                            data-ai-hint="portrait person"
                          />
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
             {testimonials.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Testimonials from our community will be featured here soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Slide direction="right">
              <div>
                <h2 className="text-3xl sm:text-4xl font-headline font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl">
                  Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                </p>
                <Accordion type="single" collapsible className="w-full mt-8">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Slide>
            <Slide direction="left">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <FallbackImage
                  src="https://placehold.co/600x800.png"
                  alt="Dancer asking a question"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  data-ai-hint="dancer thinking"
                />
              </div>
            </Slide>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-r from-primary to-accent/80 rounded-lg p-12 text-center text-white">
              <Heart className="mx-auto h-12 w-12 mb-4" />
              <h2 className="text-3xl font-headline font-bold">
                Begin Your Dance Journey Today
              </h2>
              <p className="mt-4 max-w-2xl mx-auto">
                Whether you're a beginner or an experienced dancer, we have a place for you. Join our vibrant community and let your passion for dance flourish.
              </p>
              <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-gray-100">
                <Link href="/register">Start Your Application</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

    