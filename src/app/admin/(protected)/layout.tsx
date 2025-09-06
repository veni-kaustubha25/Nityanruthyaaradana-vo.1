'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Image as ImageIcon, LayoutTemplate, LayoutPanelLeft, MessageSquare } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { AuthProvider } from '@/contexts/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { AdminHeader } from '@/components/admin-header';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/admin/pages/home', label: 'Home Page', icon: LayoutTemplate },
  { href: '/admin/pages/about', label: 'About Page', icon: LayoutPanelLeft },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SidebarProvider>
          <div className="min-h-screen flex">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
              <AdminHeader />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}
