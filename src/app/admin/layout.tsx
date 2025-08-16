'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Image as ImageIcon, LayoutTemplate, LayoutPanelLeft } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/pages/home', label: 'Home Page', icon: LayoutTemplate },
  { href: '/admin/pages/about', label: 'About Page', icon: LayoutPanelLeft },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-background">
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
        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <SidebarTrigger>
              <button className="p-2 rounded-md hover:bg-accent/10 dark:hover:bg-accent/10">
                <LayoutPanelLeft className="h-6 w-6" />
              </button>
            </SidebarTrigger>
            <h1 className="text-2xl font-semibold ml-4">
              {adminNavItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
