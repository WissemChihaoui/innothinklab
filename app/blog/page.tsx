import React, { Fragment } from 'react';
import icon from '@/public/images/icon/cap.svg';
import Image1 from '@/public/images/hero/cd-img02.png';
import Image2 from '@/public/images/shape/brd_shape.png';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import BlogList from '../../components/BlogList';
import Image from 'next/image';

async function getBlogs(searchParams: { category?: string; tag?: string; page?: string } = {}) {
    const params = new URLSearchParams();

    if (searchParams.category) {
        params.append('category', searchParams.category);
    }

    if (searchParams.tag) {
        params.append('tag', searchParams.tag);
    }

    if (searchParams.page) {
        params.append('page', searchParams.page);
    }

    const queryString = params.toString();
    console.log(queryString)
    const url = `${process.env.NEXTAUTH_URL}/api/blogs/list${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
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

// ✅ Changed: searchParams is now a Promise
interface BlogPageProps {
    searchParams: Promise<{
        category?: string;
        tag?: string;
        page?: string;
    }>;
}

// ✅ Changed: await searchParams before using it
export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedSearchParams = await searchParams;
    
    const res = await getBlogs(resolvedSearchParams);
    const categories = await getCategories();
    const tags = await getTags();

    console.log(res)
    return (
        <Fragment>
            <Header />
            <main className="page_content blog-page">
                <section className="page-title pt-200 pos-rel bg_img" style={{ backgroundImage: `url('/images/bg/page_bg01.jpg')` }}>
                    <div className="container">
                        <div className="page-title-wrap sd-title-wrap">
                            <div className="row mt-none-30 align-items-end">
                                <div className="col-lg-9 mt-30">
                                    <div className="page-title-box">
                                        <span className="sub-title">
                                            <Image src={icon} alt="Blog Icon" /> Blog
                                        </span>
                                        <h2 className="title">
                                            Expert insights from our SEO <br />
                                            & IT solutions blog your <br />
                                            source for success
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-3 mt-30">
                                    <div className="sd-right-img pos-rel">
                                        <Image src={Image1} alt="Blog Header Illustration" />
                                        <div className="sd-arrow-shape style-2">
                                            <Image className="xbzoominzoomup" src={Image2} alt="Decorative Shape" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BlogList
                    blogs={res?.data || []}
                    categories={categories}
                    tags={tags}
                    filter={{ category: resolvedSearchParams.category || '', tag: '' }}
                    pagination={res?.pagination}
                />
            </main>
            <CtaSection />
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};