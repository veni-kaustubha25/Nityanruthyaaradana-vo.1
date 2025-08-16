
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Administrator!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the admin dashboard.</p>
          <p className="mt-4">Use the navigation on the left to manage your website's content and settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
