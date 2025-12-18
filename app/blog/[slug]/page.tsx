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

// ✅ Changed: params is now Promise<{ slug: string }>
export default async function BlogDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // ✅ Changed: await params before using it
  const { slug } = await params;

  const { blog, related, navigation } = await getBlog(slug);

  const categories = await getCategories();
  const tags = await getTags();

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
                    <h2 className="title">{blog.title}</h2>
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