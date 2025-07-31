'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, LayoutDashboard, GalleryHorizontal, Users, Settings } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { app } from '@/lib/firebase'; // Ensure app is initialized

export default function DashboardPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

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
            <Link href="/admin/gallery">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Manage Gallery
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            <Users className="mr-2 h-4 w-4" />
            Manage Students
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-left">
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
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          {user && (
            <div className="text-right">
              <p className="font-semibold">{user.displayName || user.email}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add, edit, or remove images from the website gallery.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/gallery">Go to Gallery</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage student registrations and information.</p>
              <Button className="mt-4">Go to Students</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Update general website settings and contact information.</p>
              <Button className="mt-4">Go to Settings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}