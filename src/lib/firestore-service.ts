import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our data structures
export interface Review {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  helpful: number;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Admission {
  id: string;
  studentName: string;
  age: number;
  guardianName: string;
  email: string;
  phone: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  course: string;
  experience: string;
  notes: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  uploadDate: string;
  size: string;
  views: number;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DashboardStats {
  totalStudents: number;
  pendingApplications: number;
  totalReviews: number;
  unreadMessages: number;
  galleryImages: number;
  monthlyGrowth: number;
}

// Firestore Service Class
export class FirestoreService {
  // Reviews
  static async getReviews(): Promise<Review[]> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          studentName: data.studentName || data.name || '',
          parentName: data.parentName || '',
          email: data.email || '',
          rating: data.rating || 0,
          title: data.title || '',
          content: data.content || data.comment || '',
          date: data.createdAt?.toDate?.()?.toISOString()?.split('T')[0] || data.date || '',
          status: data.status || (data.isApproved ? 'approved' : 'pending'),
          category: data.category || '',
          helpful: data.helpful || 0,
          verified: data.verified || false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as Review;
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  static async getReviewsRealtime(callback: (reviews: Review[]) => void): Promise<() => void> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const reviews = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            studentName: data.studentName || data.name || '',
            parentName: data.parentName || '',
            email: data.email || '',
            rating: data.rating || 0,
            title: data.title || '',
            content: data.content || data.comment || '',
            date: data.createdAt?.toDate?.()?.toISOString()?.split('T')[0] || data.date || '',
            status: data.status || (data.isApproved ? 'approved' : 'pending'),
            category: data.category || '',
            helpful: data.helpful || 0,
            verified: data.verified || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          } as Review;
        });
        callback(reviews);
      });
    } catch (error) {
      console.error('Error setting up reviews realtime listener:', error);
      return () => {};
    }
  }

  static async updateReviewStatus(reviewId: string, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating review status:', error);
      throw error;
    }
  }

  static async deleteReview(reviewId: string): Promise<void> {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await deleteDoc(reviewRef);
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  // Admissions
  static async getAdmissions(): Promise<Admission[]> {
    try {
      const admissionsRef = collection(db, 'admissions');
      const q = query(admissionsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().date,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      })) as Admission[];
    } catch (error) {
      console.error('Error fetching admissions:', error);
      return [];
    }
  }

  static async getAdmissionsRealtime(callback: (admissions: Admission[]) => void): Promise<() => void> {
    try {
      const admissionsRef = collection(db, 'admissions');
      const q = query(admissionsRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const admissions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().date,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt
        })) as Admission[];
        callback(admissions);
      });
    } catch (error) {
      console.error('Error setting up admissions realtime listener:', error);
      return () => {};
    }
  }

  static async updateAdmissionStatus(admissionId: string, status: 'pending' | 'approved' | 'rejected' | 'waitlisted'): Promise<void> {
    try {
      const admissionRef = doc(db, 'admissions', admissionId);
      await updateDoc(admissionRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating admission status:', error);
      throw error;
    }
  }

  static async deleteAdmission(admissionId: string): Promise<void> {
    try {
      const admissionRef = doc(db, 'admissions', admissionId);
      await deleteDoc(admissionRef);
    } catch (error) {
      console.error('Error deleting admission:', error);
      throw error;
    }
  }

  // Contact Messages
  static async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const messagesRef = collection(db, 'contact_messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().date,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      })) as ContactMessage[];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }

  static async getContactMessagesRealtime(callback: (messages: ContactMessage[]) => void): Promise<() => void> {
    try {
      const messagesRef = collection(db, 'contact_messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().date,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt
        })) as ContactMessage[];
        callback(messages);
      });
    } catch (error) {
      console.error('Error setting up contact messages realtime listener:', error);
      return () => {};
    }
  }

  static async updateContactMessageStatus(messageId: string, status: 'unread' | 'read' | 'replied' | 'archived'): Promise<void> {
    try {
      const messageRef = doc(db, 'contact_messages', messageId);
      await updateDoc(messageRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating contact message status:', error);
      throw error;
    }
  }

  static async deleteContactMessage(messageId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'contact_messages', messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw error;
    }
  }

  // Gallery Images
  static async getGalleryImages(): Promise<GalleryImage[]> {
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(galleryRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadDate: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().uploadDate,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      })) as GalleryImage[];
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }
  }

  static async getGalleryImagesRealtime(callback: (images: GalleryImage[]) => void): Promise<() => void> {
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(galleryRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const images = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          uploadDate: doc.data().createdAt?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().uploadDate,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt
        })) as GalleryImage[];
        callback(images);
      });
    } catch (error) {
      console.error('Error setting up gallery images realtime listener:', error);
      return () => {};
    }
  }

  static async updateGalleryImage(imageId: string, updates: Partial<GalleryImage>): Promise<void> {
    try {
      const imageRef = doc(db, 'gallery', imageId);
      await updateDoc(imageRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  }

  static async deleteGalleryImage(imageId: string): Promise<void> {
    try {
      const imageRef = doc(db, 'gallery', imageId);
      await deleteDoc(imageRef);
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  }

  // Dashboard Stats
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [reviews, admissions, messages, gallery] = await Promise.all([
        this.getReviews(),
        this.getAdmissions(),
        this.getContactMessages(),
        this.getGalleryImages()
      ]);

      const totalStudents = admissions.filter(a => a.status === 'approved').length;
      const pendingApplications = admissions.filter(a => a.status === 'pending').length;
      const totalReviews = reviews.filter(r => r.status === 'approved').length;
      const unreadMessages = messages.filter(m => m.status === 'unread').length;
      const galleryImages = gallery.length;

      // Calculate monthly growth (simplified)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const currentMonthAdmissions = admissions.filter(a => {
        const date = a.createdAt?.toDate?.() || new Date(a.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      }).length;

      const lastMonthAdmissions = admissions.filter(a => {
        const date = a.createdAt?.toDate?.() || new Date(a.date);
        return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
      }).length;

      const monthlyGrowth = lastMonthAdmissions > 0 
        ? ((currentMonthAdmissions - lastMonthAdmissions) / lastMonthAdmissions) * 100 
        : 0;

      return {
        totalStudents,
        pendingApplications,
        totalReviews,
        unreadMessages,
        galleryImages,
        monthlyGrowth: Math.round(monthlyGrowth * 10) / 10
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalStudents: 0,
        pendingApplications: 0,
        totalReviews: 0,
        unreadMessages: 0,
        galleryImages: 0,
        monthlyGrowth: 0
      };
    }
  }

  // Bulk Operations
  static async bulkUpdateReviewStatus(reviewIds: string[], status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    try {
      const promises = reviewIds.map(id => this.updateReviewStatus(id, status));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk updating review status:', error);
      throw error;
    }
  }

  static async bulkUpdateAdmissionStatus(admissionIds: string[], status: 'pending' | 'approved' | 'rejected' | 'waitlisted'): Promise<void> {
    try {
      const promises = admissionIds.map(id => this.updateAdmissionStatus(id, status));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk updating admission status:', error);
      throw error;
    }
  }

  static async bulkUpdateContactMessageStatus(messageIds: string[], status: 'unread' | 'read' | 'replied' | 'archived'): Promise<void> {
    try {
      const promises = messageIds.map(id => this.updateContactMessageStatus(id, status));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk updating contact message status:', error);
      throw error;
    }
  }

  static async bulkDeleteReviews(reviewIds: string[]): Promise<void> {
    try {
      const promises = reviewIds.map(id => this.deleteReview(id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk deleting reviews:', error);
      throw error;
    }
  }

  static async bulkDeleteAdmissions(admissionIds: string[]): Promise<void> {
    try {
      const promises = admissionIds.map(id => this.deleteAdmission(id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk deleting admissions:', error);
      throw error;
    }
  }

  static async bulkDeleteContactMessages(messageIds: string[]): Promise<void> {
    try {
      const promises = messageIds.map(id => this.deleteContactMessage(id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk deleting contact messages:', error);
      throw error;
    }
  }

  static async bulkDeleteGalleryImages(imageIds: string[]): Promise<void> {
    try {
      const promises = imageIds.map(id => this.deleteGalleryImage(id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk deleting gallery images:', error);
      throw error;
    }
  }
}
