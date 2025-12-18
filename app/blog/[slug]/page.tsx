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

// Static data
const staticBlog = {
  id: 1,
  title: "Sample Blog Post",
  content: "This is a sample blog post content.",
  slug: "sample-blog-post",
  // Add other blog properties as needed
};

const staticRelated = null;

const staticNavigation = {
  // Add navigation data if needed
};

const staticCategories = [
  { id: 1, name: "Technology", slug: "technology" },
  { id: 2, name: "Design", slug: "design" },
  // Add more categories as needed
];

const staticTags = [
  { id: 1, name: "React", slug: "react" },
  { id: 2, name: "Next.js", slug: "nextjs" },
  // Add more tags as needed
];

export default async function BlogDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const blogSlug = resolvedParams?.slug;
  
  if (!blogSlug) {
    notFound();
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
                    <h2 className="title">{staticBlog.title}</h2>
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
        {/* <BlogSingle 
          blog={staticBlog} 
          related={staticRelated} 
          navigation={staticNavigation} 
          categories={staticCategories} 
          tags={staticTags} 
        /> */}
      </main>
      <CtaSection cClass={"bg"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
}