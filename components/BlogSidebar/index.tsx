import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { blogs } from '../../api/blogs';
import Services from '../../api/service';

import searchIcon from '@/public/images/icon/search-icon.svg';
import authorIcon from '@/public/images/icon/profile-circle.svg';

const BlogSidebar = ({ categories, tags }: { categories: any[]; tags: any[] }) => {
  return (
    <div className="col-lg-4 mt-30">
      <aside className="sidebar">
        {/* Search Widget */}
        <div className="sidebar_widget">
          <h3 className="sidebar_widget_title">Rechercher</h3>
          <form className="form-group">
            <input
              className="form-control"
              type="search"
              name="search"
              placeholder="Rechercher un article..."
            />
            <button type="submit" className="search_icon" aria-label="Search">
              <Image src={searchIcon} alt="Search icon" />
            </button>
          </form>
        </div>

        {/* Recent Posts */}
        {/* <div className="sidebar_widget">
          <h3 className="sidebar_widget_title">Related Posts</h3>
          <ul className="recent_post_block list-unstyled">
            {blogs.slice(0, 3).map((blog) => (
              <li className="recent_post_item" key={blog.slug}>
                <h3 className="post-title border-effect-2">
                  <Link href="/blog-single">{blog.title}</Link>
                </h3>
                <span>
                  <Image src={authorIcon} alt="Author icon" width={16} height={16} />
                  By Michael David
                </span>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Categories */}
        <div className="sidebar_widget">
          <h3 className="sidebar_widget_title">Catégories</h3>
          <ul className="category_list_block list-unstyled">
            {categories.map((category) => (
              <li key={category._id}>
                <Link href={'/blog/?category=' + category.slug}>
                  <span>
                    <i className="far fa-arrow-right"></i>
                    {category.name}
                  </span>
                  {/* <span>
                    (
                    {Number(category._id) < 10
                      ? `0${category._id}`
                      : category._id}
                    )
                  </span> */}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="sidebar_widget">
          <h3 className="sidebar_widget_title">Tags</h3>
          <ul className="tags_block list-unstyled">
            {tags.map((tag, idx) => (
              <li key={idx}>
                <Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default BlogSidebar;
