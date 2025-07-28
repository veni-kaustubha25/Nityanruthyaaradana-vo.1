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
      <section className="py-16 text-center bg-secondary -mx-8 -mt-8">
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
              <Card>
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
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Our Guiding Principles</h2>
            <p className="mt-2 text-muted-foreground">The core values that define our approach to teaching and performance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.philosophy.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
