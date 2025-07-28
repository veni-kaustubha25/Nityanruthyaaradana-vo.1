import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const feeStructure = [
    { level: 'Beginner', frequency: 'Twice a week', fee: '₹2,500 / month' },
    { level: 'Intermediate', frequency: 'Thrice a week', fee: '₹3,500 / month' },
    { level: 'Advanced', frequency: 'Twice a week (long sessions)', fee: '₹5,000 / month' },
    { level: 'Online', frequency: 'Varies', fee: 'Contact us' },
];

export default function RegisterPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Admissions</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Embark on a transformative journey into the world of classical dance. We welcome aspiring dancers of all ages.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-headline text-3xl font-bold mb-4">Registration Process</h2>
              <p className="mb-8 text-muted-foreground">
                To join our institute, please fill out the registration form with accurate details. Our team will review your application and contact you within 2-3 business days to discuss the next steps, including batch allocation and a potential introductory session.
              </p>

              <h3 className="font-headline text-2xl font-bold mb-4">Fee Structure</h3>
              <Card className="mb-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Level</TableHead>
                            <TableHead>Class Frequency</TableHead>
                            <TableHead className="text-right">Monthly Fee</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feeStructure.map((item) => (
                             <TableRow key={item.level}>
                                <TableCell className="font-medium">{item.level}</TableCell>
                                <TableCell>{item.frequency}</TableCell>
                                <TableCell className="text-right">{item.fee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </Card>

              <h3 className="font-headline text-2xl font-bold mb-4">Prospectus</h3>
              <p className="mb-4 text-muted-foreground">
                For detailed information about our vision, faculty, curriculum, and rules, please download our prospectus.
              </p>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Prospectus (PDF)
              </Button>
            </div>
            <div className="lg:col-span-2">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">New Student Registration</CardTitle>
                        <CardDescription>Fill this form to begin your application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
