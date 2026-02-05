import React, { Fragment } from "react";
import Header from "@/components/header/Header";
import Scrollbar from "@/components/scrollbar/scrollbar";
import Footer from "@/components/footer/Footer";
import CtaSection from "@/components/CtaSection/CtaSection";
import BlogSingle from "@/components/BlogDetails/BlogDetails";
import { notFound } from "next/navigation";
import { getBlogBySlug, incrementBlogViews, getAllCategories, getAllTags } from '@/lib/blogServices';
import { getBlogImageUrl } from '@/lib/imageUtils';

import icon from "@/public/images/icon/cap.svg";
import Image1 from "@/public/images/hero/cd-img02.png";
import Image2 from "@/public/images/shape/brd_shape.png";

// Helper function to construct image URL safely
const getImageUrl = (coverImage?: string) => {
  if (!coverImage) return '/images/blog/blog_details-img01.jpg';
  
  const baseUrl = 'http://localhost:3001';
  // Ensure baseUrl doesn't end with slash and path starts with slash
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const imagePath = `/images/blog-covers/${coverImage.replace(/^\//, '')}`;
  
  return `${cleanBaseUrl}${imagePath}`;
};

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogData = await getBlogBySlug(slug);
  
  // Increment views
  await incrementBlogViews(slug);
  const categories = await getAllCategories();
  const tags = await getAllTags();
  if (!blogData) {
    notFound();
  }
  const { blog, related, prev, next } = blogData;

  // Convert Date objects to plain strings to avoid serialization issues
  const serializedBlog = {
    ...blog,
    _id: blog._id?.toString(),
    category: blog.category ? {
      ...blog.category,
      _id: blog.category._id?.toString(),
      createdAt: blog.category.createdAt instanceof Date ? blog.category.createdAt.toISOString() : blog.category.createdAt,
      updatedAt: blog.category.updatedAt instanceof Date ? blog.category.updatedAt.toISOString() : blog.category.updatedAt,
    } : null,
    tags: blog.tags.map((tag: any) => ({
      ...tag,
      _id: tag._id?.toString(),
      createdAt: tag.createdAt instanceof Date ? tag.createdAt.toISOString() : tag.createdAt,
      updatedAt: tag.updatedAt instanceof Date ? tag.updatedAt.toISOString() : tag.updatedAt,
    })),
    createdAt: blog.createdAt instanceof Date ? blog.createdAt.toISOString() : blog.createdAt,
    publishedAt: blog.publishedAt instanceof Date ? blog.publishedAt.toISOString() : blog.publishedAt,
    updatedAt: blog.updatedAt instanceof Date ? blog.updatedAt.toISOString() : blog.updatedAt,
  };

  const serializedRelated = related.map((relatedBlog: any) => ({
    ...relatedBlog,
    _id: relatedBlog._id?.toString(),
    category: relatedBlog.category ? {
      ...relatedBlog.category,
      _id: relatedBlog.category._id?.toString(),
      createdAt: relatedBlog.category.createdAt instanceof Date ? relatedBlog.category.createdAt.toISOString() : relatedBlog.category.createdAt,
      updatedAt: relatedBlog.category.updatedAt instanceof Date ? relatedBlog.category.updatedAt.toISOString() : relatedBlog.category.updatedAt,
    } : null,
    tags: relatedBlog.tags.map((tag: any) => ({
      ...tag,
      _id: tag._id?.toString(),
      createdAt: tag.createdAt instanceof Date ? tag.createdAt.toISOString() : tag.createdAt,
      updatedAt: tag.updatedAt instanceof Date ? tag.updatedAt.toISOString() : tag.updatedAt,
    })),
    createdAt: relatedBlog.createdAt instanceof Date ? relatedBlog.createdAt.toISOString() : relatedBlog.createdAt,
    publishedAt: relatedBlog.publishedAt instanceof Date ? relatedBlog.publishedAt.toISOString() : relatedBlog.publishedAt,
    updatedAt: relatedBlog.updatedAt instanceof Date ? relatedBlog.updatedAt.toISOString() : relatedBlog.updatedAt,
  }));

  const serializedCategories = categories.map((cat: any) => ({
    ...cat,
    _id: cat._id?.toString(),
    createdAt: cat.createdAt instanceof Date ? cat.createdAt.toISOString() : cat.createdAt,
    updatedAt: cat.updatedAt instanceof Date ? cat.updatedAt.toISOString() : cat.updatedAt,
  }));

  const serializedTags = tags.map((tag: any) => ({
    ...tag,
    _id: tag._id?.toString(),
    createdAt: tag.createdAt instanceof Date ? tag.createdAt.toISOString() : tag.createdAt,
    updatedAt: tag.updatedAt instanceof Date ? tag.updatedAt.toISOString() : tag.updatedAt,
  }));

  console.log(serializedBlog)

  return (
    <Fragment>
      <Header />
      <main className="page_content blog-page">
        <section
          className="page-title pt-200 pos-rel bg_img"
          style={{ backgroundImage: `url('/images/bg/page_bg01.jpg')` }}
        >
          <div className="container">
            <div className="page-title-wrap sd-title-wrap">
              <div className="row mt-none-30 align-items-end">
                <div className="col-lg-9 mt-30">
                  <div className="page-title-box">
                    <span className="sub-title">
                      <img src={icon.src} alt="Icon" style={{width: '20px', height: '20px', marginRight: '8px', display: 'inline-block'}} /> Détails du blog
                    </span>
                    <h2 className="title">{blog?.title || 'Loading...'}</h2>
                  </div>
                </div>
                <div className="col-lg-3 mt-30">
                  <div className="sd-right-img pos-rel">
                    <img src={Image1.src} alt="Right Illustration" style={{width: '100%', height: 'auto'}} />
                    <div className="sd-arrow-shape style-2">
                      <img
                        className="xbzoominzoomup"
                        src={Image2.src}
                        alt="Arrow"
                        style={{width: '100%', height: 'auto'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BlogSingle blog={serializedBlog} related={serializedRelated} navigation={{ prev, next }} categories={serializedCategories} tags={serializedTags} />
      </main>

      <CtaSection cClass={"bg"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
}