
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Site Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your site's general information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input id="site-name" defaultValue="Nithyanruthyaaradana" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" defaultValue="info@nithyanruthyaaradana.art" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input id="contact-phone" type="tel" defaultValue="+91 123 456 7890" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Link your social media profiles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebook-url">Facebook URL</Label>
            <Input id="facebook-url" placeholder="https://facebook.com/your-page" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram-url">Instagram URL</Label>
            <Input id="instagram-url" placeholder="https://instagram.com/your-profile" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input id="youtube-url" placeholder="https://youtube.com/your-channel" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Social Links</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Mode</CardTitle>
          <CardDescription>Temporarily disable public access to the site.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="maintenance-mode" />
            <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
          </div>
        </CardContent>
        <CardFooter>
            <Button variant="destructive">Update Status</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
