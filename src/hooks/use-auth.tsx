'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { LoadingAnimation } from '@/components/ui/loading-animation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useRequireAuth = (redirectTo = '/admin/login') => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      if (!loading && !user) {
        if (pathname !== redirectTo) {
          router.push(redirectTo);
        }
      }
    }, [user, loading, router, redirectTo, pathname]);
  
    if (loading || !user) {
        if (pathname !== redirectTo) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <LoadingAnimation />
                </div>
            );
        }
        return null;
    }
  
    return user;
};
