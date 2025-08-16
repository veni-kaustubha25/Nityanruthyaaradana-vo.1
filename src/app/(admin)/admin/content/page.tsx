
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2 } from 'lucide-react';

// Schemas
const heroSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
});

const philosophyItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const aboutSchema = z.object({
  story: z.string().min(1, 'Story is required'),
  founder: z.string().min(1, 'Founder section is required'),
  philosophy: z.array(philosophyItemSchema),
});

const formSchema = z.object({
  hero: heroSchema,
  about: aboutSchema,
});

type ContentFormData = z.infer<typeof formSchema>;

export default function ContentAdminPage() {
  const { toast } = useToast();

  const form = useForm<ContentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hero: { headline: '', subheadline: '' },
      about: { story: '', founder: '', philosophy: [] },
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "about.philosophy",
  });

  useEffect(() => {
    const docRef = doc(db, 'content', 'siteContent');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        form.reset(doc.data() as ContentFormData);
      }
    });
    return () => unsubscribe();
  }, [form]);

  const onSubmit = async (values: ContentFormData) => {
    try {
      await setDoc(doc(db, 'content', 'siteContent'), values, { merge: true });
      toast({ title: 'Success', description: 'Content updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update content.', variant: 'destructive' });
      console.error('Error updating content: ', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Website Content</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="homepage">
            <TabsList>
              <TabsTrigger value="homepage">Homepage</TabsTrigger>
              <TabsTrigger value="about">About Page</TabsTrigger>
            </TabsList>
            
            <TabsContent value="homepage" className="mt-6">
              <Card>
                <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hero.headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hero.subheadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subheadline</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader><CardTitle>About Page Content</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="about.story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Our Story Section</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="about.founder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Our Founder Section</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Our Philosophy</h3>
                    {fields.map((item, index) => (
                      <Card key={item.id} className="mb-4 p-4">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`about.philosophy.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`about.philosophy.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Textarea {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                     <Button type="button" variant="outline" onClick={() => append({ title: '', description: '' })}>
                      Add Philosophy Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Button type="submit" className="mt-6" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save All Changes'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
