import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import { RateLimitTracker } from '@/lib/rateLimitTracker';

export async function GET() {
  try {
    await dbConnect();

    const tracker = new RateLimitTracker('gemini-api', 15, 60000);
    
    // Get blog statistics
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ published: true });
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug createdAt category')
      .populate('category', 'name');

    // Get posts created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postsToday = await BlogPost.countDocuments({
      createdAt: { $gte: today }
    });

    return NextResponse.json({
      success: true,
      apiStatus: {
        remainingRequests: tracker.getRemainingRequests(),
        timeUntilReset: tracker.getTimeUntilReset(),
        maxRequests: 15,
      },
      blogStats: {
        totalPosts,
        publishedPosts,
        postsToday,
      },
      recentPosts: recentPosts.map(post => ({
        title: post.title,
        slug: post.slug,
        category: post.category?.name || 'Uncategorized',
        createdAt: post.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch status' },
      { status: 500 }
    );
  }
}