import { getDatabase } from './dbConnect';

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
  source?: 'contact' | 'quote' | 'support' | 'general';
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
    country?: string;
    city?: string;
  };
}

export async function sendContactMessage(messageData: ContactMessage): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const db = await getDatabase();
    
    // Create new message
    const newMessage = {
      name: messageData.name.trim(),
      email: messageData.email.trim().toLowerCase(),
      phone: messageData.phone?.trim() || '',
      company: messageData.company?.trim() || '',
      subject: messageData.subject.trim(),
      message: messageData.message.trim(),
      status: 'unread',
      priority: messageData.priority || 'medium',
      source: messageData.source || 'contact',
      metadata: {
        ...messageData.metadata,
        submittedAt: new Date()
      }
    };
    
    // Validate required fields
    if (!newMessage.name || !newMessage.email || !newMessage.subject || !newMessage.message) {
      return {
        success: false,
        message: 'All required fields must be filled out.'
      };
    }
    
    // Basic email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(newMessage.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }
    
    // Length validations
    if (newMessage.name.length > 100) {
      return {
        success: false,
        message: 'Name cannot exceed 100 characters.'
      };
    }
    
    if (newMessage.subject.length > 200) {
      return {
        success: false,
        message: 'Subject cannot exceed 200 characters.'
      };
    }
    
    if (newMessage.message.length > 2000) {
      return {
        success: false,
        message: 'Message cannot exceed 2000 characters.'
      };
    }
    
    if (newMessage.phone && newMessage.phone.length > 20) {
      return {
        success: false,
        message: 'Phone cannot exceed 20 characters.'
      };
    }
    
    if (newMessage.company && newMessage.company.length > 100) {
      return {
        success: false,
        message: 'Company name cannot exceed 100 characters.'
      };
    }
    
    const result = await db.collection('messages').insertOne(newMessage);
    
    if (result.insertedId) {
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        data: {
          _id: result.insertedId,
          ...newMessage
        }
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
    
  } catch (error: any) {
    console.error('Contact message error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return {
        success: false,
        message: error.message || 'Invalid data provided.'
      };
    }
    
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.'
    };
  }
}

export async function getContactMessages(
  page: number = 1,
  limit: number = 10,
  status?: 'unread' | 'read' | 'replied' | 'archived',
  priority?: 'low' | 'medium' | 'high'
): Promise<{ 
  success: boolean; 
  message: string; 
  data?: {
    messages: any[];
    currentPage: number;
    totalPages: number;
    totalMessages: number;
  };
}> {
  try {
    const db = await getDatabase();
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    // Get total count
    const totalCount = await db.collection('messages').countDocuments(query);
    
    // Calculate pagination
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;
    
    // Get messages
    const messages = await db.collection('messages')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return {
      success: true,
      message: 'Messages retrieved successfully',
      data: {
        messages: messages.map(msg => ({
          ...msg,
          _id: msg._id.toString()
        })),
        currentPage: page,
        totalPages,
        totalMessages: totalCount
      }
    };
    
  } catch (error) {
    console.error('Get contact messages error:', error);
    return {
      success: false,
      message: 'An error occurred while retrieving messages.'
    };
  }
}

export async function updateMessageStatus(
  messageId: string,
  status: 'unread' | 'read' | 'replied' | 'archived'
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase();
    
    const result = await db.collection('messages').updateOne(
      { _id: new (require('mongodb').ObjectId)(messageId) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: 'Message status updated successfully.'
      };
    } else {
      return {
        success: false,
        message: 'Message not found or status unchanged.'
      };
    }
    
  } catch (error) {
    console.error('Update message status error:', error);
    return {
      success: false,
      message: 'An error occurred while updating message status.'
    };
  }
}

export async function replyToMessage(
  messageId: string,
  replyContent: string,
  repliedBy: string
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase();
    
    const result = await db.collection('messages').updateOne(
      { _id: new (require('mongodb').ObjectId)(messageId) },
      { 
        $set: { 
          status: 'replied',
          reply: {
            content: replyContent,
            repliedBy: new (require('mongodb').ObjectId)(repliedBy),
            repliedAt: new Date()
          },
          updatedAt: new Date()
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: 'Reply sent successfully.'
      };
    } else {
      return {
        success: false,
        message: 'Message not found.'
      };
    }
    
  } catch (error) {
    console.error('Reply to message error:', error);
    return {
      success: false,
      message: 'An error occurred while sending reply.'
    };
  }
}

export async function getContactStats(): Promise<{
  success: boolean;
  message: string;
  data?: {
    total: number;
    unread: number;
    read: number;
    replied: number;
    archived: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    recentMessages: number; // Last 7 days
  };
}> {
  try {
    const db = await getDatabase();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const [
      totalResult,
      unreadResult,
      readResult,
      repliedResult,
      archivedResult,
      highPriorityResult,
      mediumPriorityResult,
      lowPriorityResult,
      recentResult
    ] = await Promise.all([
      db.collection('messages').countDocuments({}),
      db.collection('messages').countDocuments({ status: 'unread' }),
      db.collection('messages').countDocuments({ status: 'read' }),
      db.collection('messages').countDocuments({ status: 'replied' }),
      db.collection('messages').countDocuments({ status: 'archived' }),
      db.collection('messages').countDocuments({ priority: 'high' }),
      db.collection('messages').countDocuments({ priority: 'medium' }),
      db.collection('messages').countDocuments({ priority: 'low' }),
      db.collection('messages').countDocuments({ 
        createdAt: { $gte: sevenDaysAgo } 
      })
    ]);
    
    return {
      success: true,
      message: 'Stats retrieved successfully',
      data: {
        total: totalResult,
        unread: unreadResult,
        read: readResult,
        replied: repliedResult,
        archived: archivedResult,
        highPriority: highPriorityResult,
        mediumPriority: mediumPriorityResult,
        lowPriority: lowPriorityResult,
        recentMessages: recentResult
      }
    };
    
  } catch (error) {
    console.error('Get contact stats error:', error);
    return {
      success: false,
      message: 'An error occurred while retrieving stats.'
    };
  }
}
