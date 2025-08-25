
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { Bar, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from "recharts";
import { Users, Image as ImageIcon, BookOpen, MessageSquare } from 'lucide-react';

const chartData = [
  { month: "January", registrations: 186 },
  { month: "February", registrations: 305 },
  { month: "March", registrations: 237 },
  { month: "April", registrations: 273 },
  { month: "May", registrations: 209 },
  { month: "June", registrations: 250 },
];

export default function DashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchCounts = async () => {
      try {
        const gallerySnapshot = await getDocs(collection(db, "gallery"));
        setGalleryCount(gallerySnapshot.size);
        setStudentCount(1254); // Placeholder
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
    { title: "Total Students", value: studentCount, icon: Users, change: "+20.1%", changeColor: "text-green-500" },
    { title: "Gallery Images", value: galleryCount, icon: ImageIcon, change: "+12", changeColor: "text-green-500" },
    { title: "New Inquiries", value: 32, icon: MessageSquare, change: "+5", changeColor: "text-green-500" },
    { title: "Active Courses", value: 12, icon: BookOpen, change: "3 new", changeColor: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Student Enrollment Overview</CardTitle>
            <CardDescription>Monthly new student registrations.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
             <CardDescription>Distribution of students across courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                     <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
