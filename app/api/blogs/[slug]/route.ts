import dbConnect from "@/lib/dbConnect";
import BlogPost, { IBlogPost } from "@/models/BlogPost";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    
    // Get the current blog post
    const currentBlog = await BlogPost.findOne({ slug, published: true })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .lean();

    if (!currentBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Get previous blog (older)
    const prevBlog = await BlogPost.findOne({
      published: true,
      _id: { $ne: currentBlog._id }, // Exclude current blog
      createdAt: { $lt: currentBlog.createdAt } // Older than current
    })
      .sort({ createdAt: -1 }) // Get the most recent one before current
      .select("title slug")
      .lean();

    // Get next blog (newer)
    const nextBlog = await BlogPost.findOne({
      published: true,
      _id: { $ne: currentBlog._id }, // Exclude current blog
      createdAt: { $gt: currentBlog.createdAt } // Newer than current
    })
      .sort({ createdAt: 1 }) // Get the oldest one after current
      .select("title slug")
      .lean();

    // Get related blogs (same category, exclude current)
    const relatedBlogs = await BlogPost.find({
      published: true,
      _id: { $ne: currentBlog._id },
      category: currentBlog.category
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title slug excerpt featuredImage createdAt")
      .populate("category", "name slug")
      .lean();

    return NextResponse.json({
      blog: currentBlog,
      navigation: {
        prev: prevBlog || null,
        next: nextBlog || null
      },
      related: relatedBlogs
    });

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}