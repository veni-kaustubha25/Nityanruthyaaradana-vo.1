
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
import { LogOut, LayoutDashboard, GalleryHorizontal, Users, Settings, PlusCircle, Trash2, Edit, FileText } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { useToast } from '@/hooks/use-toast';
import { db, app } from '@/lib/firebase';
import { FallbackImage } from '@/components/ui/fallback-image';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"


interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  hint: string;
}

export default function ManageGalleryPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  
  const [newImage, setNewImage] = useState({ src: '', alt: '', hint: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


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
    if (!newImage.src || !newImage.alt) {
      toast({
        title: 'Missing Fields',
        description: 'Image URL and Alt Text are required.',
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
        featured: false,
      });
      toast({
        title: 'Image Added',
        description: 'The new image has been added to the gallery.',
      });
      setNewImage({ src: '', alt: '', hint: '' });
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

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', imageId));
      toast({
        title: 'Image Deleted',
        description: 'The image has been successfully removed from the gallery.',
        variant: 'default',
      });
    } catch (error: any) {
      toast({
        title: 'Error Deleting Image',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setIsEditModalOpen(true);
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setIsSubmitting(true);
    try {
      const imageRef = doc(db, 'gallery', editingImage.id);
      await updateDoc(imageRef, {
        src: editingImage.src,
        alt: editingImage.alt,
        hint: editingImage.hint,
      });
      toast({
        title: 'Image Updated',
        description: 'The image details have been successfully updated.',
      });
      setIsEditModalOpen(false);
      setEditingImage(null);
    } catch (error: any) {
      toast({
        title: 'Error Updating Image',
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
           <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/content">
              <FileText className="mr-2 h-4 w-4" />
              Manage Content
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start text-left" asChild>
            <Link href="/admin/gallery">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Manage Gallery
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/students">
              <Users className="mr-2 h-4 w-4" />
              Manage Students
            </Link>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-left" disabled>
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
              <div>
                <Label htmlFor="src">Image URL</Label>
                <Input 
                  id="src" 
                  value={newImage.src} 
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })} 
                  placeholder="https://example.com/image.jpg"
                />
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
                <Label htmlFor="hint">Hint (for AI Image Search)</Label>
                <Input 
                  id="hint" 
                  value={newImage.hint} 
                  onChange={(e) => setNewImage({ ...newImage, hint: e.target.value })}
                  placeholder="e.g., dance performance"
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
                  data-ai-hint={image.hint}
                />
                <div className="p-4">
                  <p className="font-semibold truncate" title={image.alt}>{image.alt}</p>
                  <p className="text-sm text-muted-foreground truncate" title={image.src}>{image.src}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => openEditModal(image)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="destructive" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the image
                          from the gallery.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteImage(image.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Image Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
              <DialogDescription>
                Make changes to the image details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingImage && (
              <form onSubmit={handleUpdateImage} className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="edit-src">Image URL</Label>
                  <Input 
                    id="edit-src" 
                    value={editingImage.src} 
                    onChange={(e) => setEditingImage({ ...editingImage, src: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-alt">Alt Text</Label>
                  <Textarea 
                    id="edit-alt" 
                    value={editingImage.alt} 
                    onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-hint">AI Hint</Label>
                  <Input 
                    id="edit-hint" 
                    value={editingImage.hint} 
                    onChange={(e) => setEditingImage({ ...editingImage, hint: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingAnimation size="sm" /> : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
}
