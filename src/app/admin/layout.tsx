import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, NotebookText, Users, GalleryHorizontal, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin" tooltip="Dashboard">
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/courses" tooltip="Courses">
                  <NotebookText />
                  <span>Courses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/students" tooltip="Students">
                  <Users />
                  <span>Students</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/gallery" tooltip="Gallery">
                  <GalleryHorizontal />
                  <span>Gallery</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter>
            <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="woman professional" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <p className="font-semibold text-sm">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@nithyanruthyaaradana.art</p>
                </div>
                 <Button variant="ghost" size="icon" className="shrink-0">
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10">
                <SidebarTrigger className="md:hidden"/>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </header>
            <main className="p-4">{children}</main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
