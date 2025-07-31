'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, LayoutDashboard, GalleryHorizontal, Users, Settings, PlusCircle, Trash2, Edit } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { useToast } from '@/hooks/use-toast';
import { db, app } from '@/lib/firebase';
import { FallbackImage } from '@/components/ui/fallback-image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  hint: string;
  category: string;
}

export default function ManageGalleryPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  
  const [newImage, setNewImage] = useState({ src: '', alt: '', hint: '', category: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    const galleryCollection = collection(db, 'gallery');
    const unsubscribeFirestore = onSnapshot(galleryCollection, (snapshot) => {
      const imagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryImage[];
      setGalleryImages(imagesData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [auth, router]);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.src || !newImage.alt || !newImage.category) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all required fields.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'gallery'), {
        src: newImage.src,
        alt: newImage.alt,
        hint: newImage.hint,
        category: newImage.category,
        featured: false,
      });
      toast({
        title: 'Image Added',
        description: 'The new image has been added to the gallery.',
      });
      setNewImage({ src: '', alt: '', hint: '', category: '' });
    } catch (error: any) {
      toast({
        title: 'Error Adding Image',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-4 flex flex-col">
        <div className="mb-8">
          <AnimatedLogo />
        </div>
        <nav className="flex-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start text-left" asChild>
            <Link href="/admin/gallery">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Manage Gallery
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            <Users className="mr-2 h-4 w-4" />
            Manage Students
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-left">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start text-left mt-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Manage Gallery</h1>
          {user && (
            <div className="text-right">
              <p className="font-semibold">{user.displayName || user.email}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          )}
        </header>

        {/* Add Image Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="src">Image URL</Label>
                  <Input 
                    id="src" 
                    value={newImage.src} 
                    onChange={(e) => setNewImage({ ...newImage, src: e.target.value })} 
                    placeholder="https://example.com/image.jpg or /images/local.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={newImage.category} 
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    placeholder="e.g., Performance, Training"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="alt">Alt Text (Description)</Label>
                <Textarea 
                  id="alt" 
                  value={newImage.alt} 
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder="A brief, descriptive text for accessibility."
                />
              </div>
              <div>
                <Label htmlFor="hint">Hint (Short Caption)</Label>
                <Input 
                  id="hint" 
                  value={newImage.hint} 
                  onChange={(e) => setNewImage({ ...newImage, hint: e.target.value })}
                  placeholder="e.g., Annual show, backstage"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoadingAnimation size="sm" /> : 'Add Image'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Gallery Image List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <Card key={image.id} className="group relative">
              <CardContent className="p-0">
                <FallbackImage 
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <p className="font-semibold truncate" title={image.alt}>{image.alt}</p>
                  <p className="text-sm text-muted-foreground">{image.category}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
