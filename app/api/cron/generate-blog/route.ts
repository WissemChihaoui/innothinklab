import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/cronJobs";

// This endpoint will be called by Vercel Cron Jobs
export async function GET() {
  try {
    console.log('🕐 Vercel Cron Job: Starting scheduled blog generation...');
    
    // Run the blog generation
    await generateBlogPost();
    
    return NextResponse.json({ 
      success: true, 
      message: "Blog generation completed successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Vercel Cron Job failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Vercel also supports POST for cron jobs
export async function POST() {
  return GET();
}
