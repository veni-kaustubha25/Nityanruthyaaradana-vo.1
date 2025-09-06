'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  Settings, 
  Image as ImageIcon, 
  LayoutTemplate, 
  LayoutPanelLeft, 
  MessageSquare,
  Menu,
  X,
  LogOut,
  User,
  Users,
  Mail,
  BarChart3,
  Shield,
  Bell,
  Search,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AuthProvider } from '@/contexts/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';

const adminNavItems = [
  { 
    href: '/admin/dashboard', 
    label: 'Dashboard', 
    icon: Home,
    badge: null,
    description: 'Overview and analytics'
  },
  { 
    href: '/admin/gallery', 
    label: 'Gallery', 
    icon: ImageIcon,
    badge: null,
    description: 'Manage images and media'
  },
  { 
    href: '/admin/reviews', 
    label: 'Reviews', 
    icon: MessageSquare,
    badge: '3',
    description: 'Student testimonials'
  },
  { 
    href: '/admin/admissions', 
    label: 'Admissions', 
    icon: Users,
    badge: '12',
    description: 'Student applications'
  },
  { 
    href: '/admin/contact', 
    label: 'Contact Messages', 
    icon: Mail,
    badge: '5',
    description: 'Inquiries and support'
  },
  { 
    href: '/admin/pages/home', 
    label: 'Home Page', 
    icon: LayoutTemplate,
    badge: null,
    description: 'Homepage content'
  },
  { 
    href: '/admin/pages/about', 
    label: 'About Page', 
    icon: LayoutPanelLeft,
    badge: null,
    description: 'About page content'
  },
  { 
    href: '/admin/settings', 
    label: 'Settings', 
    icon: Settings,
    badge: null,
    description: 'Site configuration'
  },
];

function ProfessionalAdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-primary/20 bg-gradient-to-b from-background via-background to-primary/5">
      <SidebarHeader className="border-b border-primary/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">N</span>
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Nithyanruthyaaradana</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <div className="space-y-2">
          {adminNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  className={`w-full justify-start px-4 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'hover:bg-primary/10 hover:text-foreground'
                  }`}
                >
                  <Link href={item.href} className="flex items-center space-x-3 relative z-10">
                    <item.icon className={`h-5 w-5 transition-colors ${
                      pathname === item.href ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={pathname === item.href ? "secondary" : "outline"}
                            className={`text-xs ${
                              pathname === item.href 
                                ? 'bg-primary-foreground/20 text-primary-foreground' 
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${
                        pathname === item.href ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </SidebarMenuButton>
                {pathname === item.href && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-md"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </SidebarMenuItem>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-card/50 rounded-lg border border-primary/10">
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">New Reviews</span>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">3</Badge>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Pending Applications</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">12</Badge>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Unread Messages</span>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">5</Badge>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function MobileProfessionalSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden fixed top-4 left-4 z-50 bg-background/95 backdrop-blur-sm border-primary/20 shadow-lg"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] p-0 bg-background border-primary/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">N</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
                  <p className="text-sm text-muted-foreground">Nithyanruthyaaradana</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {adminNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-foreground hover:bg-primary/10'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${
                      pathname === item.href ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={pathname === item.href ? "secondary" : "outline"}
                            className={`text-xs ${
                              pathname === item.href 
                                ? 'bg-primary-foreground/20 text-primary-foreground' 
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${
                        pathname === item.href ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProfessionalAdminHeader() {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-primary/20 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Desktop Sidebar Trigger */}
        <div className="hidden lg:flex items-center space-x-4">
          <SidebarTrigger className="p-2 hover:bg-primary/10 rounded-lg transition-colors" />
          <div className="h-6 w-px bg-primary/20" />
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search admin panel..." 
              className="w-64 bg-card/50 border-primary/20 focus:border-primary/40"
            />
          </div>
        </div>

        {/* Mobile Title */}
        <div className="lg:hidden">
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 hover:bg-primary/10"
          >
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-primary/10"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={user?.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-sm border-primary/20" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {user?.role} • Online
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem className="hover:bg-primary/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem 
                onClick={logout}
                className="text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function ProfessionalAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SidebarProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Mobile Sidebar */}
            <MobileProfessionalSidebar />
            
            {/* Desktop Layout */}
            <div className="hidden lg:flex min-h-screen">
              <ProfessionalAdminSidebar />
              <div className="flex-1 flex flex-col">
                <ProfessionalAdminHeader />
                <main className="flex-1 p-6 overflow-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-7xl mx-auto"
                  >
                    {children}
                  </motion.div>
                </main>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              <ProfessionalAdminHeader />
              <main className="p-4 pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}
