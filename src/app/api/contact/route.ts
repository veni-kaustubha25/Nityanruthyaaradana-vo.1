import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fallbackStorage } from '@/lib/fallback-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10 || message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 500 characters' },
        { status: 400 }
      );
    }

    // Try Firebase first, fallback to local storage if not available
    let result;
    let storageType = 'firebase';

    try {
      // Check if Firebase is properly initialized
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'contact_messages'), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'unread', // unread, read, replied
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: 'website_form'
      });

      result = { id: docRef.id };
      console.log('Contact form submitted to Firebase:', {
        id: docRef.id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      });

    } catch (firebaseError) {
      console.warn('Firebase unavailable, using fallback storage:', firebaseError);
      storageType = 'fallback';
      
      // Use fallback storage
      result = await fallbackStorage.addContact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      });
    }

    return NextResponse.json({
      success: true,
      message: `Contact message sent successfully${storageType === 'fallback' ? ' (using temporary storage)' : ''}`,
      id: result.id,
      storageType
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
