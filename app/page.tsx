import React, { Fragment } from 'react';
import Header from '../components/header/Header';
import Hero from '../components/hero/hero';
import PartnerSection from '../components/PartnerSection';
import About from '../components/about/about';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import WorkProcess from '../components/WorkProcess/WorkProcess';
import IndustrieSection from '../components/IndustrieSection/IndustrieSection';
import Testimonial from '../components/Testimonial/Testimonial';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import TeamSection from '../components/TeamSection/TeamSection';
import FaqSection from '../components/FaqSection/FaqSection';
import CtaSection from '../components/CtaSection/CtaSection';
import Footer from '../components/footer/Footer';
import Scrollbar from '../components/scrollbar/scrollbar';
import { getAllProjects } from '@/lib/projectServices';
import { getProjectImageUrl } from '@/lib/imageUtils';

// Project interface for serialized data
interface SerializedProject {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  logo?: string;
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

const HomePage = async () => {
  // Fetch last 3 projects
  let projects: SerializedProject[] = [];
  try {
    const projectsData = await getAllProjects();
    // Serialize MongoDB objects to plain objects and take last 3
    projects = projectsData.slice(-3).reverse().map(project => ({
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
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

    return (
        <Fragment>
            <div className='body_wrap sco_agency'>
                <Header />
                <main className="page_content">
                    <Hero />
                    {/* <PartnerSection /> */}
                    <About />
                    <ServiceSection />
                    <ProjectSection projects={projects} />
                    <WorkProcess />
                    <IndustrieSection />
                    <Testimonial />
                    <FeaturesSection />
                    {/* <TeamSection /> */}
                    <FaqSection />
                    <CtaSection />  
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    )
};
export default HomePage;