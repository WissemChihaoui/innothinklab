'use client';
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectImageUrl } from '@/lib/imageUtils';

interface ProjectWithServices {
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
  completedDate: string; // Changed from Date to string
  location: string;
  content: string;
  createdAt: string; // Changed from Date to string
  updatedAt: string; // Changed from Date to string
}

interface CaseSectionProps {
  projects: ProjectWithServices[];
  services: any[];
}

const CaseStudySection: React.FC<CaseSectionProps> = ({ projects, services }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilter = (category: string) => {
    setActiveFilter(category);
  };

  const filters = [
    { key: "all", label: "Tous les projets" },
    ...services.map((service: any) => ({
      key: service.slug,
      label: service.name
    }))
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter((project: ProjectWithServices) => 
        project.services.some((service: any) => service.slug === activeFilter)
      );

  return (
    <section className="casestudy pt-70 pb-130" style={{ backgroundColor: "#f6f6f8" }}>
      <div className="container">
        {/* Filter Buttons */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="team-menu casestudy-menu">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  className={activeFilter === filter.key ? "active" : ""}
                  onClick={() => handleFilter(filter.key)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="casestudy-content mt-70">
          <div className="row grid mt-none-30">
            <AnimatePresence>
              {filteredProjects.map((project: ProjectWithServices, index: number) => (
                <motion.div
                  key={project._id}
                  className="col-lg-4 col-md-6 grid-item mt-30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="casestudy-item">
                    <div className="casestudy-img">
                      <Link href={`/casestudy/${project.slug}`}>
                        <img 
                          src={getProjectImageUrl(project.coverImage)} 
                          alt={project.title}
                          title={project.title}
                          style={{width: '100%', height: '250px', objectFit: 'cover'}}
                        />
                      </Link>
                      <div className="content_wrap">
                        <h2 className="item_title">{project.title}</h2>
                        <span className="item_tag">{project.clientName}</span>
                      </div>
                    </div>
                    <Link href={`/casestudy/${project.slug}`}>
                      <span className="xb-overlay"></span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          <div className="text-center xb-btn mt-55">
            <Link href="/casestudy" className="thm-btn thm-btn--aso thm-btn--aso_black">
              Voir plus d'études de cas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
