'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  FadeIn, 
  Slide, 
  Scale, 
  StaggerContainer, 
  StaggerItem, 
  HoverAnimation, 
  TextAnimation,
} from "@/components/ui/professional-animations";
import { FallbackImage } from "@/components/ui/fallback-image";
import { ImageModal } from "@/components/ui/image-modal";
import Link from "next/link";
import { 
  ArrowRight, 
  Star, 
  Users, 
  Theater, 
  Maximize2, 
  Play,
  Quote,
  Sparkles,
  Crown,
  Trophy
} from "lucide-react";
import { replaceUnsplashUrl, getFallbackUrls } from "@/lib/image-utils";
import { useState } from "react";

// Hero Section Data
const heroContent = {
  headline: "Discover the Divine Art of Bharatanatyam",
  subheadline: "Experience the timeless beauty of India's classical dance form through authentic training, expert guidance, and a vibrant community of passionate artists.",
  cta: "Begin Your Journey",
  secondaryCta: "Watch Our Story",
  image: {
    src: "/images/1.jpg",
    alt: "Traditional Bharatanatyam performance with elaborate costumes and expressive poses",
    hint: "traditional bharatanatyam performance elaborate costumes"
  }
};

// Features Section
const features = [
  {
    icon: Crown,
    title: "Authentic Training",
    description: "Learn from certified gurus following traditional guru-shishya parampara with modern pedagogical approaches.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join a supportive family of artists who share your passion for dance, culture, and personal growth.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Theater,
    title: "Performance Opportunities",
    description: "Showcase your talent through regular recitals, annual productions, and prestigious cultural events.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Trophy,
    title: "Certification Programs",
    description: "Earn recognized certifications and participate in competitions to validate your artistic journey.",
    color: "from-green-500 to-emerald-500"
  }
];



// Gallery Data
const gallerySnippetsData = [
  { originalSrc: "https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=800&fit=crop&crop=center", category: "performance", alt: "Bharatanatyam dancer in dramatic pose", hint: "bharatanatyam expression" },
  { originalSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", category: "groupPractice", alt: "Group practice session", hint: "dance practice studio" },
  { originalSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", category: "events", alt: "Live orchestra accompaniment", hint: "live music dance" },
  { originalSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop&crop=center", category: "performance", alt: "Dancer with traditional makeup", hint: "dancer portrait makeup" },
];

// Testimonials
const testimonials = [
  {
    quote: "The teaching methodology is simply outstanding. My daughter has not only learned the dance form but also the cultural values associated with it.",
    author: "Priya Sharma",
    role: "Parent",
    stars: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "A truly immersive experience. The instructors are passionate and dedicated, making every class a joy to attend. I've grown so much as a dancer here.",
    author: "Ananya Kumar",
    role: "Student",
    stars: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "Nithyanruthyaaradana has a wonderful, welcoming atmosphere. It feels like a second home. The attention to detail in every aspect of training is commendable.",
    author: "Rohan Mehta",
    role: "Student",
    stars: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
];



// FAQ Section
const faqs = [
  {
    question: "What is the minimum age to enroll?",
    answer: "We welcome students from the age of 5. We believe in nurturing talent from a young age, providing a strong foundation in Bharatanatyam with age-appropriate teaching methods."
  },
  {
    question: "Do you provide costumes for performances?",
    answer: "Yes, for our annual showcases and major events, the institution arranges for professionally designed costumes. For regular classes, a specific dress code is to be followed."
  },
  {
    question: "Are there different batches for different skill levels?",
    answer: "Absolutely. We have structured programs for Beginners, Intermediate, and Advanced learners. Students are assessed and placed in the appropriate batch to ensure personalized attention and growth."
  },
  {
    question: "How often are classes held?",
    answer: "Classes are typically held twice a week. We offer both weekday and weekend batches to accommodate different schedules. Detailed schedules are available upon registration."
  },
  {
    question: "Do you offer online classes?",
    answer: "Yes, we offer hybrid learning options with both in-person and online classes. This ensures continuity in training and accessibility for students who cannot attend in person."
  },
  {
    question: "What are the benefits of learning Bharatanatyam?",
    answer: "Bharatanatyam enhances physical fitness, improves concentration, develops cultural awareness, builds confidence, and provides a deep connection to Indian heritage and spirituality."
  }
];



export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    <div className="flex flex-col">
      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={gallerySnippets}
        initialIndex={selectedImageIndex}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 w-full h-full">
          <FallbackImage
            src={heroContent.image.src}
            alt={heroContent.image.alt}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <TextAnimation type="slide" direction="up" delay={0.2}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {heroContent.headline}
              </span>
            </h1>
          </TextAnimation>
          <TextAnimation type="slide" direction="up" delay={0.4}>
            <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200 px-2">
              {heroContent.subheadline}
            </p>
          </TextAnimation>
          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Scale delay={0.6}>
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full sm:w-auto">
                <Link href="/register">
                  {heroContent.cta} <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/>
                </Link>
              </Button>
            </Scale>
            <Scale delay={0.8}>
              <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white text-white hover:bg-white hover:text-black w-full sm:w-auto">
                <Link href="#about">
                  {heroContent.secondaryCta} <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/>
                </Link>
              </Button>
            </Scale>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <TextAnimation type="slide" direction="left" delay={0.2}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  <span className="text-yellow-300">
                    Welcome to Nithyanruthyaaradana
                  </span>
                </h2>
              </TextAnimation>
              <TextAnimation type="fade" delay={0.4}>
                <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                  We are a premier institution dedicated to the preservation and promotion of Bharatanatyam, 
                  one of the oldest and most revered classical dance forms of India. Our mission is to impart 
                  authentic training and foster a deep appreciation for this divine art.
                </p>
              </TextAnimation>
              <TextAnimation type="fade" delay={0.6}>
                <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                  Founded by renowned artists, our academy offers a nurturing environment where students of all 
                  ages can embark on a journey of artistic discovery, discipline, and self-expression.
                </p>
              </TextAnimation>

              <Scale delay={0.8}>
                <Button asChild size="lg" className="bg-white text-[#8B0000] hover:bg-gray-100">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </Scale>
            </div>
            <div>
              <HoverAnimation effect="lift" tapEffect="scale">
                <div className="relative">
                  <FallbackImage
                    src={replaceUnsplashUrl("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", "groupPractice")}
                    alt="Students practicing Bharatanatyam in the studio"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-3">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">4.9/5</div>
                        <div className="text-sm text-gray-600">Student Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Why Choose <span className="text-yellow-300">Our Academy</span>
              </h2>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Discover the unique qualities that make our academy the perfect place to nurture your passion for dance.
              </p>
            </TextAnimation>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" delay={0.6}>
            {features.map((feature, index) => (
              <StaggerItem key={index} animation="slide" direction="up">
                <HoverAnimation effect="lift" tapEffect="scale">
                  <Card className="text-center h-full border-0 shadow-xl bg-white">
                    <CardHeader className="pb-4">
                      <div className={`mx-auto bg-gradient-to-r ${feature.color} rounded-2xl h-16 w-16 flex items-center justify-center mb-4`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </HoverAnimation>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>



      {/* Gallery Section */}
      <section className="py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                <span className="text-yellow-300">
                  Moments in Motion
                </span>
              </h2>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                A visual journey through the vibrant life, culture, and performances at our academy.
              </p>
            </TextAnimation>
          </div>

          {/* Gallery Grid */}
          <div className="max-w-5xl mx-auto mb-12">
            <StaggerItem animation="scale">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallerySnippets.map((image, index) => (
                  <HoverAnimation key={index} effect="lift" tapEffect="scale">
                    <div 
                      className={`group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer ${
                        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                      onClick={() => handleImageClick(index)}
                    >
                      <FallbackImage
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-white font-semibold">Performance</h5>
                            <Maximize2 className="h-4 w-4 text-white/80" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverAnimation>
                ))}
              </div>
            </StaggerItem>
          </div>

          <div className="text-center">
            <Scale delay={1.0}>
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Link href="/gallery">View Full Gallery</Link>
              </Button>
            </Scale>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                What Our <span className="text-yellow-300">Community</span> Says
              </h2>
            </TextAnimation>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <HoverAnimation effect="lift" tapEffect="scale">
                      <Card className="h-full bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl">
                        <CardContent className="pt-8 pb-6 px-6">
                          <div className="flex items-center mb-6">
                            <div className="flex items-center gap-2">
                              {Array.from({ length: testimonial.stars }).map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <Quote className="h-8 w-8 text-orange-500 mb-4" />
                          <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <FallbackImage
                                src={testimonial.image}
                                alt={testimonial.author}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{testimonial.author}</div>
                              <div className="text-sm text-gray-600">{testimonial.role}</div>
                            </div>
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
      <section className="py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Frequently Asked <span className="text-yellow-300">Questions</span>
              </h2>
            </TextAnimation>
          </div>
          <StaggerContainer className="w-full" delay={0.4}>
            {faqs.map((faq, index) => (
              <StaggerItem key={index} animation="slide" direction="up">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index + 1}`} className="border-2 border-gray-200 rounded-lg mb-4">
                    <AccordionTrigger className="text-lg font-semibold text-left px-6 py-4 hover:text-orange-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed px-6 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#8B0000]">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <TextAnimation type="slide" direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Dance Journey?
            </h2>
          </TextAnimation>
          <TextAnimation type="fade" delay={0.4}>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join our vibrant community and discover the transformative power of Bharatanatyam.
            </p>
          </TextAnimation>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Scale delay={0.6}>
              <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-[#8B0000] hover:bg-gray-100">
                <Link href="/register">
                  Enroll Now <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </Scale>
            <Scale delay={0.8}>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-[#8B0000]">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Scale>
          </div>
        </div>
      </section>
    </div>
  );
}
