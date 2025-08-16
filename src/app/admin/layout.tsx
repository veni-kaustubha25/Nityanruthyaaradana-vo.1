
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Home, Settings, Image as ImageIcon, LayoutTemplate,LayoutPanelLeft } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/admin/dashboard" isActive>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/admin/gallery">
                    <ImageIcon />
                    <span>Gallery</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/admin/pages/home">
                    <LayoutTemplate />
                    <span>Home Page</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/admin/pages/about">
                    <LayoutPanelLeft />
                    <span>About Page</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/admin/settings">
                    <Settings />
                    <span>Site Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 p-6 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="flex items-center mb-6">
                <SidebarTrigger>
                  <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    <LayoutPanelLeft className="h-6 w-6" />
                  </button>
                </SidebarTrigger>
                <h1 className="text-2xl font-semibold ml-4">Dashboard</h1>
              </div>
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
