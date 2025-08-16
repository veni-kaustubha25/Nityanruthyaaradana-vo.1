
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Upload } from 'lucide-react';

export default function AboutPageManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">About Page Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Our Story Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="story-heading">Heading</Label>
            <Input id="story-heading" defaultValue="Our Story" />
          </div>
          <div>
            <Label htmlFor="story-content">Content</Label>
            <Textarea id="story-content" rows={6} defaultValue="Founded with a deep reverence for the ancient traditions of Bharatanatyam, our academy emerged from a vision to create a nurturing space where the divine art form could flourish..." />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
                <FallbackImage src="/images/teacher/9.jpg" alt="Founder" width={150} height={100} className="rounded-md object-cover"/>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Change Image</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Founder & Principal Teacher Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="founder-heading">Heading</Label>
            <Input id="founder-heading" defaultValue="Our Founder & Principal Teacher" />
          </div>
          <div>
            <Label htmlFor="founder-name">Founder's Name</Label>
            <Input id="founder-name" defaultValue="Guru Smt. Priya Sharma" />
          </div>
          <div>
            <Label htmlFor="founder-bio">Biography</Label>
            <Textarea id="founder-bio" rows={6} defaultValue="Guru Smt. Priya Sharma is a distinguished Bharatanatyam exponent and dedicated teacher with over two decades of experience in classical dance..." />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
                <FallbackImage src="/images/teacher/10.jpg" alt="Founder" width={150} height={100} className="rounded-md object-cover"/>
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
