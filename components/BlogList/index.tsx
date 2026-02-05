"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";

import BlogSidebar from "../BlogSidebar";

import iconPrev from "@/public/images/icon/prev-icon.png";
import iconNext from "@/public/images/icon/next-icon.png";
import fallbackImage from "@/public/images/blog/b-img01.jpg";

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription?: string;
  category: {
    name: string;
    slug?: string;
  };
  tags: Array<{
    name: string;
    slug?: string;
  }>;
  screens?: string;
  thumb?: string;
  createdAt: string | Date;
  coverImage?: string;
}

interface Category {
  name: string;
  slug?: string;
}

interface Tag {
  name: string;
  slug?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Filter {
  category?: string;
  tag?: string;
}

interface BlogListProps {
  blogs: Blog[];
  categories: Category[];
  tags: Tag[];
  filter?: Filter;
  pagination: Pagination;
}

const BlogList = ({
  blogs,
  categories,
  tags,
  filter,
  pagination
}: BlogListProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  // Helper to construct image URL safely
  const getImageUrl = (coverImage?: string) => {
    if (!coverImage) return fallbackImage.src;
    
    const baseUrl = 'http://localhost:3001';
    console.log("baseUrl", baseUrl)
    // Ensure baseUrl doesn't end with slash and path starts with slash
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const imagePath = `/images/blog-covers/${coverImage.replace(/^\//, '')}`;
    
    return `${cleanBaseUrl}${imagePath}`;
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const getFilterDisplay = () => {
    if (filter?.category) {
      const category = categories.find(cat => cat.slug === filter.category || cat.name === filter.category);
      return category?.name || filter.category;
    }
    if (filter?.tag) {
      const tag = tags.find(t => t.slug === filter.tag || t.name === filter.tag);
      return tag?.name || filter.tag;
    }
    return null;
  };

  const activeFilter = getFilterDisplay();

  // Helper to build query params
  const buildQuery = (pageNum: number) => {
    const params: Record<string, string> = {};
    if (filter?.category) params.category = filter.category;
    if (filter?.tag) params.tag = filter.tag;
    if (pageNum > 1) params.page = pageNum.toString();
    return params;
  };

  // Helper to build URL string
  const buildUrl = (pageNum: number) => {
    const query = buildQuery(pageNum);
    const queryString = new URLSearchParams(query).toString();
    return `/blog${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div>
      {/* Blog Hero Swiper Section */}
      <div className="blog pt-70">
        <div className="container">
          <div className="blog-slider pos-rel">
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              loop={blogs.length > 1}
              speed={1800}
              parallax={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {blogs.slice(0, 3).map((blog, index) => (
                <SwiperSlide key={blog.slug || index}>
                  <div className="blog-slide-item">
                    <div className="xb-item--img">
                      <Link href={`/blog/${blog.slug}`} style={{display: 'block', width: '100%'}}>
                        <img
                          src={getImageUrl(blog.coverImage)}
                          alt={blog.title}
                          width={1200}
                          height={600}
                          style={{ objectFit: "contain", width: "100%", height: 600}}
                        />
                      </Link>
                    </div>
                    <div className="xb-item--holder">
                      <Link
                        href={buildUrl(1) + `${filter?.category ? '' : `${buildUrl(1).includes('?') ? '&' : '?'}category=${blog.category?.slug || blog.category?.name}`}`}
                        className="xb-item--tag"
                      >
                        {blog.category?.name}
                      </Link>
                      <h2 className="xb-item--title border-effect">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      <p className="xb-item--content">
                        {blog.excerpt?.replace(/<[^>]+>/g, '')}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            {blogs.length > 1 && (
              <div className="blog-item_button">
                <div className="blog-swiper-btn swiper-button-prev" ref={prevRef}>
                  <Image src={iconPrev} alt="Previous" width={40} height={40} />
                </div>
                <div className="blog-swiper-btn swiper-button-next" ref={nextRef}>
                  <Image src={iconNext} alt="Next" width={40} height={40} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog List Section */}
      <section className="blog_details_section pb-130 mt-120">
        <div className="container">
          <div className="row mt-none-30 g-0 align-items-start">
            <div className="col-lg-8 mt-30">
              <div className="blog_details_content">
                {activeFilter && (
                  <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
                    <span>
                      Filtré par: <strong>{activeFilter}</strong> ({pagination.totalBlogs} articles)
                    </span>
                    <Link href="/blog" className="btn btn-sm btn-outline-secondary">
                      Effacer
                    </Link>
                  </div>
                )}

                {pagination.totalBlogs > 0 ? (
                  blogs.map((blog, index) => (
                    <div className="blog_details_item ul_li mb-5" key={blog.slug || index}>
                      <div className="xb-item--img">
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={getImageUrl(blog.coverImage)}
                            alt={blog.title}
                            width={800}
                            height={500}
                          />
                        </Link>
                      </div>
                      <div className="xb-item--holder">
                        {blog.thumb && (
                          <span className="xb-item--text">{blog.thumb}</span>
                        )}
                        <h3 className="xb-item--title border-effect">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="xb-item--content">
                          {blog.metaDescription?.replace(/<[^>]+>/g, '') || 
                           blog.excerpt?.replace(/<[^>]+>/g, '')}
                        </p>
                        <div className="xb-item--button mt-50">
                          <Link href={`/blog/${blog.slug}`}>
                            Lire la suite <i className="far fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-5">
                    <p className="text-muted fs-5">No blogs found</p>
                    {activeFilter && (
                      <Link href="/blog" className="btn btn-primary mt-3">
                        View All Blogs
                      </Link>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <ul className="blog-pagination ul_li mt-5">
                    {/* First Page */}
                    <li className={pagination.currentPage === 1 ? 'disabled' : ''}>
                      <Link 
                        href={buildUrl(1)}
                        aria-label="First"
                        className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      >
                        <i className="fas fa-chevron-double-left"></i>
                      </Link>
                    </li>

                    {/* Previous Page */}
                    <li className={!pagination.hasPrevPage ? 'disabled' : ''}>
                      <Link 
                        href={buildUrl(Math.max(1, pagination.currentPage - 1))}
                        aria-label="Previous"
                        className={!pagination.hasPrevPage ? 'pointer-events-none opacity-50' : ''}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </Link>
                    </li>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage > pagination.totalPages - 3) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <li 
                          key={pageNum} 
                          className={pagination.currentPage === pageNum ? 'active' : ''}
                        >
                          <Link href={buildUrl(pageNum)}>
                            {pageNum}
                          </Link>
                        </li>
                      );
                    })}

                    {/* Next Page */}
                    <li className={!pagination.hasNextPage ? 'disabled' : ''}>
                      <Link 
                        href={buildUrl(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                        aria-label="Next"
                        className={!pagination.hasNextPage ? 'pointer-events-none opacity-50' : ''}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </Link>
                    </li>

                    {/* Last Page */}
                    <li className={pagination.currentPage === pagination.totalPages ? 'disabled' : ''}>
                      <Link 
                        href={buildUrl(pagination.totalPages)}
                        aria-label="Last"
                        className={pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
                      >
                        <i className="fas fa-chevron-double-right"></i>
                      </Link>
                    </li>
                  </ul>
                )}

                {/* Pagination Info */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="text-center mt-3 text-muted">
                    Page {pagination.currentPage} of {pagination.totalPages} 
                    {' '}({pagination.totalBlogs} total posts)
                  </div>
                )}
              </div>
            </div>

            {/* Blog Sidebar */}
            <BlogSidebar 
              categories={categories} 
              tags={tags}
              // currentCategory={filter?.category}
              // currentTag={filter?.tag}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;