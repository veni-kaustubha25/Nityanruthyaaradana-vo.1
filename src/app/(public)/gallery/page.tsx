'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Camera } from 'lucide-react';
import { FadeIn, Scale, StaggerContainer, StaggerItem } from '@/components/ui/professional-animations';
import { FallbackImage } from '@/components/ui/fallback-image';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { ImageModal } from '@/components/ui/image-modal';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  hint: string;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('alt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        'data-ai-hint': doc.data().hint || 'dance'
      })) as GalleryImage[];
      setGalleryImages(imagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gallery images: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-primary/80 to-primary">
        <div className="absolute inset-0 bg-black/20"></div>
         <div className="absolute inset-0 z-0 opacity-20">
            <FallbackImage
                src="https://placehold.co/1200x400.png"
                alt="Abstract background texture"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="abstract pattern"
            />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-center text-white">
              Our Gallery
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-center text-lg sm:text-xl text-white/90">
              A visual journey through the vibrant world of Nithyanruthyaaradana.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingAnimation size="lg" />
            </div>
          ) : galleryImages.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {galleryImages.map((image, index) => (
                <StaggerItem key={image.id}>
                  <Scale>
                    <button
                      onClick={() => openModal(index)}
                      className="block w-full aspect-w-1 aspect-h-1 bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/40 transition-shadow duration-300 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      aria-label={`View image: ${image.alt}`}
                    >
                      <FallbackImage
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.hint}
                      />
                    </button>
                  </Scale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <Camera className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-headline font-semibold">Our Gallery is Growing</h2>
              <p className="mt-2 text-muted-foreground">
                We're currently curating our best moments. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
