
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { Image as ImageIcon, MessageSquare, FileText, Settings } from 'lucide-react';

// Prevent prerendering to avoid Firebase build-time errors
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [galleryCount, setGalleryCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchCounts = async () => {
      try {
        const gallerySnapshot = await getDocs(collection(db, "gallery"));
        setGalleryCount(gallerySnapshot.size);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };
    fetchCounts();

    const galleryQuery = query(collection(db, "gallery"));
    const unsubscribe = onSnapshot(galleryQuery, (snapshot) => {
        setGalleryCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  if (!isClient) {
    return null;
  }

  const statCards = [
    { title: "Gallery Images", value: galleryCount, icon: ImageIcon, change: "+12", changeColor: "text-green-500" },
    { title: "New Inquiries", value: 32, icon: MessageSquare, change: "+5", changeColor: "text-green-500" },
    { title: "Content Pages", value: 4, icon: FileText, change: "2 updated", changeColor: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title} className="bg-card hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${card.changeColor}`}>{card.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
            <CardDescription>Current content status across the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">Gallery Images</span>
                <span className="text-sm text-muted-foreground">{galleryCount} images</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">Features</span>
                <span className="text-sm text-muted-foreground">4 active</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">FAQs</span>
                <span className="text-sm text-muted-foreground">3 published</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Site Activity</CardTitle>
            <CardDescription>Recent activity and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">Last Update</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">New Images</span>
                <span className="text-sm text-muted-foreground">3 added</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm font-medium">Content Changes</span>
                <span className="text-sm text-muted-foreground">5 updates</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
