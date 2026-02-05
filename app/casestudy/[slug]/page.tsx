import React from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Scrollbar from '@/components/scrollbar/scrollbar';
import CtaSection from '@/components/CtaSection/CtaSection';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projectServices';
import { getProjectImageUrl, getProjectLogoUrl } from '@/lib/imageUtils';

import icon from '@/public/images/icon/eye-icon.svg';
import caseImg from '@/public/images/service/cd-image.jpg';
import cIcon1 from '@/public/images/icon/csd-icon01.svg';
import cIcon2 from '@/public/images/icon/csd-icon02.svg';
import cIcon3 from '@/public/images/icon/csd-icon03.svg';
import cIcon4 from '@/public/images/icon/csd-icon04.svg';
import cIcon from '@/public/images/icon/check-icon.svg';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);
  
  if (!projectData) {
    notFound();
  }
  
  const { project, prev, next, related } = projectData;

  // Serialize MongoDB objects to plain objects
  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    completedDate: project.completedDate instanceof Date ? project.completedDate.toISOString() : project.completedDate,
    createdAt: project.createdAt instanceof Date ? project.createdAt.toISOString() : project.createdAt,
    updatedAt: project.updatedAt instanceof Date ? project.updatedAt.toISOString() : project.updatedAt,
    services: project.services.map((service: any) => ({
      ...service,
      _id: service._id.toString(),
      createdAt: service.createdAt instanceof Date ? service.createdAt.toISOString() : service.createdAt,
      updatedAt: service.updatedAt instanceof Date ? service.updatedAt.toISOString() : service.updatedAt
    }))
  };

  const serializedRelated = related.map((relatedProject: any) => ({
    ...relatedProject,
    _id: relatedProject._id.toString(),
    completedDate: relatedProject.completedDate instanceof Date ? relatedProject.completedDate.toISOString() : relatedProject.completedDate,
    createdAt: relatedProject.createdAt instanceof Date ? relatedProject.createdAt.toISOString() : relatedProject.createdAt,
    updatedAt: relatedProject.updatedAt instanceof Date ? relatedProject.updatedAt.toISOString() : relatedProject.updatedAt,
    services: relatedProject.services.map((service: any) => ({
      ...service,
      _id: service._id.toString(),
      createdAt: service.createdAt instanceof Date ? service.createdAt.toISOString() : service.createdAt,
      updatedAt: service.updatedAt instanceof Date ? service.updatedAt.toISOString() : service.updatedAt
    }))
  }));

  return (
    <div className="body_wrap sco_agency">
      <Header />
      <section className="page-title pt-200 pos-rel bg_img" style={{ backgroundImage: `url(/images/bg/page_bg01.jpg)` }}>
        <div className="container">
          <div className="page-title-wrap">
            <div className="row mt-none-30 align-items-end">
              <div className="col-lg-9 mt-30">
                <div className="page-title-box">
                  <span className="sub-title">
                    <img src={icon.src} alt="" style={{width: '20px', height: '20px', marginRight: '8px', display: 'inline-block'}} /> {serializedProject.clientName}
                  </span>
                  <h2 className="title">
                    {serializedProject.title}
                  </h2>
                </div>
              </div>
              <div className="col-lg-3 mt-30">
                <div className="count-box">
                  <h2 className="number">
                    {related.length}<span className="suffix">+</span>
                  </h2>
                  <span className="text">projets <br />similaires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="csd-img pt-70 pb-65">
        <div className="container">
          <div className="item-details_image pos-rel">
            <img 
              src={getProjectImageUrl(serializedProject.coverImage)} 
              alt={serializedProject.title}
              style={{width: '100%', height: 'auto'}}
            />
          </div>
        </div>
      </div>

      <div className="sd-ser-content_wrap pb-90">
        <div className="container">
          <div className="sd-ser-content">
            <h2 className="sd-title">{serializedProject.title}</h2>
            <div className="sd-content" dangerouslySetInnerHTML={{ __html: serializedProject.content }} />
          </div>
        </div>
      </div>

      <div className="csd-ser_warp">
        <div className="container">
          <div className="csd-ser_inner ul_li_between">
            <div className="csd-item ul_li">
              <div className="xb-icon">
                <img src={cIcon1.src} alt="" style={{width: '40px', height: '40px'}} />
              </div>
              <h6 className="xb-text">
                client : <span> {serializedProject.clientName}</span>
              </h6>
            </div>
            <div className="csd-item ul_li">
              <div className="xb-icon">
                <img src={cIcon2.src} alt="" style={{width: '40px', height: '40px'}} />
              </div>
              <h6 className="xb-text">
                services : <span> {serializedProject.services.map((service: any) => service.name).join(', ')}</span>
              </h6>
            </div>
            <div className="csd-item ul_li">
              <div className="xb-icon">
                <img src={cIcon3.src} alt="" style={{width: '40px', height: '40px'}} />
              </div>
              <h6 className="xb-text">
                completed date : <span> {new Date(serializedProject.completedDate).toLocaleDateString('fr-FR')}</span>
              </h6>
            </div>
            <div className="csd-item ul_li">
              <div className="xb-icon">
                <img src={cIcon4.src} alt="" style={{width: '40px', height: '40px'}} />
              </div>
              <h6 className="xb-text">
                location : <span> {serializedProject.location}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-service_wrap pt-90 pb-130">
        <div className="container">
          <div className="sd-ser-outcome">
            <div className="sd-heading">
              <h2 className="sd-title">Project requirement</h2>
              <p className="sd-content">
                Our client {serializedProject.clientName} seeks optimize presence across platforms with our {serializedProject.services.map((service: any) => service.name).join(', ')} services.
              </p>
            </div>

            <div className="sd-list-item ul_li">
              <ul className="sd-ser-list list-unstyled">
                {serializedProject.services.map((service: any) => (
                  <li key={service._id}>
                    <img src={cIcon.src} alt="" style={{width: '16px', height: '16px', marginRight: '8px'}} /> {service.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-heading csd-heading pt-90">
              <h2 className="sd-title">Solution & result</h2>
              <p className="sd-content">
                <span>Solution:</span> We successfully delivered {serializedProject.services.map((service: any) => service.name).join(', ')} services for {serializedProject.clientName}, completing the project on {new Date(serializedProject.completedDate).toLocaleDateString('fr-FR')} in {serializedProject.location}.
              </p>
            </div>

            <div className="similar-casestudy pt-80">
              <h2 className="similar-casestudy-title">Our similar casestudy</h2>
              <div className="row mt-none-30">
                {serializedRelated.map((relatedProject: any) => (
                  <div className="col-lg-4 col-md-6 mt-30" key={relatedProject._id}>
                    <div className="casestudy-item">
                      <div className="casestudy-img">
                        <Link href={`/casestudy/${relatedProject.slug}`}>
                          <img 
                            src={getProjectImageUrl(relatedProject.coverImage)} 
                            alt={relatedProject.title}
                            style={{width: '100%', height: '200px', objectFit: 'cover'}}
                          />
                        </Link>
                        <div className="content_wrap">
                          <h3 className="item_title">{relatedProject.title}</h3>
                          <span className="item_tag">{relatedProject.clientName}</span>
                        </div>
                      </div>
                      <Link href={`/casestudy/${relatedProject.slug}`} className="xb-overlay"></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CtaSection />
      <Footer />
      <Scrollbar />
    </div>
  );
}
