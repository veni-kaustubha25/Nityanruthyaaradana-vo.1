import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UploadCloud, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  { src: "https://placehold.co/600x400.png", alt: "A graceful solo performance.", hint: "solo dance performance", uploaded: "2023-10-21" },
  { src: "https://placehold.co/600x800.png", alt: "Dancer in an expressive pose.", hint: "bharatanatyam posture", uploaded: "2023-10-20" },
  { src: "https://placehold.co/600x400.png", alt: "Group of students in a dance class.", hint: "dance class", uploaded: "2023-10-19" },
  { src: "https://placehold.co/600x400.png", alt: "Colorful costumes for a stage show.", hint: "dance costumes", uploaded: "2023-10-18" },
  { src: "https://placehold.co/600x800.png", alt: "A close-up of intricate hand gestures (mudras).", hint: "dance mudra", uploaded: "2023-10-17" },
  { src: "https://placehold.co/600x400.png", alt: "Annual day celebration on stage.", hint: "stage performance", uploaded: "2023-10-16" },
];

export default function AdminGalleryPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Gallery</h2>
                <Button>
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Gallery Images</CardTitle>
                    <CardDescription>Organize and update the image gallery.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryItems.map((item, index) => (
                            <div key={index} className="relative group border rounded-lg overflow-hidden">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    data-ai-hint={item.hint}
                                    width={600}
                                    height={item.src.includes('600x800') ? 800 : 400}
                                    className="w-full h-auto object-cover aspect-[3/2]"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                    <div className="flex justify-end">
                                        <Button size="icon" variant="ghost" className="text-white hover:bg-black/50 hover:text-white">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="text-white">
                                        <p className="text-xs text-white/80">Uploaded: {item.uploaded}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
