import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const students = [
  {
    id: "S001",
    name: "Ananya Sharma",
    email: "ananya.s@example.com",
    course: "Foundations of Bharatanatyam",
    joinDate: "2023-01-15",
    status: "Active",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "indian woman"
  },
  {
    id: "S002",
    name: "Rohan Gupta",
    email: "rohan.g@example.com",
    course: "Developing Artistry",
    joinDate: "2022-08-20",
    status: "Active",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "indian man"
  },
  {
    id: "S003",
    name: "Priya Patel",
    email: "priya.p@example.com",
    course: "Foundations of Bharatanatyam",
    joinDate: "2023-09-01",
    status: "Pending",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "young indian woman"
  },
  {
    id: "S004",
    name: "Aditya Singh",
    email: "aditya.s@example.com",
    course: "Mastery and Performance",
    joinDate: "2021-03-10",
    status: "Inactive",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "man professional"
  },
];


export default function AdminStudentsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Students</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Student Registrations</CardTitle>
                    <CardDescription>View and manage all student applications and profiles.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={student.avatar} alt={student.name} data-ai-hint={student.avatarHint} />
                                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{student.name}</p>
                                                <p className="text-sm text-muted-foreground">{student.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell>{student.joinDate}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                student.status === 'Active' ? 'default'
                                                : student.status === 'Pending' ? 'secondary'
                                                : 'destructive'
                                            }
                                            className={student.status === 'Inactive' ? 'bg-muted-foreground/20 text-muted-foreground' : ''}
                                        >
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Approve Registration</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
