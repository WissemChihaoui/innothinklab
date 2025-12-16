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

const BlogList = ({
  blogs,
  categories,
  tags,
  filter,
  pagination
}: {
  blogs: any[];
  categories: any[];
  tags: any[];
  filter?: { category?: string; tag?: string };
  pagination?: any;
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<any>(null);

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

  const activeFilter = filter?.category || filter?.tag;

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
              loop={true}
              speed={1800}
              parallax={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {blogs.map((blog, index) => (
                <SwiperSlide key={index}>
                  <div className="blog-slide-item">
                    <div className="xb-item--img">
                      <Link href={`/blog/${blog.slug}`}>
                        <Image
                          src={fallbackImage}
                          alt={blog.title}
                          width={1200}
                          height={600}
                        />
                      </Link>
                    </div>
                    <div className="xb-item--holder">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="xb-item--tag"
                      >
                        {blog.category.name}
                      </Link>
                      <h2 className="xb-item--title border-effect">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      <p className="xb-item--content">{blog.excerpt}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="blog-item_button">
              <div className="blog-swiper-btn swiper-button-prev" ref={prevRef}>
                <Image src={iconPrev} alt="Previous" width={40} height={40} />
              </div>
              <div className="blog-swiper-btn swiper-button-next" ref={nextRef}>
                <Image src={iconNext} alt="Next" width={40} height={40} />
              </div>
            </div>
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
                  <div className="active-filter">
                    <span>Filtered by: {activeFilter}</span>
                    <Link href="/blog">Clear filter</Link>
                  </div>
                )}
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <div className="blog_details_item ul_li" key={index}>
                      <div className="xb-item--img">
                        <Link href={`/blog/${blog.slug}`}>
                          <Image
                            src={blog.screens || fallbackImage}
                            alt={blog.title}
                            width={800}
                            height={500}
                          />
                        </Link>
                      </div>
                      <div className="xb-item--holder">
                        <span className="xb-item--text">{blog.thumb}</span>
                        <h3 className="xb-item--title border-effect">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="xb-item--content">
                          {blog.metaDescription}
                        </p>
                        <div className="xb-item--button mt-50">
                          <Link href={`/blog/${blog.slug}`}>
                            Read more <i className="far fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No blogs found</p>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <ul className="blog-pagination ul_li">
                    {/* First Page */}
                    <li className={pagination.page === 1 ? 'disabled' : ''}>
                      <Link 
                        href={{
                          pathname: '/blog',
                          query: { 
                            ...(filter?.category && { category: filter.category }),
                            ...(filter?.tag && { tag: filter.tag }),
                            page: 1 
                          },
                        }}
                        aria-label="First"
                      >
                        <i className="fas fa-chevron-double-left"></i>
                      </Link>
                    </li>

                    {/* Previous Page */}
                    <li className={!pagination.hasPreviousPage ? 'disabled' : ''}>
                      <Link 
                        href={{
                          pathname: '/blog',
                          query: { 
                            ...(filter?.category && { category: filter.category }),
                            ...(filter?.tag && { tag: filter.tag }),
                            page: pagination.page - 1 
                          },
                        }}
                        aria-label="Previous"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </Link>
                    </li>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      // Calculate page numbers to show (current page in the middle when possible)
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page > pagination.totalPages - 3) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }

                      return (
                        <li 
                          key={pageNum} 
                          className={pagination.page === pageNum ? 'active' : ''}
                        >
                          <Link 
                            href={{
                              pathname: '/blog',
                              query: { 
                                ...(filter?.category && { category: filter.category }),
                                ...(filter?.tag && { tag: filter.tag }),
                                page: pageNum 
                              },
                            }}
                          >
                            {pageNum}
                          </Link>
                        </li>
                      );
                    })}

                    {/* Next Page */}
                    <li className={!pagination.hasNextPage ? 'disabled' : ''}>
                      <Link 
                        href={{
                          pathname: '/blog',
                          query: { 
                            ...(filter?.category && { category: filter.category }),
                            ...(filter?.tag && { tag: filter.tag }),
                            page: pagination.page + 1 
                          },
                        }}
                        aria-label="Next"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </Link>
                    </li>

                    {/* Last Page */}
                    <li className={pagination.page === pagination.totalPages ? 'disabled' : ''}>
                      <Link 
                        href={{
                          pathname: '/blog',
                          query: { 
                            ...(filter?.category && { category: filter.category }),
                            ...(filter?.tag && { tag: filter.tag }),
                            page: pagination.totalPages 
                          },
                        }}
                        aria-label="Last"
                      >
                        <i className="fas fa-chevron-double-right"></i>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Blog Sidebar */}
            <BlogSidebar categories={categories} tags={tags} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
