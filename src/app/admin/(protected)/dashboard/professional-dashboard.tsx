'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  Mail,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Eye,
  Download,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FirestoreService, DashboardStats, Review, Admission, ContactMessage, GalleryImage } from '@/lib/firestore-service';

interface RecentActivity {
  id: string;
  type: 'application' | 'review' | 'message' | 'gallery';
  title: string;
  description: string;
  timestamp: string;
  status: 'new' | 'pending' | 'approved' | 'rejected';
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'application': return Users;
    case 'review': return Star;
    case 'message': return Mail;
    case 'gallery': return ImageIcon;
    default: return Activity;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-accent text-accent-foreground';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function ProfessionalDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    pendingApplications: 0,
    totalReviews: 0,
    unreadMessages: 0,
    galleryImages: 0,
    monthlyGrowth: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dashboard stats
        const dashboardStats = await FirestoreService.getDashboardStats();
        setStats(dashboardStats);

        // Fetch recent activity from all collections
        const [reviews, admissions, messages, gallery] = await Promise.all([
          FirestoreService.getReviews(),
          FirestoreService.getAdmissions(),
          FirestoreService.getContactMessages(),
          FirestoreService.getGalleryImages()
        ]);

        // Create recent activity items
        const activities: RecentActivity[] = [];

        // Add recent admissions
        admissions.slice(0, 2).forEach(admission => {
          activities.push({
            id: admission.id,
            type: 'application',
            title: 'New Student Application',
            description: `${admission.studentName || 'Unknown Student'} submitted an application for ${admission.course || 'dance'} classes`,
            timestamp: getTimeAgo(admission.createdAt?.toDate?.() || new Date(admission.date || new Date())),
            status: admission.status === 'pending' ? 'pending' : admission.status === 'approved' ? 'approved' : 'rejected'
          });
        });

        // Add recent reviews
        reviews.slice(0, 2).forEach(review => {
          activities.push({
            id: review.id,
            type: 'review',
            title: 'New Review Submitted',
            description: `${review.studentName || 'Anonymous'} left a ${review.rating || 0}-star review`,
            timestamp: getTimeAgo(review.createdAt?.toDate?.() || new Date(review.date || new Date())),
            status: review.status === 'pending' ? 'pending' : review.status === 'approved' ? 'approved' : 'rejected'
          });
        });

        // Add recent messages
        messages.slice(0, 2).forEach(message => {
          activities.push({
            id: message.id,
            type: 'message',
            title: 'Contact Form Submission',
            description: `${message.name || 'Anonymous'} sent: ${message.subject || 'No Subject'}`,
            timestamp: getTimeAgo(message.createdAt?.toDate?.() || new Date(message.date || new Date())),
            status: message.status === 'unread' ? 'new' : 'approved'
          });
        });

        // Sort by timestamp and take the most recent 4
        activities.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeB - timeA;
        });

        setRecentActivity(activities.slice(0, 4));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Active enrolled students'
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      change: '+3',
      changeType: 'neutral' as const,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Awaiting review'
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews,
      change: '+8%',
      changeType: 'positive' as const,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      description: 'Student testimonials'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      change: '-2',
      changeType: 'negative' as const,
      icon: Mail,
      color: 'from-red-500 to-red-600',
      description: 'Contact inquiries'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening at your academy.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Welcome back! Here's what's happening at your academy.
          </motion.p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-primary/20">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-primary/20 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`flex items-center text-xs ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                  }`}>
                    {stat.changeType === 'positive' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {stat.changeType === 'negative' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </div>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your academy</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View All</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Analytics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-primary/20">
                  <Users className="h-4 w-4 mr-2" />
                  Review Applications
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/20">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Moderate Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/20">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Gallery Images
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/20">
                  <Mail className="h-4 w-4 mr-2" />
                  Reply to Messages
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Performance</CardTitle>
                <CardDescription>This month's metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Student Growth</span>
                    <span className="text-sm text-green-600">+23.5%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Review Rating</span>
                    <span className="text-sm text-primary">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-muted-foreground">2.4h</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
