import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';

export const revalidate = 600; // Cache for 10 minutes

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find()
      .select('name slug description')
      .sort('name')
      .lean()
      .exec();

    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}