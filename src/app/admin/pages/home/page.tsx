
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface HomePageContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImageUrl: string;
  heroImageStoragePath: string;
}

export default function HomePageManagement() {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const docRef = doc(db, "pages", "home");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data() as HomePageContent);
      } else {
        setContent({
          headline: "Discover the Divine Art of Bharatanatyam",
          subheadline: "Experience the timeless beauty of India's classical dance form...",
          ctaPrimary: "Begin Your Journey",
          ctaSecondary: "Watch Our Story",
          heroImageUrl: "/images/1.jpg",
          heroImageStoragePath: "",
        });
      }
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, "pages", "home"), content);
      toast({ title: "Success", description: "Home page content updated." });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({ title: "Error", description: "Could not save content.", variant: "destructive" });
    }
    setIsSaving(false);
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !content) return;

    const toastId = toast({ title: "Uploading...", description: "Please wait." });
    const storagePath = `pages/home/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      () => {}, // progress
      () => { // error
        toast({ id: toastId.id, title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
      }, 
      () => { // complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setContent({ ...content, heroImageUrl: downloadURL, heroImageStoragePath: storagePath });
          toast({ id: toastId.id, title: "Success", description: "Image uploaded. Remember to save your changes." });
        });
      }
    );
  };

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center h-full pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Home Page Content</h1>
        <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Manage the main content of your homepage hero section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={content.headline} onChange={(e) => setContent({...content, headline: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea id="subheadline" rows={3} value={content.subheadline} onChange={(e) => setContent({...content, subheadline: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cta-primary">Primary Button Text</Label>
              <Input id="cta-primary" value={content.ctaPrimary} onChange={(e) => setContent({...content, ctaPrimary: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-secondary">Secondary Button Text</Label>
              <Input id="cta-secondary" value={content.ctaSecondary} onChange={(e) => setContent({...content, ctaSecondary: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <Card className="p-4">
                <div className="flex items-start gap-4">
                    <FallbackImage src={content.heroImageUrl} alt="Hero background" width={200} height={112} className="rounded-md object-cover border"/>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">Upload a new background image for the hero section. Recommended size: 1920x1080px.</p>
                        <Button variant="outline" asChild>
                            <label htmlFor="hero-image-upload" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4"/> Change Image
                                <input type="file" id="hero-image-upload" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                        </Button>
                    </div>
                </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
