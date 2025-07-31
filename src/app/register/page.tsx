import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FadeIn, 
  Slide, 
  Scale, 
  StaggerContainer, 
  StaggerItem, 
  HoverAnimation, 
  TextAnimation
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
  }
];

export default function RegisterPage() {
  return (
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
  );
}