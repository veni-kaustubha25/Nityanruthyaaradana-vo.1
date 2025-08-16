
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FallbackImage } from '@/components/ui/fallback-image';
import { Trash2 } from 'lucide-react';
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

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

const gallerySchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  alt: z.string().min(5, { message: 'Alt text must be at least 5 characters.' }),
  category: z.string().min(3, { message: 'Category is required.' }),
});

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      url: '',
      alt: '',
      category: '',
    },
  });

  useEffect(() => {
    const galleryCollection = collection(db, 'gallery');
    const unsubscribe = onSnapshot(galleryCollection, (snapshot) => {
      const imagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(imagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (values: z.infer<typeof gallerySchema>) => {
    try {
      await addDoc(collection(db, 'gallery'), values);
      toast({ title: 'Success', description: 'Image added to gallery.' });
      form.reset();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add image.', variant: 'destructive' });
      console.error('Error adding image: ', error);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      toast({ title: 'Success', description: 'Image removed from gallery.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to remove image.', variant: 'destructive' });
      console.error('Error deleting image: ', error);
    }
  };

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Manage Gallery</h1>
            <p className="text-muted-foreground">Add, view, and delete images from your website's gallery.</p>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
          <CardDescription>Upload a new image by providing its URL and details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text (Description)</FormLabel>
                    <FormControl>
                      <Input placeholder="A classical dancer performing on stage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., performance, training" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adding...' : 'Add Image'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Images</CardTitle>
          <CardDescription>Currently showing {images.length} images in the gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group aspect-square">
                  <FallbackImage
                    src={image.url}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the image from your gallery.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteImage(image.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No images found in the gallery.</p>
                <p className="text-sm text-muted-foreground mt-2">Add your first image using the form above.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
