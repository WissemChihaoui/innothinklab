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
import { getAllBlogs, getAllCategories, getAllTags } from '@/lib/blogServices';

interface HomePageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
        tag?: string;
    }>;
}

export default async function BlogPage({ searchParams }: HomePageProps) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const category = resolvedSearchParams.category;
    const tag = resolvedSearchParams.tag;

    const result = await getAllBlogs({
        page,
        category,
        tag,
        limit: 6,
    });

    const categories = await getAllCategories();
    const tags = await getAllTags();

    const { blogs, currentPage, totalPages, totalBlogs, hasNextPage, hasPrevPage } = result;

    // Convert Date objects to plain strings to avoid serialization issues
    const serializedBlogs = blogs.map((blog: any) => ({
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

    console.log(result)

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
                    blogs={serializedBlogs}
                    pagination={{ currentPage: currentPage, totalPages: totalPages, totalBlogs: totalBlogs, hasNextPage: hasNextPage, hasPrevPage: hasPrevPage }}
                    categories={serializedCategories}
                    tags={serializedTags}
                    filter={{ category, tag }}
                />
            </main>
            <CtaSection />
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};