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
import { RegisterForm } from "@/components/register-form";
import { ArrowRight, CheckCircle, Users, Award, Clock } from "lucide-react";

const admissionSteps = [
  {
    icon: Users,
    title: "Initial Consultation",
    description: "Schedule a meeting with our instructors to discuss your goals and assess your current level."
  },
  {
    icon: Award,
    title: "Level Assessment",
    description: "We'll evaluate your skills and recommend the most suitable course level for your development."
  },
  {
    icon: Clock,
    title: "Class Scheduling",
    description: "Choose from our flexible class schedules that accommodate different time commitments."
  },
  {
    icon: CheckCircle,
    title: "Enrollment",
    description: "Complete the registration process and begin your journey with Bharatanatyam."
=======
import { RegisterForm } from "@/components/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const admissionProcess = [
  {
    step: "Submit Application",
    description: "Fill out the online registration form with the student's and guardian's details. It's the first step to joining our family."
  },
  {
    step: "Interactive Session",
    description: "We schedule a brief, friendly interaction with the prospective student and parents to understand their aspirations and answer any questions."
  },
  {
    step: "Level Assessment",
    description: "For students with prior dance experience, our gurus conduct a simple assessment to place them in the appropriate skill-level batch."
  },
  {
    step: "Admission Confirmation",
    description: "Once the process is complete, you'll receive a confirmation and details about the class schedule, fees, and other formalities."
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
  }
];

export default function RegisterPage() {
  return (
<<<<<<< HEAD
    <PageTransition>
      <div>
        {/* Page Header */}
        <section className="py-12 sm:py-16 text-center bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TextAnimation type="slide" direction="up" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">Join Our Academy</h1>
            </TextAnimation>
            <TextAnimation type="fade" delay={0.4}>
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
                Begin your journey with Bharatanatyam. Fill out the form below to start your enrollment process.
              </p>
            </TextAnimation>
          </div>
        </section>

        {/* Registration Content */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Registration Form */}
              <div>
                <TextAnimation type="slide" direction="left" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Enrollment Form</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Please provide your details below and we'll get back to you with enrollment information and next steps.
                  </p>
                </TextAnimation>
                <HoverAnimation effect="lift" tapEffect="scale">
                  <Card className="bg-card/80">
                    <CardContent className="p-4 sm:p-6">
                      <RegisterForm />
                    </CardContent>
                  </Card>
                </HoverAnimation>
              </div>

              {/* Admission Process */}
              <div>
                <TextAnimation type="slide" direction="right" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-6">Admission Process</h2>
                </TextAnimation>
                <TextAnimation type="fade" delay={0.4}>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Our enrollment process is designed to ensure the best learning experience for every student.
                  </p>
                </TextAnimation>

                <StaggerContainer className="space-y-4 sm:space-y-6" delay={0.6}>
                  {admissionSteps.map((step, index) => (
                    <StaggerItem key={index} animation="slide" direction="up">
                      <HoverAnimation effect="lift" tapEffect="scale">
                        <Card className="bg-card/80">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                                <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-base sm:text-lg mb-1">{step.title}</h3>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{step.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </HoverAnimation>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
=======
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-background -mx-8 -mt-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-headline">Join Our Academy</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Begin your journey into the world of classical dance. Fill out the form below to start the admission process.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
                <Card className="transform transition-transform duration-300 hover:-translate-y-2">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Registration Form</CardTitle>
                        <CardDescription>Please provide accurate details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Process & Fees */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h2 className="text-3xl font-bold font-headline mb-6">Admission Process</h2>
                <div className="space-y-6">
                  {admissionProcess.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.step}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
  );
}
