import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Tag from '@/models/Tag';

export const revalidate = 600; // Cache for 10 minutes

export async function GET() {
  try {
    await dbConnect();

    const tags = await Tag.find()
      .select('name slug')
      .sort('name')
      .lean()
      .exec();

    return NextResponse.json(tags, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}