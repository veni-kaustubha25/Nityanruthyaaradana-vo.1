'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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

interface AboutPageContent {
  storyHeading: string;
  storyContent: string;
  storyImageUrl: string;
  storyImageStoragePath: string;
  founderHeading: string;
  founderName: string;
  founderBio: string;
  founderImageUrl: string;
  founderImageStoragePath: string;
}

export default function AboutPageManagement() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const docRef = doc(db, "pages", "about");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data() as AboutPageContent);
      } else {
        // Initialize with default content if it doesn't exist
        setContent({
          storyHeading: "Our Story",
          storyContent: "Founded with a deep reverence for the ancient traditions of Bharatanatyam...",
          storyImageUrl: "/images/teacher/9.jpg",
          storyImageStoragePath: "",
          founderHeading: "Our Founder & Principal Teacher",
          founderName: "Guru Smt. Priya Sharma",
          founderBio: "Guru Smt. Priya Sharma is a distinguished Bharatanatyam exponent...",
          founderImageUrl: "/images/teacher/10.jpg",
          founderImageStoragePath: ""
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
      await setDoc(doc(db, "pages", "about"), content);
      toast({ title: "Success", description: "About page content updated." });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({ title: "Error", description: "Could not save content.", variant: "destructive" });
    }
    setIsSaving(false);
  };
  
  const handleImageUpload = (field: 'storyImageUrl' | 'founderImageUrl') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !content) return;

    const storagePathField = field === 'storyImageUrl' ? 'storyImageStoragePath' : 'founderImageStoragePath';
    const toastId = toast({ title: "Uploading...", description: "Please wait." });
    const storagePath = `pages/about/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      () => {}, // progress
      () => { // error
        toast({ id: toastId.id, title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
      }, 
      () => { // complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setContent({ ...content, [field]: downloadURL, [storagePathField]: storagePath });
          toast({ id: toastId.id, title: "Success", description: "Image uploaded. Save your changes." });
        });
      }
    );
  };

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">About Page Management</h1>
        <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save All Changes
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Our Story Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="story-heading">Heading</Label>
            <Input id="story-heading" value={content.storyHeading} onChange={(e) => setContent({...content, storyHeading: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="story-content">Content</Label>
            <Textarea id="story-content" rows={6} value={content.storyContent} onChange={(e) => setContent({...content, storyContent: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
                <FallbackImage src={content.storyImageUrl} alt="Founder" width={150} height={100} className="rounded-md object-cover"/>
                <Button variant="outline" asChild>
                    <label htmlFor="story-image-upload">
                        <Upload className="mr-2 h-4 w-4"/> Change Image
                        <input type="file" id="story-image-upload" className="hidden" onChange={handleImageUpload('storyImageUrl')} />
                    </label>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Founder & Principal Teacher Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="founder-heading">Heading</Label>
            <Input id="founder-heading" value={content.founderHeading} onChange={(e) => setContent({...content, founderHeading: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="founder-name">Founder's Name</Label>
            <Input id="founder-name" value={content.founderName} onChange={(e) => setContent({...content, founderName: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="founder-bio">Biography</Label>
            <Textarea id="founder-bio" rows={6} value={content.founderBio} onChange={(e) => setContent({...content, founderBio: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
                <FallbackImage src={content.founderImageUrl} alt="Founder" width={150} height={100} className="rounded-md object-cover"/>
                <Button variant="outline" asChild>
                    <label htmlFor="founder-image-upload">
                        <Upload className="mr-2 h-4 w-4"/> Change Image
                         <input type="file" id="founder-image-upload" className="hidden" onChange={handleImageUpload('founderImageUrl')} />
                    </label>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
