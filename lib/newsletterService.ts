import { getDatabase } from './dbConnect';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  status?: 'active' | 'unsubscribed' | 'bounced';
  source?: 'website' | 'admin' | 'import';
  tags?: string[];
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
}

export async function subscribeToNewsletter(subscription: NewsletterSubscription): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const db = await getDatabase();
    
    // Check if email already exists
    const existingSubscription = await db.collection('newsletters').findOne({ 
      email: subscription.email.toLowerCase() 
    });
    
    if (existingSubscription) {
      if (existingSubscription.status === 'unsubscribed') {
        // Reactivate unsubscribed user
        const result = await db.collection('newsletters').updateOne(
          { email: subscription.email.toLowerCase() },
          { 
            $set: { 
              status: 'active',
              subscribedAt: new Date(),
              unsubscribedAt: null,
              source: 'website',
              metadata: {
                ...subscription.metadata,
                reactivatedAt: new Date()
              }
            }
          }
        );
        
        if (result.modifiedCount > 0) {
          return {
            success: true,
            message: 'Welcome back! You have been re-subscribed to our newsletter.',
            data: { ...existingSubscription, status: 'active' }
          };
        }
      } else {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        };
      }
    }
    
    // Create new subscription
    const newSubscription = {
      email: subscription.email.toLowerCase(),
      name: subscription.name || '',
      status: 'active',
      source: 'website',
      subscribedAt: new Date(),
      tags: subscription.tags || [],
      metadata: {
        ...subscription.metadata,
        subscribedAt: new Date()
      }
    };
    
    const result = await db.collection('newsletters').insertOne(newSubscription);
    
    if (result.insertedId) {
      return {
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
        data: {
          _id: result.insertedId,
          ...newSubscription
        }
      };
    } else {
      return {
        success: false,
        message: 'Failed to subscribe. Please try again later.'
      };
    }
    
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    // Handle duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      };
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return {
        success: false,
        message: error.message || 'Invalid email address provided.'
      };
    }
    
    return {
      success: false,
      message: 'An error occurred while subscribing. Please try again later.'
    };
  }
}

export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase();
    
    const result = await db.collection('newsletters').updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          status: 'unsubscribed',
          unsubscribedAt: new Date()
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.'
      };
    } else {
      return {
        success: false,
        message: 'Email not found in our subscription list.'
      };
    }
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: 'An error occurred while unsubscribing. Please try again later.'
    };
  }
}

export async function getNewsletterSubscriptions(
  page: number = 1,
  limit: number = 10,
  status?: 'active' | 'unsubscribed' | 'bounced'
): Promise<{ 
  success: boolean; 
  message: string; 
  data?: {
    subscriptions: any[];
    currentPage: number;
    totalPages: number;
    totalSubscriptions: number;
  };
}> {
  try {
    const db = await getDatabase();
    
    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    
    // Get total count
    const totalCount = await db.collection('newsletters').countDocuments(query);
    
    // Calculate pagination
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;
    
    // Get subscriptions
    const subscriptions = await db.collection('newsletters')
      .find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return {
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: {
        subscriptions: subscriptions.map(sub => ({
          ...sub,
          _id: sub._id.toString()
        })),
        currentPage: page,
        totalPages,
        totalSubscriptions: totalCount
      }
    };
    
  } catch (error) {
    console.error('Get newsletter subscriptions error:', error);
    return {
      success: false,
      message: 'An error occurred while retrieving subscriptions.'
    };
  }
}

export async function getNewsletterStats(): Promise<{
  success: boolean;
  message: string;
  data?: {
    total: number;
    active: number;
    unsubscribed: number;
    bounced: number;
    recentSubscriptions: number; // Last 30 days
  };
}> {
  try {
    const db = await getDatabase();
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const [
      totalResult,
      activeResult,
      unsubscribedResult,
      bouncedResult,
      recentResult
    ] = await Promise.all([
      db.collection('newsletters').countDocuments({}),
      db.collection('newsletters').countDocuments({ status: 'active' }),
      db.collection('newsletters').countDocuments({ status: 'unsubscribed' }),
      db.collection('newsletters').countDocuments({ status: 'bounced' }),
      db.collection('newsletters').countDocuments({ 
        subscribedAt: { $gte: thirtyDaysAgo } 
      })
    ]);
    
    return {
      success: true,
      message: 'Stats retrieved successfully',
      data: {
        total: totalResult,
        active: activeResult,
        unsubscribed: unsubscribedResult,
        bounced: bouncedResult,
        recentSubscriptions: recentResult
      }
    };
    
  } catch (error) {
    console.error('Get newsletter stats error:', error);
    return {
      success: false,
      message: 'An error occurred while retrieving stats.'
    };
  }
}
