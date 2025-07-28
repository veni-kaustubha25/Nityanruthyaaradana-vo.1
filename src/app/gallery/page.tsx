import Image from "next/image";

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "A graceful solo performance.", hint: "solo dance performance" },
  { src: "https://placehold.co/600x800.png", alt: "Dancer in an expressive pose.", hint: "bharatanatyam posture" },
  { src: "https://placehold.co/600x400.png", alt: "Group of students in a dance class.", hint: "dance class" },
  { src: "https://placehold.co/600x400.png", alt: "Colorful costumes for a stage show.", hint: "dance costumes" },
  { src: "https://placehold.co/600x800.png", alt: "A close-up of intricate hand gestures (mudras).", hint: "dance mudra" },
  { src: "https://placehold.co/600x400.png", alt: "Annual day celebration on stage.", hint: "stage performance" },
  { src: "https://placehold.co/600x400.png", alt: "A young student learning basic steps.", hint: "child dancer" },
  { src: "https://placehold.co/600x800.png", alt: "An instructor guiding a student.", hint: "dance teacher" },
  { src: "https://placehold.co/600x400.png", alt: "Behind the scenes before a performance.", hint: "backstage" },
  { src: "https://placehold.co/600x400.png", alt: "Group choreography in perfect sync.", hint: "group dance" },
  { src: "https://placehold.co/600x800.png", alt: "A dancer's portrait.", hint: "dancer portrait" },
  { src: "https://placehold.co/600x400.png", alt: "A workshop with a guest artist.", hint: "dance workshop" },
];

export default function GalleryPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Gallery</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Capturing the moments of dedication, joy, and artistry that define our institute.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  width={600}
                  height={image.src.includes('600x800') ? 800 : 400}
                  className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
