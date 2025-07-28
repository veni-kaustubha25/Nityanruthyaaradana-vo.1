import Image from 'next/image';

const galleryItems = [
  // Row 1
  { src: "https://placehold.co/600x400.png", alt: "A graceful solo performance on stage.", hint: "solo dance stage" },
  { src: "https://placehold.co/600x800.png", alt: "Dancer in an expressive pose, close-up.", hint: "bharatanatyam expression" },
  { src: "https://placehold.co/600x400.png", alt: "A group of students practicing in the studio.", hint: "dance practice studio" },

  // Row 2
  { src: "https://placehold.co/600x800.png", alt: "A close-up of intricate hand gestures (mudras).", hint: "dance mudra hands" },
  { src: "https://placehold.co/600x400.png", alt: "Colorful costumes and jewelry for a stage show.", hint: "dance costumes jewelry" },
  { src: "https://placehold.co/600x800.png", alt: "Dancer frozen in a dynamic movement.", hint: "dynamic dance pose" },

  // Row 3
  { src: "https://placehold.co/600x400.png", alt: "A live orchestra accompanying a dance performance.", hint: "live music dance" },
  { src: "https://placehold.co/600x400.png", alt: "Teacher guiding a young student's posture.", hint: "dance teacher student" },
  { src: "https://placehold.co/600x800.png", alt: "A serene moment of reflection before a performance.", hint: "dancer backstage" },
  
  // Row 4
  { src: "https://placehold.co/600x400.png", alt: "Annual day celebration on a grand stage.", hint: "stage performance celebration" },
  { src: "https://placehold.co/600x800.png", alt: "Portrait of a dancer with traditional makeup.", hint: "dancer portrait makeup" },
  { src: "https://placehold.co/600x400.png", alt: "The intricate footwork of Bharatanatyam with ankle bells (salangai).", hint: "dance footwork anklets" },
];

export default function GalleryPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 text-center bg-background -mx-8 -mt-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-headline">Moments in Motion</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A visual journey through the vibrant life at our academy, from disciplined practice to exhilarating performances.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryItems.map((item, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-lg shadow-lg ${item.src.includes('x800') ? 'row-span-2' : ''} transform transition-transform duration-300 hover:scale-105`}>
                        <Image
                            src={item.src}
                            alt={item.alt}
                            data-ai-hint={item.hint}
                            width={600}
                            height={item.src.includes('x800') ? 800 : 400}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm drop-shadow-md">{item.alt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
