import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const instructors = [
  {
    name: "Dr. Anjali Sharma",
    title: "Founder & Artistic Director",
    bio: "A world-renowned Bharatanatyam exponent with over 30 years of performance and teaching experience. She is a recipient of the Sangeet Natak Akademi Award.",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "indian woman professional"
  },
  {
    name: "Rohan Verma",
    title: "Senior Instructor",
    bio: "Specializes in the Kalakshetra style of Bharatanatyam. Rohan is known for his dynamic teaching methods and deep knowledge of dance theory.",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "indian man professional"
  },
  {
    name: "Priya Singh",
    title: "Junior Instructor",
    bio: "A passionate dancer and a graduate of Nritya Darpan. Priya brings youthful energy and a nurturing approach to teaching beginner batches.",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "young indian woman"
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Story</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tracing the journey of a dream to preserve and propagate the divine art of Indian classical dance.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Dance institute building"
                data-ai-hint="traditional indian building"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold">A Legacy of Grace</h2>
              <p className="mt-4 text-muted-foreground">
                Founded in 1995 by the visionary dancer Dr. Anjali Sharma, NITHYANRUTHYAARADANA started as a small studio with a handful of students. The goal was simple yet profound: to create an environment where the purity of traditional Bharatanatyam could flourish, unhindered by commercialism. Over the decades, our institute has grown into a premier center for dance education, nurturing hundreds of dancers who have graced stages worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="md:order-2">
              <h2 className="font-headline text-3xl font-bold">Our Philosophy & Mission</h2>
              <p className="mt-4 text-muted-foreground">
                We believe dance is a form of yoga and a path to spiritual awakening. Our mission is to impart this holistic understanding of dance to our students.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <span>To provide authentic training in the traditional format of Bharatanatyam.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <span>To foster discipline, creativity, and a deep respect for the art form.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <span>To create a community of artists who support and inspire one another.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg md:order-1">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Dance students in a classroom"
                data-ai-hint="dance class students"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Meet Our Gurus</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our institute is led by a team of accomplished and dedicated instructors.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Card key={instructor.name} className="text-center shadow-md hover:shadow-xl transition-shadow">
                <CardHeader className="items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                     <Image
                        src={instructor.image}
                        alt={instructor.name}
                        data-ai-hint={instructor.dataAiHint}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                  </div>
                  <CardTitle className="font-headline pt-4">{instructor.name}</CardTitle>
                   <p className="text-sm text-primary font-semibold">{instructor.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{instructor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
