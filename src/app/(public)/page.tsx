
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
  Image as ImageIcon,
  Check,
  Calendar,
  Smile,
  Brain,
  Sprout
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
import { format } from 'date-fns';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  hint: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface ClassLevel {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    avatar: string;
}

interface Faq {
    id: string;
    question: string;
    answer: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
}

interface WhyItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}


const ICONS: { [key: string]: React.ReactNode } = {
    Zap: <Zap className="h-10 w-10 text-primary" />,
    BookOpen: <BookOpen className="h-10 w-10 text-primary" />,
    Users: <Users className="h-10 w-10 text-primary" />,
    Award: <Award className="h-10 w-10 text-primary" />,
    Feather: <Feather className="h-10 w-10 text-primary" />,
    Star: <Star className="h-10 w-10 text-primary" />,
    TrendingUp: <TrendingUp className="h-10 w-10 text-primary" />,
    Smile: <Smile className="h-10 w-10 text-primary" />,
    Brain: <Brain className="h-10 w-10 text-primary" />,
    Sprout: <Sprout className="h-10 w-10 text-primary" />,
    Default: <Star className="h-10 w-10 text-primary" />,
};

const getIcon = (name: string) => ICONS[name] || ICONS.Default;

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [classLevels, setClassLevels] = useState<ClassLevel[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [whyItems, setWhyItems] = useState<WhyItem[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleError = (collectionName: string) => (error: Error) => {
        console.error(`Error fetching ${collectionName}: `, error);
    };

    const unsubscribes = [
        onSnapshot(query(collection(db, 'gallery'), orderBy('alt', 'desc'), limit(4)), (snapshot) => {
            setGalleryImages(snapshot.docs.map(doc => ({ id: doc.id, 'data-ai-hint': doc.data().hint || 'dance', ...doc.data() } as GalleryImage)));
        }, handleError('gallery')),

        onSnapshot(query(collection(db, 'features'), orderBy('title', 'asc')), (snapshot) => {
            setFeatures(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feature)));
        }, handleError('features')),

        onSnapshot(query(collection(db, 'classLevels'), orderBy('title', 'asc')), (snapshot) => {
            setClassLevels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClassLevel)));
        }, handleError('classLevels')),
        
        onSnapshot(query(collection(db, 'testimonials'), orderBy('name', 'asc')), (snapshot) => {
            setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
        }, handleError('testimonials')),

        onSnapshot(query(collection(db, 'faqs'), orderBy('question', 'asc')), (snapshot) => {
            setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Faq)));
        }, handleError('faqs')),

        onSnapshot(query(collection(db, 'events'), orderBy('date', 'desc')), (snapshot) => {
            setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event)));
        }, handleError('events')),

        onSnapshot(query(collection(db, 'whyBharatanatyam'), orderBy('title', 'asc')), (snapshot) => {
            setWhyItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WhyItem)));
        }, handleError('whyBharatanatyam')),
    ];
    
    // A bit of a hack to set loading to false after a short delay
    // to ensure all snapshots have a chance to load.
    setTimeout(() => setLoading(false), 1500);

    return () => {
        unsubscribes.forEach(unsub => unsub());
    };
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
          {loading ? <div className="flex justify-center mt-16"><LoadingAnimation /></div> : (
          <StaggerContainer className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.id}>
                <Card className="text-center h-full bg-card/50 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {getIcon(feature.icon)}
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
          )}
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
                 {loading ? <div className="flex justify-center mt-16"><LoadingAnimation /></div> : (
                <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {classLevels.map((level) => (
                        <StaggerItem key={level.id}>
                            <Card className="h-full bg-card/50 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <CardHeader className="items-center text-center">
                                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                        {getIcon(level.icon)}
                                    </div>
                                    <CardTitle className="mt-4 font-headline text-xl">{level.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-center">{level.description}</p>
                                    <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                        {level.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <Check className="h-4 w-4 text-primary/70" />
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
                 )}
            </div>
        </section>

    {/* Why Bharatanatyam? Section */}
    <section className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Slide direction="right">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                    <FallbackImage
                    src="https://placehold.co/600x800.png"
                    alt="Graceful dance pose"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                    data-ai-hint="graceful dance"
                    />
                </div>
            </Slide>
            <Slide direction="left">
              <div>
                <h2 className="text-3xl sm:text-4xl font-headline font-bold">
                  The Art and Soul of Bharatanatyam
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl">
                    More than just a dance form, Bharatanatyam is a holistic discipline that enriches the mind, body, and spirit.
                </p>
                {loading ? <div className="flex mt-8"><LoadingAnimation /></div> : (
                <div className="mt-8 space-y-6">
                  {whyItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full mt-1">
                              {getIcon(item.icon)}
                          </div>
                          <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <p className="text-muted-foreground">{item.description}</p>
                          </div>
                      </div>
                  ))}
                </div>
                )}
              </div>
            </Slide>
          </div>
        </div>
      </section>

      {/* A Glimpse of Our World Section */}
      <section className="py-20 sm:py-24">
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
              <p className="text-center text-muted-foreground">The gallery is currently being curated.</p>
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

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 sm:py-24 bg-secondary/20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center">Upcoming Events</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
                      Join us for our upcoming performances and workshops. Witness the magic of classical dance unfold.
                  </p>
              </FadeIn>
              <div className="mt-16">
                  {loading ? <div className="flex justify-center"><LoadingAnimation /></div> : events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {events.map((event) => (
                          <Card key={event.id} className="overflow-hidden bg-card/50 hover:shadow-xl transition-shadow duration-300">
                              <FallbackImage src={event.image} alt={event.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="stage performance" />
                              <CardHeader>
                                  <CardTitle className="text-xl font-headline">{event.title}</CardTitle>
                                  <p className="text-sm text-muted-foreground flex items-center gap-2 pt-1">
                                      <Calendar className="h-4 w-4" />
                                      {format(new Date(event.date), "PPP")}
                                  </p>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground text-sm">{event.description}</p>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
                  ) : (
                      <div className="text-center py-12 text-muted-foreground">
                          <p>No upcoming events at the moment. Please check back soon!</p>
                      </div>
                  )}
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
             {loading ? <div className="flex justify-center"><LoadingAnimation /></div> : testimonials.length > 0 ? (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
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
             ) : (
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
                {loading ? <div className="flex justify-center mt-8"><LoadingAnimation /></div> : (
                <Accordion type="single" collapsible className="w-full mt-8">
                  {faqs.map((faq) => (
                    <AccordionItem value={faq.id} key={faq.id}>
                      <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                )}
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

    