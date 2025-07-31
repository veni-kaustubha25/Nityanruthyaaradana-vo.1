'use client';

import {
  User,
  Zap,
  Heart,
  BookOpen,
  Users,
  Award,
  Calendar,
  Sun,
  Moon,
  Star,
} from 'lucide-react';
import {
  FadeIn,
  Slide,
  Scale,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/professional-animations';
import { FallbackImage } from '@/components/ui/fallback-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const founder = {
  name: 'Guru Smt. Nithya',
  title: 'Founder & Artistic Director',
  bio: [
    'Guru Smt. Nithya is a distinguished Bharatanatyam artist, choreographer, and educator with over two decades of experience. Her journey in dance began at the tender age of five, and she has since blossomed into a visionary artist known for her profound understanding of the art form and her innovative choreographic work.',
    "Having trained under legendary gurus, Smt. Nithya has imbibed the purest form of the Pandanallur style of Bharatanatyam. She has performed on prestigious stages across the globe, earning accolades for her technical brilliance and emotive storytelling. Her passion for dance extends beyond performance to nurturing the next generation of artists, instilling in them a deep respect for tradition while encouraging their individual creativity.",
  ],
  image: 'https://placehold.co/800x800.png',
};

const principles = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Authenticity',
    description:
      'We are committed to preserving and teaching the traditional Pandanallur style of Bharatanatyam in its purest form.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Passion',
    description:
      'Our love for dance fuels our dedication to excellence and inspires our students to discover their own artistic voices.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community',
    description:
      'We foster a supportive and inclusive environment where students can grow, collaborate, and form lifelong friendships.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Excellence',
    description:
      'We strive for the highest standards in teaching, performance, and personal discipline, encouraging students to reach their full potential.',
  },
];

const journey = [
  {
    year: '2005',
    event: 'Academy Founded',
    description:
      'Nithyanruthyaaradana was established with a mission to propagate the rich heritage of Bharatanatyam.',
    icon: <Star className="h-6 w-6 text-primary" />,
  },
  {
    year: '2010',
    event: 'First Annual Production',
    description:
      'Our students presented their first full-length dance drama, which became a celebrated annual tradition.',
    icon: <Calendar className="h-6 w-6 text-primary" />,
  },
  {
    year: '2015',
    event: 'International Tour',
    description:
      'The senior ensemble embarked on a successful tour of Europe, showcasing Indian culture to a global audience.',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    year: '2020',
    event: 'Digital Expansion',
    description:
      'Launched online classes to continue spreading the joy of dance during the pandemic, reaching students worldwide.',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    year: 'Present',
    event: 'A Thriving Community',
    description:
      "Today, we are a vibrant community of over 200 students, continuing to grow and share our passion for dance.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];

const galleryImages: Array<{ src: string; alt: string; 'data-ai-hint': string }> = [];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 z-0">
         <FallbackImage
            src="https://placehold.co/1200x800.png"
            alt="Nithyanruthyaaradana academy background"
            className="w-full h-full object-cover"
            data-ai-hint="dance studio"
          />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-center text-white">
              Our Story, Our Passion
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-center text-lg sm:text-xl text-white/90">
              Discover the journey, philosophy, and the guiding force behind
              Nithyanruthyaaradana Dance Academy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <StaggerItem className="lg:col-span-2">
                <Scale>
                  <div className="relative aspect-square">
                    <FallbackImage
                      src={founder.image}
                      alt={founder.name}
                      width={800}
                      height={800}
                      className="rounded-full object-cover border-8 border-primary/20 shadow-2xl"
                      data-ai-hint="founder portrait"
                    />
                  </div>
                </Scale>
              </StaggerItem>
              <StaggerItem className="lg:col-span-3">
                <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
                  {founder.name}
                </h2>
                <p className="mt-2 text-xl font-medium text-muted-foreground">
                  {founder.title}
                </p>
                <div className="mt-6 space-y-4 text-foreground/80">
                  {founder.bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-12">
              Our Guiding Principles
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <StaggerItem key={index}>
                <Card className="h-full text-center bg-card/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {principle.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline text-xl">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-16">
              Our Journey Through Time
            </h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>
            <StaggerContainer className="space-y-16">
              {journey.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center w-full">
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                      }`}
                    >
                      <p className="text-xl font-headline font-bold text-primary">
                        {item.year}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        {item.event}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative w-12 h-12 flex-shrink-0 bg-background border-4 border-primary rounded-full flex items-center justify-center z-10">
                      {item.icon}
                    </div>
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'
                      }`}
                    >
                      {/* This space is intentionally left blank for timeline alignment */}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Mini Gallery Section */}
      <section className="py-20 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-12">
              A Glimpse Into Our World
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <StaggerItem key={index}>
                <Scale>
                  <div className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                     <FallbackImage
                        {...image}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                  </div>
                </Scale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
