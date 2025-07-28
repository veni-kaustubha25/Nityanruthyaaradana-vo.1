import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function AdminStudentsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Students</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Student Registrations</CardTitle>
                    <CardDescription>View and manage student applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Student registration management interface will be here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
