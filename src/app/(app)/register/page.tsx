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
  }
];

export default function RegisterPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-secondary -mx-8 -mt-8">
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
                <Card>
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
  );
}
