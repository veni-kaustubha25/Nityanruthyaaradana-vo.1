
'use client';

import { useEffect, useState, useMemo } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, onSnapshot, doc, deleteDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, LayoutDashboard, GalleryHorizontal, Users, Settings, Trash2, ArrowUpDown, FileText } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { useToast } from '@/hooks/use-toast';
import { db, app } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';

interface Student {
  id: string;
  studentName: string;
  age: number;
  guardianName: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
}

type SortKey = 'studentName' | 'age' | 'createdAt';

export default function ManageStudentsPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({ key: 'createdAt', direction: 'descending' });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    const studentsCollection = query(collection(db, 'students'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(studentsCollection, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [auth, router]);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await deleteDoc(doc(db, 'students', studentId));
      toast({
        title: 'Student Deleted',
        description: 'The student record has been successfully removed.',
      });
    } catch (error: any) {
      toast({
        title: 'Error Deleting Student',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = useMemo(() => {
    let sortableItems = [...students];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [students, sortConfig]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-4 flex flex-col">
        <div className="mb-8">
          <AnimatedLogo />
        </div>
        <nav className="flex-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
           <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/content">
              <FileText className="mr-2 h-4 w-4" />
              Manage Content
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left" asChild>
            <Link href="/admin/gallery">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Manage Gallery
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start text-left" asChild>
            <Link href="/admin/students">
              <Users className="mr-2 h-4 w-4" />
              Manage Students
            </Link>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-left" disabled>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start text-left mt-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Manage Students</h1>
          {user && (
            <div className="text-right">
              <p className="font-semibold">{user.displayName || user.email}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          )}
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Student Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('studentName')}>
                      Student Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                     <Button variant="ghost" onClick={() => requestSort('age')}>
                      Age
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Guardian Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('createdAt')}>
                      Registered On
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.guardianName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      {student.createdAt ? format(student.createdAt.toDate(), 'PPP p') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="destructive" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the student's registration record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {students.length === 0 && !loading && (
              <div className="text-center p-8 text-muted-foreground">
                No student registrations found.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
