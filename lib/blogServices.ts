import { getDatabase } from './dbConnect';
import { IBlogPost } from '../models/BlogPost';
import { ITag } from '@/models/Tag';
import { ICategory } from '@/models/Category';
import { getCategoryBySlugOrName, getTagBySlugOrName, isValidObjectId } from './blogUtils';

export interface BlogWithCategoryAndTags {
  _id: any;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  likes: number;
  views: number;
  status: string;
  readingTime: number;
  createdAt: Date;
  publishedAt?: Date;
  updatedAt: Date;
  category: {
    _id: any;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
  tags: {
    _id: any;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface BlogNavigation {
  title: string;
  slug: string;
}
export interface BlogWithRelations {
  blog: BlogWithCategoryAndTags;
  prev: BlogNavigation | null;
  next: BlogNavigation | null;
  related: BlogWithCategoryAndTags[];
}

export interface PaginatedBlogs {
  blogs: BlogWithCategoryAndTags[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogFilters {
  page?: number;
  category?: string;
  tag?: string;
  limit?: number;
}
export async function getAllBlogs(filters: BlogFilters = {}): Promise<PaginatedBlogs> {
  try {
    const db = await getDatabase();
    const page = filters.page || 1;
    const limit = filters.limit || 6;
    const skip = (page - 1) * limit;

    // Build match stage based on filters
    const matchStage: any = { published: true, status: 'published' };
    
    if (filters.category) {
      // Handle both ObjectId and slug/name filtering
      if (isValidObjectId(filters.category)) {
        // It's an ObjectId
        matchStage.category = filters.category;
      } else {
        // It's a slug or name, need to lookup category first
        const category = await getCategoryBySlugOrName(filters.category);
        if (category) {
          matchStage.category = category._id;
        } else {
          // If category not found, return empty results
          return {
            blogs: [],
            currentPage: page,
            totalPages: 0,
            totalBlogs: 0,
            hasNextPage: false,
            hasPrevPage: false,
          };
        }
      }
    }
    
    if (filters.tag) {
      // Handle both ObjectId and slug/name filtering
      if (isValidObjectId(filters.tag)) {
        // It's an ObjectId
        matchStage.tags = { $in: [filters.tag] };
      } else {
        // It's a slug or name, need to lookup tag first
        const tag = await getTagBySlugOrName(filters.tag);
        if (tag) {
          matchStage.tags = { $in: [tag._id] };
        } else {
          // If tag not found, return empty results
          return {
            blogs: [],
            currentPage: page,
            totalPages: 0,
            totalBlogs: 0,
            hasNextPage: false,
            hasPrevPage: false,
          };
        }
      }
    }

    // Get total count for pagination
    const totalBlogs = await db
      .collection('blogposts')
      .countDocuments(matchStage);

    const totalPages = Math.ceil(totalBlogs / limit);

    // Get paginated blogs with populated category and tags
    const blogs = await db
      .collection('blogposts')
      .aggregate<BlogWithCategoryAndTags>([
        { $match: matchStage },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryInfo'
          }
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'tags',
            foreignField: '_id',
            as: 'tagsInfo'
          }
        },
        {
          $project: {
            title: 1,
            slug: 1,
            content: 1,
            excerpt: 1,
            featuredImage: 1,
            published: 1,
            metaTitle: 1,
            metaDescription: 1,
            seoKeywords: 1,
            likes: 1,
            views: 1,
            status: 1,
            readingTime: 1,
            createdAt: 1,
            publishedAt: 1,
            updatedAt: 1,
            category: { $arrayElemAt: ['$categoryInfo', 0] },
            tags: '$tagsInfo'
          }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray();

    return {
      blogs,
      currentPage: page,
      totalPages,
      totalBlogs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogWithRelations | null> {
  try {
    const db = await getDatabase();
    
    // Get the blog with populated category and tags
    const blogResult = await db
      .collection('blogposts')
      .aggregate<BlogWithCategoryAndTags>([
        { $match: { slug } },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryInfo'
          }
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'tags',
            foreignField: '_id',
            as: 'tagsInfo'
          }
        },
        {
          $project: {
            title: 1,
            slug: 1,
            content: 1,
            excerpt: 1,
            featuredImage: 1,
            published: 1,
            metaTitle: 1,
            metaDescription: 1,
            seoKeywords: 1,
            likes: 1,
            views: 1,
            status: 1,
            readingTime: 1,
            createdAt: 1,
            publishedAt: 1,
            updatedAt: 1,
            category: { $arrayElemAt: ['$categoryInfo', 0] },
            tags: '$tagsInfo'
          }
        }
      ])
      .toArray();

    const blog = blogResult[0];

    if (!blog) {
      return null;
    }

    // Get all blogs sorted by date for prev/next navigation
    const allBlogs = await db
      .collection('blogposts')
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

    // Get related posts with populated category and tags - FIRST by same category
    const relatedByCategoryResult = await db
      .collection('blogposts')
      .aggregate<BlogWithCategoryAndTags>([
        { $match: { slug: { $ne: slug }, category: blog.category?._id || blog.category } },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryInfo'
          }
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'tags',
            foreignField: '_id',
            as: 'tagsInfo'
          }
        },
        {
          $project: {
            title: 1,
            slug: 1,
            content: 1,
            excerpt: 1,
            featuredImage: 1,
            published: 1,
            metaTitle: 1,
            metaDescription: 1,
            seoKeywords: 1,
            likes: 1,
            views: 1,
            status: 1,
            readingTime: 1,
            createdAt: 1,
            publishedAt: 1,
            updatedAt: 1,
            category: { $arrayElemAt: ['$categoryInfo', 0] },
            tags: '$tagsInfo'
          }
        },
        { $limit: 3 }
      ])
      .toArray();

    let related: BlogWithCategoryAndTags[] = relatedByCategoryResult;

    // If we need more related posts, get by matching tags
    if (related.length < 3) {
      const excludeSlugs = [slug, ...related.map((r) => r.slug)];
      const blogTagIds = blog.tags.map((tag: any) => tag._id);

      const relatedByTagsResult = await db
        .collection('blogposts')
        .aggregate<BlogWithCategoryAndTags>([
          { $match: { slug: { $nin: excludeSlugs }, tags: { $in: blogTagIds } } },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'categoryInfo'
            }
          },
          {
            $lookup: {
              from: 'tags',
              localField: 'tags',
              foreignField: '_id',
              as: 'tagsInfo'
            }
          },
          {
            $project: {
              title: 1,
              slug: 1,
              content: 1,
              excerpt: 1,
              featuredImage: 1,
              published: 1,
              metaTitle: 1,
              metaDescription: 1,
              seoKeywords: 1,
              likes: 1,
              views: 1,
              status: 1,
              readingTime: 1,
              createdAt: 1,
              publishedAt: 1,
              updatedAt: 1,
              category: { $arrayElemAt: ['$categoryInfo', 0] },
              tags: '$tagsInfo'
            }
          }
        ])
        .toArray();

      // Sort by number of matching tags (most matches first)
      const blogTagsSet = new Set(blogTagIds);
      const sortedByTags = relatedByTagsResult
        .map((b) => ({
          ...b,
          matchCount: b.tags.filter((t: any) => blogTagsSet.has(t._id)).length,
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

export async function createBlog(blogData: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: any; // ObjectId
  tags: any[]; // ObjectId[]
  published: boolean;
  status: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  readingTime?: number;
}): Promise<any> {
  try {
    const db = await getDatabase();
    
    const blogPost = {
      ...blogData,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('blogposts').insertOne(blogPost);
    
    return {
      _id: result.insertedId,
      ...blogPost,
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
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
    return categories.map(category => { 
      return { 
        _id: category._id?.toString(),
        name: category.name, 
        slug: category.slug,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }; 
    });
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
    return tags.map(tag => { 
      return { 
        _id: tag._id?.toString(),
        name: tag.name, 
        slug: tag.slug,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt
      }; 
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}