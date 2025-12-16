import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published: boolean;
  publishedAt?: Date;
  category: Types.ObjectId;
  tags: Types.ObjectId[];
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  readingTime?: number;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: String,
    published: { type: Boolean, default: false },
    publishedAt: Date,
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    metaTitle: String,
    metaDescription: String,
    seoKeywords: [String],
    readingTime: Number,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

// Fixed: Remove next() parameter
BlogPostSchema.pre('save', function() {
  // Generate slug if title is modified
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  // Generate excerpt if content is modified and excerpt is not provided
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.content.substring(0, 160) + '...';
  }
  // Calculate reading time (average reading speed: 200 words per minute)
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }
  // Set publishedAt when post is published
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

// Add text index for search functionality
BlogPostSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  'seoKeywords': 'text'
});

export default mongoose.models.BlogPost || 
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);