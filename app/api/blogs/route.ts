import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 6; // or any default limit you prefer
    const skip = (page - 1) * limit;

    // Build the query
    const query: any = { published: true };
    
    if (category) {
      // Find category by slug to get its ID
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        // If category not found, return empty results
        return NextResponse.json({
          data: [],
          pagination: {
            total: 0,
            page,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: page > 1,
          },
        });
      }
    }

    if (tag) {
      // Find tag by slug to get its ID
      const tagDoc = await Tag.findOne({ slug: tag });
      if (tagDoc) {
        query.tags = tagDoc._id;
      } else {
        // If tag not found, return empty results
        return NextResponse.json({
          data: [],
          pagination: {
            total: 0,
            page,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: page > 1,
          },
        });
      }
    }
    
    // Get total count for pagination
    const total = await BlogPost.countDocuments(query);
    
    // Get paginated results
    const blogs = await BlogPost.find(query)
      .populate('category tags')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data: blogs,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}