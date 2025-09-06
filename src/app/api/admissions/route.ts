import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fallbackStorage } from '@/lib/fallback-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { studentName, age, guardianName, email, phone } = body;
    
    if (!studentName || !age || !guardianName || !email || !phone) {
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

    // Validate phone format
    const phoneRegex = /^[0-9\s+-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
      return NextResponse.json(
        { error: 'Age must be between 5 and 100' },
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
      const docRef = await addDoc(collection(db, 'admissions'), {
        studentName: studentName.trim(),
        age: ageNum,
        guardianName: guardianName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        status: 'pending', // pending, reviewed, accepted, rejected
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: 'website_form'
      });

      result = { id: docRef.id };
      console.log('Admission form submitted to Firebase:', {
        id: docRef.id,
        studentName,
        age: ageNum,
        guardianName,
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      });

    } catch (firebaseError) {
      console.warn('Firebase unavailable, using fallback storage:', firebaseError);
      storageType = 'fallback';
      
      // Use fallback storage
      result = await fallbackStorage.addAdmission({
        studentName: studentName.trim(),
        age: ageNum,
        guardianName: guardianName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      });
    }

    return NextResponse.json({
      success: true,
      message: `Admission form submitted successfully${storageType === 'fallback' ? ' (using temporary storage)' : ''}`,
      id: result.id,
      storageType
    });

  } catch (error) {
    console.error('Error submitting admission form:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Firebase')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again later.' },
          { status: 503 }
        );
      }
      if (error.message.includes('permission')) {
        return NextResponse.json(
          { error: 'Permission denied. Please contact support.' },
          { status: 403 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to submit admission form. Please try again.' },
      { status: 500 }
    );
  }
}
