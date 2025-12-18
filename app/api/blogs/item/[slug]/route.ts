import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { slug } = await context.params;
    
    return NextResponse.json({
      success: true,
      slug: slug,
      message: "Route is working!",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}