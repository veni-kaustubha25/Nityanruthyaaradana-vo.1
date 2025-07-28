import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Clock, Globe, MapPin, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const courseLevels = [
  {
    level: "Beginner",
    title: "Foundations of Bharatanatyam",
    description: "For those beginning their journey, focusing on fundamental postures, gestures, and rhythms.",
    curriculum: [
      "Introduction to Adavus (basic steps)",
      "Thattadavu, Naattadavu, and other core adavu series",
      "Hasta Mudras (hand gestures) and their meanings",
      "Basic theory of Tala (rhythm) and Raga (melody)",
      "Simple choreography and posture correction",
    ],
    schedule: "Tue & Thu: 5:00 PM - 6:00 PM",
  },
  {
    level: "Intermediate",
    title: "Developing Artistry",
    description: "Building upon the foundation to learn complex sequences and expressive techniques.",
    curriculum: [
      "Advanced Adavu combinations",
      "Introduction to Abhinaya (facial expressions)",
      "Study of traditional items like Alarippu, Jathiswaram",
      "Deeper understanding of Natya Shastra",
      "Body conditioning and stamina building for dancers",
    ],
    schedule: "Mon, Wed & Fri: 6:00 PM - 7:30 PM",
  },
  {
    level: "Advanced",
    title: "Mastery and Performance",
    description: "For dedicated students aiming for artistic maturity and professional performance.",
    curriculum: [
      "Learning full Margam (traditional repertoire)",
      "In-depth study of Varnam, Padam, and Thillana",
      "Nattuvangam (rhythmic direction) basics",
      "Improvisation and choreography skills",
      "Stage presence and performance techniques",
    ],
    schedule: "Sat & Sun: 10:00 AM - 1:00 PM",
  }
]

export default function CoursesPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Dance Curriculum</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A structured path from the first step to a full-fledged performance, nurturing each student's potential.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-headline text-3xl font-bold mb-8">Course Levels</h2>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {courseLevels.map((course, index) => (
                  <AccordionItem key={course.level} value={`item-${index}`}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      {course.level} Level: {course.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-muted-foreground mb-6">{course.description}</p>
                      
                      <h4 className="font-semibold mb-2">Curriculum Includes:</h4>
                      <ul className="space-y-2 mb-6">
                        {course.curriculum.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0"/>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                       <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="h-5 w-5 text-primary shrink-0"/>
                          <span><strong>Schedule:</strong> {course.schedule}</span>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline">Class Modes</CardTitle>
                   <CardDescription>Flexible options to suit your needs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-8 w-8 text-primary shrink-0"/>
                    <div>
                      <h3 className="font-semibold">Offline Classes</h3>
                      <p className="text-sm text-muted-foreground">Join us at our serene and spacious studio for in-person training.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Video className="h-8 w-8 text-primary shrink-0"/>
                    <div>
                      <h3 className="font-semibold">Online Classes</h3>
                      <p className="text-sm text-muted-foreground">Learn from the comfort of your home with our live, interactive online sessions.</p>
                    </div>
                  </div>
                   <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary shrink-0"/>
                    <div>
                      <h3 className="font-semibold">Hybrid Model</h3>
                      <p className="text-sm text-muted-foreground">Combine the benefits of both online and offline classes.</p>
                    </div>
                  </div>
                  <Link href="/register">
                    <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Enroll Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
