import { NextRequest, NextResponse } from 'next/server';
import { sendContactMessage, ContactMessage } from '@/lib/contactService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message, phone, company } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled out' },
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
    
    // Prepare message data
    const messageData: ContactMessage = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      source: 'contact',
      priority: 'medium',
      metadata: {
        ip: Array.isArray(ip) ? ip[0] : ip,
        userAgent,
        referrer
      }
    };
    
    // Send contact message
    const result = await sendContactMessage(messageData);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
    
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
