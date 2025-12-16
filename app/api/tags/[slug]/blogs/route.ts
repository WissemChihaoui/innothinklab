import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import Tag from '@/models/Tag';

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

    // Find tag by slug
    const tag = await Tag.findOne({ slug: params.slug }).lean();
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Fetch blogs with this tag
    const [blogs, total] = await Promise.all([
      BlogPost.find({
        tags: tag._id,
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
        tags: tag._id,
        published: true,
        status: 'published',
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      tag: {
        name: tag.name,
        slug: tag.slug,
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
    console.error('Error fetching tag blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag blogs' },
      { status: 500 }
    );
  }
}