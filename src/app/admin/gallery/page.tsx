
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Trash2, Loader2, Upload } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Badge } from "@/components/ui/badge";
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Progress } from '@/components/ui/progress';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  storagePath: string;
}

export default function GalleryManagementPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const images: GalleryImage[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setGalleryImages(images);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching gallery images: ", error);
      toast({ title: "Error", description: "Could not fetch gallery images.", variant: "destructive" });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    const storagePath = `gallery/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        toast({ title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "gallery"), {
            src: downloadURL,
            alt: file.name.split('.').slice(0, -1).join('.') || "Uploaded image",
            category: "Performance",
            storagePath,
            createdAt: serverTimestamp(),
          });
          toast({ title: "Success", description: "Image uploaded successfully." });
          setIsUploading(false);
        });
      }
    );
  };
  
  const handleDelete = async (image: GalleryImage) => {
    try {
      if (!image.storagePath) {
        // Handle old data that might not have storagePath
        await deleteDoc(doc(db, "gallery", image.id));
        toast({ title: "Success", description: "Image record deleted. No storage file path was found." });
        return;
      }
      
      // Delete from Storage
      const imageRef = ref(storage, image.storagePath);
      await deleteObject(imageRef);
      
      // Delete from Firestore
      await deleteDoc(doc(db, "gallery", image.id));

      toast({ title: "Success", description: "Image deleted successfully." });
    } catch (error: any) {
       if (error.code === 'storage/object-not-found') {
        // If file doesn't exist in storage, just delete from firestore
        await deleteDoc(doc(db, "gallery", image.id));
        toast({ title: "Warning", description: "Image file not found in storage, but record was deleted.", variant: "default" });
      } else {
        console.error("Error deleting image:", error);
        toast({ title: "Error", description: "Could not delete image. " + error.message, variant: "destructive" });
      }
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gallery Management</h1>
        <Button asChild>
           <label htmlFor="image-upload">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Image
              <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
           </label>
        </Button>
      </div>

       {isUploading && (
          <div className="mb-4 p-4 border rounded-lg bg-card">
              <p className="text-sm font-medium mb-2">Uploading...</p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round(uploadProgress)}%</p>
          </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <FallbackImage src={image.src} alt={image.alt} width={400} height={400} className="w-full h-48 object-cover" />
                  <Badge variant="secondary" className="absolute top-2 left-2">{image.category}</Badge>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/30 hover:bg-black/50 text-white hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the image from your gallery and storage.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(image)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-card">
                <p className="text-sm font-medium truncate" title={image.alt}>{image.alt}</p>
              </CardFooter>
            </Card>
          ))}
          <Card className="flex items-center justify-center border-2 border-dashed">
              <label htmlFor="image-upload-2" className="cursor-pointer w-full h-full">
                <div className="flex flex-col h-full w-full items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors p-4">
                    <Upload className="h-8 w-8 mb-2"/>
                    <span>Upload Image</span>
                </div>
                <input id="image-upload-2" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
              </label>
          </Card>
        </div>
      )}
    </div>
  );
}
