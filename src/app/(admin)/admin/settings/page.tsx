
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const settingsSchema = z.object({
  seo: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    keywords: z.string().min(1, 'Keywords are required'),
  }),
  maintenanceMode: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsAdminPage() {
  const { toast } = useToast();
  
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      seo: {
        title: '',
        description: '',
        keywords: '',
      },
      maintenanceMode: false,
    },
  });

  useEffect(() => {
    const docRef = doc(db, 'settings', 'siteSettings');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        form.reset(doc.data() as SettingsFormData);
      }
    });
    return () => unsubscribe();
  }, [form]);

  const onSubmit = async (values: SettingsFormData) => {
    try {
      await setDoc(doc(db, 'settings', 'siteSettings'), values, { merge: true });
      toast({ title: 'Success', description: 'Settings updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update settings.', variant: 'destructive' });
      console.error('Error updating settings: ', error);
    }
  };

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Site Settings</h1>
            <p className="text-muted-foreground">Manage global settings for your website.</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>SEO Configuration</CardTitle>
              <CardDescription>Manage the Search Engine Optimization settings for your public website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="seo.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Title</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Nithyanruthyaaradana Dance Academy" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Description</FormLabel>
                    <FormControl><Textarea {...field} placeholder="A short description of your academy for search engines." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords (comma-separated)</FormLabel>
                    <FormControl><Input {...field} placeholder="bharatanatyam, classical dance, india, ..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                When enabled, visitors will see a maintenance page instead of the public website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">Enable Maintenance Mode</FormLabel>
                        <CardDescription>
                            {field.value ? "Your site is currently offline." : "Your site is live."}
                        </CardDescription>
                        <FormMessage />
                    </div>
                    <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save All Settings'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
