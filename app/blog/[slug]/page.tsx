import React, { Fragment } from "react";
import Header from "@/components/header/Header";
import Scrollbar from "@/components/scrollbar/scrollbar";
import Footer from "@/components/footer/Footer";
import CtaSection from "@/components/CtaSection/CtaSection";
import BlogSingle from "@/components/BlogDetails/BlogDetails";

import icon from "@/public/images/icon/cap.svg";
import Image1 from "@/public/images/hero/cd-img02.png";
import Image2 from "@/public/images/shape/brd_shape.png";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${slug}`);
  return res.json();
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
  return res.json();
}

async function getTags() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tags`);
  return res.json();
}


export default async function BlogDetailsPage({ params }: {params: {slug: string}}) {
  // Initialize variables at component level
  let blog = null;
  let related = null;
  let navigation = null;
  let categories = [];
  let tags = [];

  try {
    const resolvedParams = await params
    const blogSlug = resolvedParams?.slug;
    if (!blogSlug) {
      notFound()
    }
    const res = await getBlog(blogSlug);

    if (!res) {
      notFound()
    }

    const [blogData, categoriesData, tagsData] = await Promise.all([
      res,
      getCategories(),
      getTags()
    ]);

    ({ blog, related, navigation } = blogData);
    categories = categoriesData;
    tags = tagsData;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return <div>Error loading blog post. Please try again later.</div>;
  }

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
                      <Image src={icon} alt="Icon" /> Blog details
                    </span>
                    <h2 className="title">{blog?.title || 'Loading...'}</h2>
                  </div>
                </div>
                <div className="col-lg-3 mt-30">
                  <div className="sd-right-img pos-rel">
                    <Image src={Image1} alt="Right Illustration" />
                    <div className="sd-arrow-shape style-2">
                      <Image
                        className="xbzoominzoomup"
                        src={Image2}
                        alt="Arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BlogSingle blog={blog} related={related} navigation={navigation} categories={categories} tags={tags} />
      </main>

      <CtaSection cClass={"bg"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
}