
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Administrator!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as: {user?.email}</p>
          <p className="mt-4">Use the navigation on the left to manage your website's content and settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
