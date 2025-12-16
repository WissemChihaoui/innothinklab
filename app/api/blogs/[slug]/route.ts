import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();

    const { slug } = context.params;

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
      _id: { $ne: currentBlog._id },
      createdAt: { $lt: currentBlog.createdAt }
    })
      .sort({ createdAt: -1 })
      .select("title slug")
      .lean();

    // Get next blog (newer)
    const nextBlog = await BlogPost.findOne({
      published: true,
      _id: { $ne: currentBlog._id },
      createdAt: { $gt: currentBlog.createdAt }
    })
      .sort({ createdAt: 1 })
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
    console.error("Error fetching blog post:", error);

    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
