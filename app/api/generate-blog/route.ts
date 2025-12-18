// app/api/generate-blog/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import User from "@/models/User";

// Initialize Google's Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

// Use the stable free tier model
const MODEL_NAME = "gemini-2.5-flash";

// Utility function to add delay between API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to generate blog content with retry logic
async function generateBlogContent(
  topic: string,
  category: string,
  tags: string[],
  retryCount = 0
): Promise<NextResponse> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `Write a detailed, professional blog post about "${topic}" in the ${category} category.
  
Requirements:
- Language: French
- Word count: 400-600 words
- Format: Return a valid JSON object with these fields:
  {
    "title": "Engaging title in French",
    "excerpt": "1-2 sentence excerpt summarizing the post",
    "content": "Formatted content with HTML tags for better display. Use these tags:
      - <h2> for section headings
      - <h3> for subsection headings
      - <p> for paragraphs
      - <ul><li> for lists
      - <pre><code> for code blocks
      - <strong> for important terms
      - <a> for links (when applicable)
    ",
    "seo": {
      "metaDescription": "SEO-optimized meta description (150-160 chars)",
      "keywords": ["list", "of", "relevant", "keywords"]
    }
  }
- Content should be well-structured with:
  1. Introduction (1-2 paragraphs)
  2. 3-4 main sections with clear subheadings
  3. Practical examples and use cases
  4. Conclusion with key takeaways
- Make it engaging and informative for professionals
- Include up-to-date information (2025)
- Tags to consider: ${tags.join(", ")}
- Avoid markdown formatting, use HTML tags as specified
- Keep paragraphs concise (3-4 sentences max)
- Use active voice and professional tone
- Include relevant statistics or data where applicable

Example structure for content:
<p>Introduction paragraph...</p>
<h2>Main Section 1</h2>
<p>Content...</p>
<h3>Subsection 1.1</h3>
<p>More details...</p>
<ul><li>Point 1</li><li>Point 2</li></ul>
<pre><code>// Example code if relevant</code></pre>
<h2>Conclusion</h2>
<p>Summary and final thoughts...</p>`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();
    
    // Clean up markdown code block syntax if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/^```json\n|\n```$/g, '');
    }
    
    const blogContent = JSON.parse(responseText);

    // Clean up any markdown that might have slipped through
    const cleanHtml = (html: string) => {
      // Remove any remaining markdown headers
      let cleaned = html.replace(/^#+\s+(.*$)/gm, '<h2>$1</h2>');
      // Convert markdown bold to strong
      cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Convert markdown links to HTML
      cleaned = cleaned.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      return cleaned;
    };

    // Clean the content
    blogContent.content = cleanHtml(blogContent.content);

    // Ensure all required fields are present
    if (!blogContent.title || !blogContent.content) {
      throw new Error('Invalid response format from AI');
    }

    return NextResponse.json(blogContent);
  } catch (error: any) {
    // Handle rate limit errors with retry
    if (error.status === 429 && retryCount < 2) {
      const waitTime = 30000; // Wait 30 seconds
      console.log(
        `⏳ Rate limited. Waiting ${waitTime / 1000}s before retry ${retryCount + 1
        }/2...`
      );
      await delay(waitTime);
      return generateBlogContent(topic, category, tags, retryCount + 1);
    }

    console.error("Error generating content:", error);
    throw new Error(
      `Failed to generate blog content: ${error.message || "Unknown error"}`
    );
  }
}

// Function to generate title with retry logic
async function generateTitle(
  categoryName: string,
  retryCount = 0
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      maxOutputTokens: 2000, // Limit response length
    },
  });

  const topicPrompt = `Generate a specific, engaging blog post title about ${categoryName}. 
  
  Requirements:
  - Language : French
  - Must be under 60 characters
  - Should be SEO-friendly with relevant keywords
  - Make it compelling and click-worthy
  - Don't use quotes in the title
  
  Return ONLY the title text, nothing else.`;

  try {
    const topicResult = await model.generateContent(topicPrompt);
    const topicResponse = await topicResult.response;
    let title = topicResponse.text().trim();

    // Clean up the title
    title = title.replace(/^["']|["']$/g, "");

    if (!title || title.length > 100) {
      return `The Future of ${categoryName} in 2024`;
    }

    return title;
  } catch (error: any) {
    // Handle rate limit errors with retry
    if (error.status === 429 && retryCount < 2) {
      const waitTime = 30000;
      console.log(
        `⏳ Rate limited on title generation. Waiting ${waitTime / 1000
        }s before retry ${retryCount + 1}/2...`
      );
      await delay(waitTime);
      return generateTitle(categoryName, retryCount + 1);
    }

    // Fallback to default title on error
    console.warn("Failed to generate title, using fallback:", error.message);
    return `The Future of ${categoryName} in 2024`;
  }
}

// Function to generate a blog post
export async function POST(request: Request) {
  try {
    await dbConnect();

    // Get existing categories or create default ones
    let categories = await Category.find();

    if (categories.length === 0) {
      const defaultCategories = [
        {
          name: "Dévéloppement Web",
          description: "Création de sites web et applications web",
        },
        {
          name: "Mobile",
          description: "Développement d'applications mobiles iOS et Android",
        },
        {
          name: "Personnalisé",
          description: "Solutions sur mesure adaptées à vos besoins",
        },
        {
          name: "Marketing",
          description: "Stratégies marketing digitales et promotionnelles",
        },
        {
          name: "SEO",
          description: "Optimisation pour les moteurs de recherche",
        },
        {
          name: "Création de contenu",
          description: "Rédaction et création de contenu engageant",
        },
        {
          name: "Hébergement",
          description: "Solutions d'hébergement web performantes",
        },
      ];

      categories = await Promise.all(
        defaultCategories.map((cat) =>
          Category.create({
            name: cat.name,
            slug: cat.name
              .toLowerCase()
              .replace(/[^\w ]+/g, "")
              .replace(/ +/g, "-"),
            description: cat.description,
          })
        )
      );
    }

    // Select a random category
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    // Get or create tags
    const tagNames = [
      "AI",
      "Automation",
      "Technology",
      "Development",
      "Tutorial",
      "Best Practices",
    ];
    const shuffledTags = tagNames.sort(() => 0.5 - Math.random()).slice(0, 4);

    const tags = await Promise.all(
      shuffledTags.map(async (name) => {
        let tag = await Tag.findOne({ name });
        if (!tag) {
          tag = await Tag.create({
            name,
            slug: name
              .toLowerCase()
              .replace(/[^\w ]+/g, "")
              .replace(/ +/g, "-"),
          });
        }
        return tag._id;
      })
    );

    console.log(`🎯 Category: ${randomCategory.name}`);

    // Generate title with retry logic
    const title = await generateTitle(randomCategory.name);
    console.log(`📝 Title: "${title}"`);

    // Add delay between API calls to avoid rate limits
    await delay(2000);

    // Generate the blog content with retry logic
    console.log("🤖 Generating content...");
    const response = await generateBlogContent(
  randomCategory.name,
  randomCategory.name,
  shuffledTags
);
const contentData = await response.json();
const content = contentData.content;

    // Generate excerpt
    const plainTextContent = content
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .trim();

    const excerpt = plainTextContent.substring(0, 160) + "...";

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[éèà]/g, (match) => match.charCodeAt(0) === 233 ? "e" : "a") // Replace é, è, à with e or a
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-"); // Remove multiple -
    // Create and save the blog post
    const blogPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      category: randomCategory._id,
      tags,
      published: true,
      status: "published",
      metaTitle: title,
      metaDescription: excerpt,
      seoKeywords: shuffledTags,
    });

    await blogPost.save();

    console.log(`✅ Blog post created: ${blogPost.slug}`);

    return NextResponse.json({
      success: true,
      message: "Blog post generated successfully",
      data: {
        id: blogPost._id,
        title: blogPost.title,
        slug: blogPost.slug,
        category: randomCategory.name,
        tags: shuffledTags,
        readingTime: blogPost.readingTime,
        excerpt: excerpt.substring(0, 100) + "...",
      },
    });
  } catch (error) {
    console.error("❌ Error generating blog post:", error);

    // More detailed error response
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate blog post";
    const isRateLimit =
      errorMessage.includes("429") || errorMessage.includes("quota");

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        isRateLimit,
        suggestion: isRateLimit
          ? "Rate limit reached. Try again in a few minutes or upgrade your API plan."
          : "Check logs for details.",
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}

// GET endpoint to test the API
export async function GET() {
  return NextResponse.json({
    message: "AI Blog Generation API",
    model: MODEL_NAME,
    usage: "Send a POST request to generate a new blog post",
    note: "This endpoint is triggered manually or via cron job",
    rateLimit: "Includes automatic retry logic for rate limits",
  });
}
