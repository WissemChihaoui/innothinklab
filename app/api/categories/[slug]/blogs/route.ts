import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import Category from '@/models/Category';

export const revalidate = 300;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Find category by slug
    const category = await Category.findOne({ slug: params.slug }).lean();
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Fetch blogs for this category
    const [blogs, total] = await Promise.all([
      BlogPost.find({
        category: category._id,
        published: true,
        status: 'published',
      })
        .sort('-publishedAt')
        .skip(skip)
        .limit(limit)
        .populate('author', 'name email')
        .populate('category', 'name slug')
        .populate('tags', 'name slug')
        .select('-__v')
        .lean()
        .exec(),
      BlogPost.countDocuments({
        category: category._id,
        published: true,
        status: 'published',
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      category: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('Error fetching category blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category blogs' },
      { status: 500 }
    );
  }
}