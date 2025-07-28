import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function AdminCoursesPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Courses</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Course List</CardTitle>
                    <CardDescription>View and manage course details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Course management interface will be here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
