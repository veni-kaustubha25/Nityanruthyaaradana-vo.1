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
import { FallbackImage } from "@/components/ui/fallback-image";
import Link from "next/link";
import { ArrowRight, Award, Users, Theater, Heart, Star, GraduationCap, Music } from "lucide-react";
import { replaceUnsplashUrl } from "@/lib/image-utils";

const philosophy = [
  {
    icon: Heart,
    title: "Preservation",
    description: "We are committed to preserving the authentic traditions and techniques of Bharatanatyam, ensuring that this ancient art form continues to thrive for future generations."
  },
  {
    icon: Users,
    title: "Community",
    description: "Our academy fosters a supportive community where students of all ages and backgrounds can learn, grow, and celebrate the rich cultural heritage of Indian classical dance."
  },
  {
    icon: Theater,
    title: "Excellence",
    description: "We strive for excellence in every aspect of training, from fundamental techniques to advanced performance skills, maintaining the highest standards of artistic integrity."
  },
  {
    icon: Award,
    title: "Innovation",
    description: "While honoring tradition, we embrace innovative teaching methods and contemporary approaches to make classical dance accessible and engaging for modern learners."
  }
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div>
        {/* Page Header */}
        <section className="py-12 sm:py-16 text-center bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">About Us</h1>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
                Discover the story behind our academy and our commitment to preserving the divine art of Bharatanatyam.
              </p>
            </TextAnimation>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
              <div>
                <TextAnimation type="slide" direction="left" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Our Story</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                    Founded with a deep reverence for the ancient traditions of Bharatanatyam, our academy emerged from a vision to create a nurturing space where the divine art form could flourish. Our journey began with a simple yet profound mission: to preserve and promote the authentic essence of this classical dance form while making it accessible to passionate learners of all ages.
                  </p>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.6}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Over the years, we have grown into a vibrant community of artists, students, and enthusiasts who share a common love for the rich cultural heritage of India. Our academy has become a beacon of artistic excellence, where traditional values meet contemporary learning approaches.
                  </p>
                </TextAnimation>
                <Scale delay={0.8}>
                  <Button asChild variant="outline" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                    <Link href="/register">Join Our Academy</Link>
                  </Button>
                </Scale>
              </div>
              <div>
                <HoverAnimation effect="lift" tapEffect="scale">
                  <FallbackImage
                    src={replaceUnsplashUrl("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", "teacher")}
                    alt="Founder of the dance academy teaching Bharatanatyam"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </HoverAnimation>
              </div>
            </div>

            {/* Founder & Teacher Section */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
              <div className="order-2 lg:order-1">
                <HoverAnimation effect="lift" tapEffect="scale">
                  <div className="relative">
                    <FallbackImage
                      src={replaceUnsplashUrl("https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center", "teacher")}
                      alt="Founder and principal teacher of the academy in traditional Bharatanatyam costume"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                </HoverAnimation>
              </div>
              <div className="order-1 lg:order-2">
                <TextAnimation type="slide" direction="right" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Our Founder & Principal Teacher</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                    <strong>Guru Smt. Priya Sharma</strong> is a distinguished Bharatanatyam exponent and dedicated teacher with over two decades of experience in classical dance. A disciple of renowned gurus, she has dedicated her life to preserving and propagating the authentic traditions of Bharatanatyam.
                  </p>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.6}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    With a Master's degree in Performing Arts and numerous accolades to her credit, Guru Priya has performed extensively across India and internationally. Her teaching methodology combines traditional rigor with modern pedagogical approaches, making classical dance accessible to students of all ages and backgrounds.
                  </p>
                </TextAnimation>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">20+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">500+ Students Trained</span>
                  </div>
                </div>
                <Scale delay={0.8}>
                  <Button asChild variant="outline" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                    <Link href="/contact">Meet Our Teacher</Link>
                  </Button>
                </Scale>
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="text-center mb-12 sm:mb-16">
              <TextAnimation type="slide" direction="up" delay={0.2}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Our Philosophy</h2>
              </TextAnimation>
              <TextAnimation type="fade" delay={0.4}>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  Our approach to teaching Bharatanatyam is rooted in four core principles that guide everything we do.
                </p>
              </TextAnimation>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" delay={0.6}>
              {philosophy.map((item, index) => (
                <StaggerItem key={index} animation="slide" direction="up">
                  <HoverAnimation effect="lift" tapEffect="scale">
                    <Card className="text-center bg-card/80 h-full p-4 sm:p-6">
                      <CardHeader className="pb-4">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center">
                          <item.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <CardTitle className="text-lg sm:text-xl font-headline mb-2">{item.title}</CardTitle>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </HoverAnimation>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Join Our Community</h2>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed">
                Ready to begin your journey with Bharatanatyam? Join our vibrant community of learners and discover the transformative power of classical dance.
              </p>
            </TextAnimation>
            <Scale delay={0.6}>
              <Button asChild size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/register">Start Your Journey <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/></Link>
              </Button>
            </Scale>
          </div>
        </section>
      </div>
    </PageTransition>
=======
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const aboutContent = {
  title: 'Our Journey in Dance',
  paragraphs: [
    'Nithyanruthyaaradana was founded with a singular vision: to create a sanctuary for the art of Bharatanatyam. We are dedicated to preserving its purity, integrity, and profound spiritual essence.',
    'Our curriculum is meticulously designed, drawing from ancient texts and traditional guru-shishya parampara. We focus on holistic development, encompassing intricate footwork (adavus), expressive storytelling (abhinaya), and a deep understanding of rhythm (tala) and melody (raga).',
    'Beyond the dance studio, we are a community. We foster an environment of respect, discipline, and mutual support, encouraging students to grow not just as dancers, but as individuals who appreciate the richness of Indian culture and heritage.',
  ],
  founder: {
    name: 'Guru Smt. Kalyani Rajaraman',
    title: 'Founder & Artistic Director',
    image: 'https://placehold.co/400x400.png',
    hint: 'indian woman classical dancer',
    bio: 'A distinguished exponent of Bharatanatyam with over three decades of performance and teaching experience, Guru Smt. Kalyani Rajaraman is the heart and soul of our institution. Her vision guides our artistic endeavors.',
  },
  philosophy: [
    'Authenticity in every step and expression.',
    'Discipline as the foundation of artistry.',
    'Fostering a lifelong passion for dance.',
    'Connecting with culture and spirituality.',
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="py-16 text-center bg-background -mx-8 -mt-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-headline">{aboutContent.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Discover the spirit and philosophy that guides our artistic mission.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Text */}
            <div className="lg:col-span-2 space-y-6 text-muted-foreground">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Right Column: Founder Info */}
            <div className="lg:col-span-1">
              <Card className="transform transition-transform duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <Image
                    src={aboutContent.founder.image}
                    alt={`Portrait of ${aboutContent.founder.name}`}
                    data-ai-hint={aboutContent.founder.hint}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4 border-4 border-primary/20 shadow-lg"
                  />
                  <h3 className="text-xl font-bold font-headline">{aboutContent.founder.name}</h3>
                  <p className="text-primary font-semibold mb-2">{aboutContent.founder.title}</p>
                  <p className="text-sm text-muted-foreground">{aboutContent.founder.bio}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="pb-16 lg:pb-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Our Guiding Principles</h2>
            <p className="mt-2 text-muted-foreground">The core values that define our approach to teaching and performance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.philosophy.map((item, index) => (
               <Card key={index} className="text-center bg-card/80 transform transition-transform duration-300 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col items-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4 flex-shrink-0">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-lg">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
  );
}
