import { NextRequest, NextResponse } from 'next/server';
import { submitToWaitlist } from '@/lib/waitlist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'That doesn\'t look like a valid email.' },
        { status: 400 }
      );
    }

    const result = await submitToWaitlist(email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong — try again in a moment.' },
      { status: 500 }
    );
  }
}