import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter, NewsletterSubscription } from '@/lib/newsletterService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, name } = body;
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Get client metadata
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const referrer = request.headers.get('referer') || '';
    
    // Prepare subscription data
    const subscription: NewsletterSubscription = {
      email: email.trim(),
      name: name?.trim() || '',
      source: 'website',
      metadata: {
        ip: Array.isArray(ip) ? ip[0] : ip,
        userAgent,
        referrer
      }
    };
    
    // Subscribe to newsletter
    const result = await subscribeToNewsletter(subscription);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
    
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
