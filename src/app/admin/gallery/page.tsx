import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

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
                    <p>Gallery management interface will be here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
