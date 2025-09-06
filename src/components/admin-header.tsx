'use client';

import { usePathname } from 'next/navigation';
import { Home, Settings, Image as ImageIcon, LayoutTemplate, LayoutPanelLeft, MessageSquare, LogOut, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/admin/pages/home', label: 'Home Page', icon: LayoutTemplate },
  { href: '/admin/pages/about', label: 'About Page', icon: LayoutPanelLeft },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export function AdminHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="flex items-center">
        <SidebarTrigger>
          <button className="p-2 rounded-md hover:bg-accent/10 dark:hover:bg-accent/10">
            <LayoutPanelLeft className="h-6 w-6" />
          </button>
        </SidebarTrigger>
        <h1 className="text-2xl font-semibold ml-4">
          {adminNavItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{user?.email}</span>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            {user?.role}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
