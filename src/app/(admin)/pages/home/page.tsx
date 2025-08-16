
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Upload } from 'lucide-react';

export default function HomePageManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Home Page Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" defaultValue="Discover the Divine Art of Bharatanatyam" />
          </div>
          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea id="subheadline" rows={3} defaultValue="Experience the timeless beauty of India's classical dance form through authentic training, expert guidance, and a vibrant community of passionate artists." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cta-primary">Primary Button Text</Label>
              <Input id="cta-primary" defaultValue="Begin Your Journey" />
            </div>
            <div>
              <Label htmlFor="cta-secondary">Secondary Button Text</Label>
              <Input id="cta-secondary" defaultValue="Watch Our Story" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <div className="flex items-center gap-4">
                <FallbackImage src="/images/1.jpg" alt="Hero background" width={200} height={100} className="rounded-md object-cover"/>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Change Image</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
