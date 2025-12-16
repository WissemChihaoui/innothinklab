import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import Category from '@/models/Category';
import Tag from '@/models/Tag';
import User from '@/models/User';

// Initialize Google's Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

// Function to generate blog content using Google's Generative AI
async function generateBlogContent(topic: string, category: string, tags: string[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `Write a detailed, professional blog post about "${topic}" in the ${category} category.
  
  Requirements:
  - Write 800-1200 words
  - Include relevant information, examples, and practical advice
  - Format the content in markdown with proper headings, lists, and code blocks where appropriate
  - Make it SEO-friendly with natural keyword usage
  - Tags to consider: ${tags.join(', ')}
  
  Structure:
  1. An engaging introduction (2-3 paragraphs)
  2. At least 3 main sections with detailed content and subheadings
  3. A conclusion with key takeaways
  4. A call-to-action for readers
  
  Write in a conversational yet professional tone. Make it informative and engaging.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate blog content');
  }
}

// Function to generate a blog post
export async function POST(request: Request) {
  try {
    await dbConnect();

    // Get or create the AI author user
    let aiUser = await User.findOne({ email: 'ai@innothinklab.com' });
    if (!aiUser) {
      aiUser = new User({
        name: 'AI Content Generator',
        email: 'ai@innothinklab.com',
        password: process.env.AI_USER_PASSWORD || 'securepassword123',
        role: 'AUTHOR',
      });
      await aiUser.save();
    }

    // Get existing categories or create a default one
    let categories = await Category.find();
    
    if (categories.length === 0) {
      // Create default categories if none exist
      const defaultCategories = [
        { name: 'Web Development', description: 'Web development tutorials and guides' },
        { name: 'Technology', description: 'Latest technology trends and news' },
        { name: 'AI & Machine Learning', description: 'Artificial Intelligence and ML topics' },
      ];
      
      categories = await Promise.all(
        defaultCategories.map(cat => 
          Category.create({ 
            name: cat.name, 
            slug: cat.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
            description: cat.description 
          })
        )
      );
    }

    // Select a random category
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Get or create tags
    const tagNames = ['AI', 'Automation', 'Technology', 'Development', 'Tutorial', 'Best Practices'];
    const shuffledTags = tagNames.sort(() => 0.5 - Math.random()).slice(0, 4); // Pick 4 random tags
    
    const tags = await Promise.all(
      shuffledTags.map(async (name) => {
        let tag = await Tag.findOne({ name });
        if (!tag) {
          tag = await Tag.create({ 
            name, 
            slug: name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
          });
        }
        return tag._id;
      })
    );

    // Generate a blog topic based on the category
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const topicPrompt = `Generate a specific, engaging blog post title about ${randomCategory.name}. 
    
    Requirements:
    - Must be under 60 characters
    - Should be SEO-friendly with relevant keywords
    - Make it compelling and click-worthy
    - Don't use quotes in the title
    
    Return ONLY the title text, nothing else.`;
    
    const topicResult = await model.generateContent(topicPrompt);
    const topicResponse = await topicResult.response;
    let title = topicResponse.text().trim();
    
    // Clean up the title (remove quotes if AI added them)
    title = title.replace(/^["']|["']$/g, '');
    
    // Fallback title if generation fails
    if (!title || title.length > 100) {
      title = `The Future of ${randomCategory.name} in 2024`;
    }

    console.log(`Generating blog post: "${title}"`);

    // Generate the blog content
    const content = await generateBlogContent(title, randomCategory.name, shuffledTags);

    // Generate excerpt (first 160 chars of content, cleaned of markdown)
    const plainTextContent = content
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
      .trim();
    
    const excerpt = plainTextContent.substring(0, 160) + '...';

    // Create and save the blog post
    const blogPost = new BlogPost({
      title,
      content,
      excerpt,
      author: aiUser._id,
      category: randomCategory._id,
      tags,
      published: true,
      status: 'published',
      metaTitle: title,
      metaDescription: excerpt,
      seoKeywords: shuffledTags,
    });

    await blogPost.save();

    console.log(`✅ Blog post created: ${blogPost.slug}`);

    return NextResponse.json({
      success: true,
      message: 'Blog post generated successfully',
      data: {
        id: blogPost._id,
        title: blogPost.title,
        slug: blogPost.slug,
        category: randomCategory.name,
        tags: shuffledTags,
        readingTime: blogPost.readingTime,
      },
    });

  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate blog post',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// GET endpoint to test the API
export async function GET() {
  return NextResponse.json({
    message: 'AI Blog Generation API',
    usage: 'Send a POST request to generate a new blog post',
    note: 'This endpoint is triggered manually or via cron job'
  });
}