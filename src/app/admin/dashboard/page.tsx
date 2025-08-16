'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { Bar, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from "recharts";

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

  useEffect(() => {
    // For simplicity, we'll assume a 'students' collection exists for student registrations
    const fetchCounts = async () => {
      try {
        const gallerySnapshot = await getDocs(collection(db, "gallery"));
        setGalleryCount(gallerySnapshot.size);
        
        // This is a placeholder for student count.
        // In a real app, you would have a 'students' or 'registrations' collection.
        // For now, I'll use a static number but this is where you'd fetch it.
        setStudentCount(1254);
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

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentCount}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryCount}</div>
            <p className="text-xs text-muted-foreground">+12 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+5 in last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 beginner, 5 intermediate, 4 advanced</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Student Enrollment Overview</CardTitle>
            <CardDescription>Monthly new student registrations.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
             <CardDescription>Distribution of students across courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Bar dataKey="registrations" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
