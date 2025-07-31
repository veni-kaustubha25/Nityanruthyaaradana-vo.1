
'use client';

import { useEffect, useState, useMemo, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, LayoutDashboard, GalleryHorizontal, Users, Settings, Trash2, Edit, PlusCircle, Check, Zap, BookOpen, Award, Feather, Star, TrendingUp, FileText, Calendar, Smile, Brain, Sprout } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { LoadingAnimation } from '@/components/ui/loading-animation';
import { useToast } from '@/hooks/use-toast';
import { db, app } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Data Interfaces
interface Feature { id: string; icon: string; title: string; description: string; }
interface ClassLevel { id: string; icon: string; title: string; description: string; features: string[]; }
interface Testimonial { id: string; name: string; role: string; quote: string; avatar: string; }
interface Faq { id: string; question: string; answer: string; }
interface Event { id: string; title: string; date: string; description: string; image: string; }
interface WhyItem { id: string; icon: string; title: string; description: string; }

// Available Icons
const ICONS: { [key: string]: ReactNode } = {
    Zap: <Zap />, BookOpen: <BookOpen />, Users: <Users />, Award: <Award />, Feather: <Feather />, Star: <Star />, TrendingUp: <TrendingUp />, Calendar: <Calendar />, Smile: <Smile />, Brain: <Brain />, Sprout: <Sprout />, Default: <Star />,
};
const getIcon = (name: string) => {
    const IconComponent = ICONS[name] || ICONS.Default;
    return React.cloneElement(IconComponent as React.ReactElement, { className: "h-6 w-6" });
}

export default function ManageContentPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // State for all content types
  const [features, setFeatures] = useState<Feature[]>([]);
  const [classLevels, setClassLevels] = useState<ClassLevel[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [whyItems, setWhyItems] = useState<WhyItem[]>([]);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentTab, setCurrentTab] = useState('features');
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Firestore listeners
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/admin/login');
      else setUser(currentUser);
      setLoading(false);
    });

    const unsubscribes = [
      onSnapshot(query(collection(db, 'features'), orderBy('title')), (snapshot) => setFeatures(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feature)))),
      onSnapshot(query(collection(db, 'classLevels'), orderBy('title')), (snapshot) => setClassLevels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClassLevel)))),
      onSnapshot(query(collection(db, 'testimonials'), orderBy('name')), (snapshot) => setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)))),
      onSnapshot(query(collection(db, 'faqs'), orderBy('question')), (snapshot) => setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Faq)))),
      onSnapshot(query(collection(db, 'events'), orderBy('date', 'desc')), (snapshot) => setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event)))),
      onSnapshot(query(collection(db, 'whyBharatanatyam'), orderBy('title')), (snapshot) => setWhyItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WhyItem)))),
    ];

    return () => {
      unsubscribeAuth();
      unsubscribes.forEach(unsub => unsub());
    };
  }, [auth, router]);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  const openModal = (mode: 'add' | 'edit', item: any = null) => {
    setModalMode(mode);
    setCurrentItem(item ? { ...item } : {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setCurrentItem((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;
    setIsSubmitting(true);

    try {
      const collectionName = currentTab === 'why' ? 'whyBharatanatyam' : currentTab;
      if (modalMode === 'add') {
        await addDoc(collection(db, collectionName), currentItem);
        toast({ title: 'Success', description: 'New item added.' });
      } else {
        const { id, ...data } = currentItem;
        await updateDoc(doc(db, collectionName, id), data);
        toast({ title: 'Success', description: 'Item updated.' });
      }
      closeModal();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const collectionName = currentTab === 'why' ? 'whyBharatanatyam' : currentTab;
      await deleteDoc(doc(db, collectionName, id));
      toast({ title: 'Success', description: 'Item deleted.' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const renderFormFields = () => {
    if (!currentItem) return null;
    switch(currentTab) {
      case 'features':
        return (
          <>
            <FormItem label="Icon" name="icon" value={currentItem.icon} onChange={handleFormChange} type="select" options={Object.keys(ICONS)} />
            <FormItem label="Title" name="title" value={currentItem.title} onChange={handleFormChange} />
            <FormItem label="Description" name="description" value={currentItem.description} onChange={handleFormChange} type="textarea" />
          </>
        );
      case 'classLevels':
        return (
          <>
            <FormItem label="Icon" name="icon" value={currentItem.icon} onChange={handleFormChange} type="select" options={Object.keys(ICONS)} />
            <FormItem label="Title" name="title" value={currentItem.title} onChange={handleFormChange} />
            <FormItem label="Description" name="description" value={currentItem.description} onChange={handleFormChange} type="textarea" />
            <FormItem label="Features (comma separated)" name="features" value={currentItem.features?.join(', ')} onChange={(name, value) => handleFormChange(name, value.split(',').map((s:string) => s.trim()))} />
          </>
        );
      case 'testimonials':
        return (
          <>
            <FormItem label="Avatar URL" name="avatar" value={currentItem.avatar} onChange={handleFormChange} />
            <FormItem label="Name" name="name" value={currentItem.name} onChange={handleFormChange} />
            <FormItem label="Role" name="role" value={currentItem.role} onChange={handleFormChange} />
            <FormItem label="Quote" name="quote" value={currentItem.quote} onChange={handleFormChange} type="textarea" />
          </>
        );
      case 'faqs':
        return (
          <>
            <FormItem label="Question" name="question" value={currentItem.question} onChange={handleFormChange} />
            <FormItem label="Answer" name="answer" value={currentItem.answer} onChange={handleFormChange} type="textarea" />
          </>
        );
       case 'events':
        return (
          <>
            <FormItem label="Image URL" name="image" value={currentItem.image} onChange={handleFormChange} />
            <FormItem label="Title" name="title" value={currentItem.title} onChange={handleFormChange} />
            <FormItem label="Date" name="date" value={currentItem.date} onChange={handleFormChange} type="date" />
            <FormItem label="Description" name="description" value={currentItem.description} onChange={handleFormChange} type="textarea" />
          </>
        );
      case 'why':
        return (
          <>
            <FormItem label="Icon" name="icon" value={currentItem.icon} onChange={handleFormChange} type="select" options={Object.keys(ICONS)} />
            <FormItem label="Title" name="title" value={currentItem.title} onChange={handleFormChange} />
            <FormItem label="Description" name="description" value={currentItem.description} onChange={handleFormChange} type="textarea" />
          </>
        );
      default: return null;
    }
  }

  const renderTable = () => {
    switch(currentTab) {
      case 'features':
        return <CrudTable columns={['Icon', 'Title', 'Description']} data={features} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} iconRenderer={getIcon}/>
      case 'classLevels':
        return <CrudTable columns={['Icon', 'Title', 'Description', 'Features']} data={classLevels} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} iconRenderer={getIcon}/>
      case 'testimonials':
        return <CrudTable columns={['Avatar', 'Name', 'Role', 'Quote']} data={testimonials} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} />
      case 'faqs':
        return <CrudTable columns={['Question', 'Answer']} data={faqs} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} />
      case 'events':
        return <CrudTable columns={['Image', 'Title', 'Date', 'Description']} data={events} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} />
      case 'why':
        return <CrudTable columns={['Icon', 'Title', 'Description']} data={whyItems} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} iconRenderer={getIcon} />
      default: return null;
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center"><LoadingAnimation /></div>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card p-4 flex flex-col">
        <div className="mb-8"><AnimatedLogo /></div>
        <nav className="flex-1 space-y-2">
          <Button variant="ghost" asChild className="w-full justify-start text-left"><Link href="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link></Button>
          <Button variant="secondary" asChild className="w-full justify-start text-left"><Link href="/admin/content"><FileText className="mr-2 h-4 w-4" />Manage Content</Link></Button>
          <Button variant="ghost" asChild className="w-full justify-start text-left"><Link href="/admin/gallery"><GalleryHorizontal className="mr-2 h-4 w-4" />Manage Gallery</Link></Button>
          <Button variant="ghost" asChild className="w-full justify-start text-left"><Link href="/admin/students"><Users className="mr-2 h-4 w-4" />Manage Students</Link></Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-left" disabled><Settings className="mr-2 h-4 w-4" />Settings</Button>
          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start text-left mt-2"><LogOut className="mr-2 h-4 w-4" />Logout</Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Manage Website Content</h1>
          {user && <div className="text-right"><p className="font-semibold">{user.displayName || user.email}</p><p className="text-sm text-muted-foreground">Administrator</p></div>}
        </header>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="classLevels">Classes</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="why">Why Bharatanatyam</TabsTrigger>
          </TabsList>
          
          <Card className="mt-4">
              <CardHeader>
                  <div className="flex justify-between items-center">
                      <div>
                           <CardTitle>{`Manage ${currentTab === 'why' ? 'Why Bharatanatyam' : currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}`}</CardTitle>
                          <CardDescription>Add, edit, or delete items for this section.</CardDescription>
                      </div>
                      <Button onClick={() => openModal('add')}>
                          <PlusCircle className="mr-2 h-4 w-4" /> Add New
                      </Button>
                  </div>
              </CardHeader>
              <CardContent>
                {renderTable()}
              </CardContent>
          </Card>
        </Tabs>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modalMode === 'add' ? 'Add New' : 'Edit'} {currentTab === 'why' ? 'Item' : currentTab.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {renderFormFields()}
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <LoadingAnimation size="sm" /> : 'Save'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

// Reusable Components for this page

const CrudTable = ({ columns, data, onEdit, onDelete, iconRenderer }: { columns: string[], data: any[], onEdit: (item: any) => void, onDelete: (id: string) => void, iconRenderer?: (name: string) => ReactNode }) => (
    <Table>
        <TableHeader>
            <TableRow>
                {columns.map(col => <TableHead key={col}>{col}</TableHead>)}
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map(item => (
                <TableRow key={item.id}>
                    {columns.map(col => (
                        <TableCell key={col} className="max-w-xs truncate">
                            {col.toLowerCase() === 'icon' && iconRenderer ? iconRenderer(item.icon) : 
                             col.toLowerCase() === 'features' ? item.features.join(', ') : 
                             col.toLowerCase() === 'avatar' || col.toLowerCase() === 'image' ? <img src={item[col.toLowerCase()]} alt={item.name || item.title} className="w-10 h-10 rounded-full object-cover" /> : 
                             item[col.toLowerCase().replace(/\s/g, '')]}
                        </TableCell>
                    ))}
                    <TableCell>
                        <div className="flex gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => onDelete(item.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

const FormItem = ({ label, name, value, onChange, type = 'text', options }: { label: string, name: string, value: any, onChange: (name: string, value: any) => void, type?: string, options?: string[] }) => {
    if (type === 'select') {
        return (
            <div>
                <Label htmlFor={name}>{label}</Label>
                <Select value={value} onValueChange={(val) => onChange(name, val)}>
                    <SelectTrigger id={name}><SelectValue placeholder={`Select a ${label.toLowerCase()}`} /></SelectTrigger>
                    <SelectContent>
                        {options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        );
    }
    if (type === 'date') {
        return(
             <div>
                <Label htmlFor={name}>{label}</Label>
                <Input id={name} type="date" value={value || ''} onChange={(e) => onChange(name, e.target.value)} placeholder={label} />
            </div>
        )
    }
    const Cmp = type === 'textarea' ? Textarea : Input;
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Cmp id={name} value={value || ''} onChange={(e) => onChange(name, e.target.value)} placeholder={label} />
        </div>
    );
};

    