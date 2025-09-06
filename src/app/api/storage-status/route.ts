import { NextRequest, NextResponse } from 'next/server';
import { fallbackStorage } from '@/lib/fallback-storage';

export async function GET(request: NextRequest) {
  try {
    const stats = fallbackStorage.getStats();
    const admissions = await fallbackStorage.getAdmissions();
    const contacts = await fallbackStorage.getContacts();

    return NextResponse.json({
      success: true,
      stats,
      data: {
        admissions,
        contacts
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting storage status:', error);
    return NextResponse.json(
      { error: 'Failed to get storage status' },
      { status: 500 }
    );
  }
}
