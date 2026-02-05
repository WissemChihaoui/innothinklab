import React, { Fragment } from 'react';
import CaseStudySection from './CaseSection';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import icon from '@/public/images/icon/eye-icon.svg';
import sImg1 from '@/public/images/hero/cd-img02.png';
import sImg2 from '@/public/images/shape/brd_shape.png';
import { getAllProjects, getAllServices } from '@/lib/projectServices';

interface SerializedProject {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  clientName: string;
  services: {
    _id: string;
    name: string;
    slug: string;
  }[];
  completedDate: string;
  location: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const CaseStudyPage = async () => {
  // Fetch data on server side
  let projects: SerializedProject[] = [];
  let services: any[] = [];
  
  try {
    const [projectsData, servicesData] = await Promise.all([
      getAllProjects(),
      getAllServices()
    ]);
    
    // Serialize MongoDB objects to plain objects
    projects = projectsData.map(project => ({
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
    }));
    
    services = servicesData.map((service: any) => ({
      ...service,
      _id: service._id.toString(),
      createdAt: service.createdAt instanceof Date ? service.createdAt.toISOString() : service.createdAt,
      updatedAt: service.updatedAt instanceof Date ? service.updatedAt.toISOString() : service.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching case study data:', error);
  }

  return (
    <Fragment>
      <div className="body_wrap sco_agency">
        <Header />
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
                      <img src={icon.src} alt="" style={{width: '20px', height: '20px', marginRight: '8px', display: 'inline-block'}} /> Études de cas
                    </span>
                    <h2 className="title">
                      Découvrez nos études de cas <br /> mettant en valeur des solutions <br /> SEO et IT
                      transformatrices
                    </h2>
                  </div>
                </div>
                <div className="col-lg-3 mt-30">
                  <div className="sd-right-img pos-rel">
                    <img src={sImg1.src} alt="" style={{width: '100%', height: 'auto'}} />
                    <div className="sd-arrow-shape style-2">
                      <img className="xbzoominzoomup" src={sImg2.src} alt="" style={{width: '100%', height: 'auto'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CaseStudySection projects={projects} services={services} />
        <CtaSection />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default CaseStudyPage;
