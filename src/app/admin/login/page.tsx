
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AnimatedLogo } from '@/components/animated-logo';
import { Scale } from '@/components/ui/professional-animations';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase'; // Ensure app is initialized

export default function LoginPage() {
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for the actual login logic.
    // The user needs to create the demo user in Firebase Console first.
    toast({
        title: 'Action Required',
        description: 'Please go to your Firebase Console > Authentication and create a user with email "demo@gmail.com" and password "demo123".',
        variant: 'destructive',
        duration: 9000,
      });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error("Login failed. Please ensure the demo user exists in your Firebase project with the correct credentials.", error);
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please go to your Firebase Console > Authentication and create a user with email "demo@gmail.com" and password "demo123".',
        variant: 'destructive',
        duration: 9000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Scale delay={0.2}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <AnimatedLogo />
            </div>
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={true}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Scale>
    </div>
  );
}
