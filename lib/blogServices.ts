import { getDatabase } from './dbConnect';
import { IBlogPost } from '../models/BlogPost';
import { ITag } from '@/models/Tag';
import { ICategory } from '@/models/Category';

export interface BlogNavigation {
  title: string;
  slug: string;
}
export interface BlogWithRelations {
  blog: IBlogPost;
  prev: BlogNavigation | null;
  next: BlogNavigation | null;
  related: IBlogPost[];
}
export async function getAllBlogs(): Promise<IBlogPost[]> {
    try {
        const db = await getDatabase();
        const blogs = await db
            .collection<IBlogPost>('blogposts')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        return blogs;
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        throw new Error('Failed to fetch blogs');
    }
}

export async function getBlogBySlug(slug: string): Promise<BlogWithRelations | null> {
  try {
    const db = await getDatabase();
    const blog = await db.collection<IBlogPost>('blogposts').findOne({ slug });

    if (!blog) {
      return null;
    }

    // Get all blogs sorted by date for prev/next navigation
    const allBlogs = await db
      .collection<IBlogPost>('blogposts')
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
    
    const prev = currentIndex > 0 
      ? { title: allBlogs[currentIndex - 1].title, slug: allBlogs[currentIndex - 1].slug }
      : null;
    
    const next = currentIndex < allBlogs.length - 1
      ? { title: allBlogs[currentIndex + 1].title, slug: allBlogs[currentIndex + 1].slug }
      : null;

    // Get related posts - FIRST by same category
    const relatedByCategory = await db
      .collection<IBlogPost>('blogposts')
      .find({
        slug: { $ne: slug },
        category: blog.category,
      })
      .limit(3)
      .toArray();

    let related: IBlogPost[] = [...relatedByCategory];

    // If we need more related posts, get by matching tags
    if (related.length < 3) {
      const excludeSlugs = [slug, ...related.map((r) => r.slug)];
      
      const relatedByTags = await db
        .collection<IBlogPost>('blogposts')
        .find({
          slug: { $nin: excludeSlugs },
          tags: { $in: blog.tags },
        })
        .toArray();

      // Sort by number of matching tags (most matches first)
      const blogTagsSet = new Set(blog.tags);
      const sortedByTags = relatedByTags
        .map((b) => ({
          ...b,
          matchCount: b.tags.filter((t) => blogTagsSet.has(t)).length,
        }))
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 3 - related.length);

      related = [...related, ...sortedByTags];
    }

    return {
      blog,
      prev,
      next,
      related: related.slice(0, 3),
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw new Error('Failed to fetch blog');
  }
}

export async function getAllCategories(): Promise<any[]> {
  try {
    const db = await getDatabase();
    const categories = await db
      .collection<any>('categories')
      .find({})
      .sort({ name: 1 })
      .toArray();
    return categories.map(category => {return {name: category.name, slug: category.slug}});
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getAllTags(): Promise<any[]> {
  try {
    const db = await getDatabase();
    const tags = await db
      .collection<any>('tags')
      .find({})
      .sort({ name: 1 })
      .toArray();
    return tags.map(tag => {return {name: tag.name, slug: tag.slug}});
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}