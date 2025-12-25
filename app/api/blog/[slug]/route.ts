import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;

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

    const [prevBlog, nextBlog, relatedBlogs] = await Promise.all([
      BlogPost.findOne({
        published: true,
        _id: { $ne: currentBlog._id },
        createdAt: { $lt: currentBlog.createdAt }
      })
      .sort({ createdAt: -1 })
      .select("title slug")
      .lean(),
      
      BlogPost.findOne({
        published: true,
        _id: { $ne: currentBlog._id },
        createdAt: { $gt: currentBlog.createdAt }
      })
      .sort({ createdAt: 1 })
      .select("title slug")
      .lean(),

      BlogPost.find({
        published: true,
        _id: { $ne: currentBlog._id },
        category: currentBlog.category
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title slug excerpt featuredImage createdAt")
      .populate("category", "name slug")
      .lean()
    ]);

    return NextResponse.json({
      blog: currentBlog,
      navigation: {
        prev: prevBlog,
        next: nextBlog
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