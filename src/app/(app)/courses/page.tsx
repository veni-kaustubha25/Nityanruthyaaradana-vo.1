import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    level: "Beginner",
    title: "Foundations of Bharatanatyam",
    description: "An introductory course covering the fundamental postures (aramandi), hand gestures (mudras), and basic steps (adavus) of Bharatanatyam.",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Young students learning basic dance postures.",
      hint: "beginner dance class"
    },
    details: [
      "Focus on body alignment and core strength.",
      "Introduction to basic rhythmic patterns (tala).",
      "Simple theoretical concepts of the dance form.",
      "Suitable for all ages with no prior experience."
    ]
  },
  {
    level: "Intermediate",
    title: "Developing Artistry",
    description: "This course builds upon the foundational skills, introducing more complex sequences, expressive elements (abhinaya), and items from the traditional repertoire.",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Dancer performing a complex sequence with expressive hand gestures.",
      hint: "expressive dance"
    },
    details: [
      "Learning of traditional items like Alarippu and Jathiswaram.",
      "Focus on nuance, grace, and emotional expression.",
      "Deeper understanding of rhythm and musicality.",
      "Requires completion of the beginner level or equivalent."
    ]
  },
  {
    level: "Advanced",
    title: "Mastery and Performance",
    description: "Designed for dedicated students aiming for proficiency and performance skills. This level involves learning the complete Margam (traditional repertoire).",
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "A senior dancer in full costume during a stage performance.",
      hint: "professional classical dancer"
    },
    details: [
      "Intensive training in complex items like Varnam and Padam.",
      "Advanced techniques in Nritta (pure dance) and Abhinaya (expression).",
      "Opportunities for stage performances and arangetrams.",
      "Admission based on assessment by our gurus."
    ]
  }
];

export default function CoursesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-secondary -mx-8 -mt-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-headline">Our Curriculum</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A structured path from the first step to a full performance, designed for every stage of a dancer's journey.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden shadow-lg border-border/50">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={course.image.src}
                      alt={course.image.alt}
                      data-ai-hint={course.image.hint}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardHeader>
                      <p className="text-sm font-semibold text-accent">{course.level}</p>
                      <CardTitle className="text-2xl font-headline">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground">
                        {course.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                         <Button asChild>
                            <Link href="/register">Enroll Now</Link>
                         </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
