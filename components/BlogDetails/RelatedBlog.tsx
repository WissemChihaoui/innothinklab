import React, { FC } from 'react';
import { blogs } from '../../api/blogs';
import Link from 'next/link';
import Image from 'next/image';

// interface Blog {
//   slug: string;
//   screens: any;
//   thumb?: string;      // Optional
//   author?: string;     // Optional
//   title: string;
// }
interface RelatedBlogProps {
  related: any[];  // Consider replacing 'any' with a proper type if possible
}

const RelatedBlog: FC<RelatedBlogProps> = ({ related }) => {
  return (
    <div className="row mt-none-30">
      {related?.slice(0, 3).map((blog: any) => (
        <div className="col-lg-4 col-md-6 mt-30" key={blog.slug}>
          <div className="blog-details_wrap">
            <div className="blog-details_item">
              <div className="xb-item--img">
                <Link href={`/blog/${blog.slug}`}>
                  <Image 
                    src={blog.screens} 
                    alt={blog.title} 
                    width={400}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <div className="xb-item--holder">
                <div className="xb-item--meta ul_li">
                  <span className="xb-item--meta_label1">{blog.category.name ?? "No category"}</span>
                  <span className="xb-item--meta_label">{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(blog.createdAt))}</span>
                </div>
                <h3 className="item_details_info_heading border-effect">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <Link href={`/blog/${blog.slug}`} className="xb-item--det-btn">
                  Lire la suite <i className="far fa-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedBlog;
