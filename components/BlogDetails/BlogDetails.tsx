'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import blog1 from '@/public/images/service/cd-image.jpg';
import blog2 from '@/public/images/blog/blog_details-img01.jpg';
import blog3 from '@/public/images/blog/blog_details-img02.jpg';

import icon1 from '@/public/images/icon/icon_calendar.svg';
import icon2 from '@/public/images/icon/user-black.svg';
import icon3 from '@/public/images/icon/icon_comment.svg';
import icon4 from '@/public/images/icon/icon_eye.svg';
import icon5 from '@/public/images/icon/icon_link.svg';
import icon6 from '@/public/images/icon/icon_bookmark.svg';

import BlogSidebar from '../BlogSidebar';
import RelatedService from './RelatedBlog';
import Description from './Description';
import OtherDescription from './OtherDescription';

const BlogSingle: React.FC<{ blog: any, categories: any, tags: any, related: any, navigation: any }> = ({ blog, categories, tags, related, navigation }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <section className="blog_details_section pt-70">
      <div className="container">
        <div className="item-details_image pos-rel mb-80">
          <Image src={blog1} alt="Blog Feature" />
        </div>

        <div className="item_details_content pb-80">
          <ul className="post_meta ul_li list-unstyled">
            <li>
              <Link href="/blog">
                <span className="meta_label1"></span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <span className="meta_icon">
                  <Image src={icon1} alt="Calendar" />
                </span>
                <span className="meta_label">{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(blog.updatedAt))}</span>
              </Link>
            </li>
          </ul>
          <h2 className="item_details_heading"></h2>

          <hr className="mt-5" />
        </div>

        <div className="row mt-none-30 g-0 align-items-start mb-2">
          <div className="col-lg-8 mt-30">
            <div className="blog_details_content">
              

              <h3 className="item_details_info_heading">
                {blog.excerpt}
              </h3>

              <Description description={blog.content}/>
              <OtherDescription navigation={navigation}/>
            </div>
          </div>

          <BlogSidebar categories={categories} tags={tags}/>
        </div>

        {!!related.length && <div className="related-blog pt-130 pb-130">
          <h2 className="related-blog-title">Parcourir les blogs associés</h2>
          <RelatedService />
        </div>}
      </div>
    </section>
  );
};

export default BlogSingle;
