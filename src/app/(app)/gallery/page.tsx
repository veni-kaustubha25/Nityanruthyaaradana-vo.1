'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FallbackImage } from '@/components/ui/fallback-image';
import { ImageModal } from '@/components/ui/image-modal';
import { replaceUnsplashUrl } from '@/lib/image-utils';
import { motion } from 'framer-motion';

// Gallery images data
const galleryImagesData = [
  { originalSrc: "https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=800&fit=crop&crop=center", category: "performance", alt: "Bharatanatyam dancer in dramatic pose on stage", hint: "stage performance", featured: true, categoryLabel: "Performance" },
  { originalSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", category: "groupPractice", alt: "Group dance practice session", hint: "group training", featured: false, categoryLabel: "Group Practice" },
  { originalSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", category: "training", alt: "Individual dance training", hint: "technique practice", featured: true, categoryLabel: "Training" },
  { originalSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center", category: "events", alt: "Annual dance performance", hint: "annual show", featured: false, categoryLabel: "Events" },
  { originalSrc: "https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=400&fit=crop&crop=center", category: "performance", alt: "Classical dance performance", hint: "traditional dance", featured: true, categoryLabel: "Performance" },
  { originalSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", category: "studentLife", alt: "Students practicing together", hint: "student bonding", featured: false, categoryLabel: "Student Life" },
  { originalSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", category: "cultural", alt: "Cultural festival performance", hint: "cultural event", featured: true, categoryLabel: "Cultural Events" },
  { originalSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center", category: "training", alt: "Advanced technique training", hint: "advanced practice", featured: false, categoryLabel: "Training" },
  { originalSrc: "https://images.unsplash.com/photo-1547153760-180fc612c570?w=600&h=400&fit=crop&crop=center", category: "performance", alt: "Solo dance performance", hint: "solo show", featured: true, categoryLabel: "Performance" },
  { originalSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center", category: "groupPractice", alt: "Group choreography practice", hint: "group choreography", featured: false, categoryLabel: "Group Practice" },
  { originalSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center", category: "studentLife", alt: "Students during break time", hint: "student life", featured: false, categoryLabel: "Student Life" },
  { originalSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center", category: "cultural", alt: "Traditional dance festival", hint: "traditional festival", featured: true, categoryLabel: "Cultural Events" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<Array<{
    src: string;
    alt: string;
    hint: string;
    featured: boolean;
    category: string;
  }>>([]);

  // Process images on component mount
  useEffect(() => {
    const processedImages = galleryImagesData.map(item => {
      const processedSrc = replaceUnsplashUrl(item.originalSrc || 'https://images.unsplash.com/photo-1547153760-180fc612c570', item.category as any);
      return {
        src: processedSrc || 'https://picsum.photos/600/400?random=1',
        alt: item.alt || 'Dance performance image',
        hint: item.hint || '',
        featured: item.featured || false,
        category: item.categoryLabel || 'Performance'
      };
    });
    
    setGalleryImages(processedImages);
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dance Gallery
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore the beauty and grace of classical dance through our curated collection of performances, training sessions, and cultural events.
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section 
        className="py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                  onClick={() => handleImageClick(index)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <FallbackImage
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {image.category}
                        </Badge>
                        <p className="text-xs font-medium">{image.hint}</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Image Modal */}
      {modalOpen && selectedImageIndex !== null && (
        <ImageModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          images={galleryImages}
          initialIndex={selectedImageIndex}
        />
      )}
    </div>
  );
}
