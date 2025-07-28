import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Images, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <Image
          src="https://placehold.co/1800x1000.png"
          alt="Dancer in a graceful pose"
          data-ai-hint="indian classical dance"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Nithyanruthyaaradana
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
            Experience the soul of Indian classical dance. A journey of grace, tradition, and self-discovery.
          </p>
          <Link href="/courses">
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Our Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
               <Image
                  src="https://placehold.co/600x600.png"
                  alt="Founder of the dance institute"
                  data-ai-hint="indian woman portrait"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                Welcome to Nithyanruthyaaradana
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our institute is a sanctuary for classical dance, dedicated to nurturing talent and preserving the rich heritage of Indian performing arts. Founded on principles of discipline, devotion, and artistic excellence, we offer a holistic learning experience that transcends mere technique.
              </p>
              <Link href="/about">
                <Button variant="outline" className="mt-6">
                  Learn More About Us <Users className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Courses</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer structured courses in Bharatanatyam for all ages and skill levels, available both online and in-person.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-left shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline">Beginner Level</CardTitle>
                <CardDescription>Foundational steps, postures, and theory.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Perfect for new students to build a strong base in the art of Bharatanatyam.</p>
              </CardContent>
            </Card>
            <Card className="text-left shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline">Intermediate Level</CardTitle>
                <CardDescription>Complex compositions and expressive techniques.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Deepen your understanding and refine your skills with advanced adavus and abhinaya.</p>
              </CardContent>
            </Card>
            <Card className="text-left shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline">Advanced Level</CardTitle>
                <CardDescription>Mastery of repertoire and performance skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>For dedicated students aiming for professional performance and artistic maturity.</p>
              </CardContent>
            </Card>
          </div>
           <Link href="/courses">
            <Button variant="link" className="mt-8 text-lg">
              View All Course Details <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      <section id="gallery-preview" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Glimpses of Our Art</h2>
           <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            A snapshot of performances, classroom moments, and the vibrant life at our institute.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg shadow-lg"><Image src="https://placehold.co/400x400.png" data-ai-hint="dance performance" alt="Performance 1" width={400} height={400} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/></div>
            <div className="overflow-hidden rounded-lg shadow-lg"><Image src="https://placehold.co/400x400.png" data-ai-hint="dance class" alt="Class 1" width={400} height={400} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/></div>
            <div className="overflow-hidden rounded-lg shadow-lg"><Image src="https://placehold.co/400x400.png" data-ai-hint="group dance" alt="Performance 2" width={400} height={400} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/></div>
            <div className="overflow-hidden rounded-lg shadow-lg"><Image src="https://placehold.co/400x400.png" data-ai-hint="dance costume" alt="Student 1" width={400} height={400} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/></div>
          </div>
           <Link href="/gallery">
            <Button variant="outline" className="mt-8">
              Visit Our Gallery <Images className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="register" className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Begin Your Dance Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our family of passionate dancers. Admissions are now open for all levels.
          </p>
          <Link href="/register">
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
