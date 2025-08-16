
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Badge } from "@/components/ui/badge";

const galleryImages = [
  { src: "/images/1.jpg", alt: "Performance 1", category: "Performance" },
  { src: "/images/2.JPG", alt: "Training 1", category: "Training" },
  { src: "/images/3.jpg", alt: "Event 1", category: "Event" },
  { src: "/images/4.jpg", alt: "Performance 2", category: "Performance" },
  { src: "/images/5.jpg", alt: "Studio", category: "Studio" },
  { src: "/images/6.jpg", alt: "Group Practice", category: "Group Practice" },
  { src: "/images/7.jpg", alt: "Performance 3", category: "Performance" },
  { src: "/images/8.jpg", alt: "Training 2", category: "Training" },
];

export default function GalleryManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gallery Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Image
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative">
                <FallbackImage src={image.src} alt={image.alt} width={400} height={400} className="w-full h-48 object-cover" />
                <Badge variant="secondary" className="absolute top-2 left-2">{image.category}</Badge>
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/30 hover:bg-black/50 text-white hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-card">
              <p className="text-sm font-medium truncate">{image.alt}</p>
            </CardFooter>
          </Card>
        ))}
        <Card className="flex items-center justify-center border-2 border-dashed">
            <Button variant="ghost" className="flex flex-col h-full w-full items-center justify-center text-muted-foreground">
                <PlusCircle className="h-8 w-8 mb-2"/>
                <span>Add New Image</span>
            </Button>
        </Card>
      </div>
    </div>
  );
}
