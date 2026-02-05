'use client';

import React from 'react';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';
import icon from '@/public/images/icon/magic.png';
import about1 from '@/public/images/icon/airdrop.png';
import about2 from '@/public/images/icon/people.png';
import about3 from '@/public/images/icon/microphone.png';

const About: React.FC = () => {
  return (
    <section id="about" className="about m-lr">
      <div className="about-wrapper sec-bg pos-rel pb-130 pt-130">
        <div className="container">
          <div className="sec-title--two text-center">
            <Fade direction="down" triggerOnce={false} duration={1000} delay={9}>
              <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
                <Image src={icon} alt="InnoThinkLab" />
                {' '}À propos de nous
              </div>
            </Fade>
            <Fade direction="down" triggerOnce={false} duration={1500} delay={9}>
              <h2 className="title wow fadeInDown" data-wow-delay="150ms" data-wow-duration="600ms">
                Structurer, développer et optimiser votre écosystème digital
              </h2>
            </Fade>
          </div>

          <div className="row">
            {/* Left Column */}
            <div className="col-lg-6 mt-50">
              <div className="about-left">
                <h2 className="title">Nos Valeurs</h2>

                <div className="about-item_box ul_li">
                  <div className="xb-item--icon">
                    <Image src={about1} alt="Innovation icon" />
                  </div>
                  <div className="xb-item--holder">
                    <p className="xb-item--content">
                      <span>Maîtrise technologique :</span> Des solutions conçues avec exigence, reposant sur des architectures solides, évolutives et maîtrisées.
                    </p>
                  </div>
                </div>

                <div className="about-item_box ul_li">
                  <div className="xb-item--icon">
                    <Image src={about2} alt="Client Focus icon" />
                  </div>
                  <div className="xb-item--holder">
                    <p className="xb-item--content">
                      <span>Approche Client :</span> Chaque projet est pensé sur mesure, en tenant compte des contraintes opérationnelles, des usages et des objectifs spécifiques de chaque organisation.
                    </p>
                  </div>
                </div>

                <div className="about-item_box ul_li">
                  <div className="xb-item--icon">
                    <Image src={about3} alt="Transparency icon" />
                  </div>
                  <div className="xb-item--holder">
                    <p className="xb-item--content">
                      <span>Exigence :</span> Un engagement constant sur la qualité, la fiabilité et la pertinence des solutions livrées, dans une logique de partenariat durable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6 mt-50">
              <div className="about-right">
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Notre Mission</h3>
                  <p className="xb-item--content">
                    Accompagner les entreprises et institutions dans la structuration et le déploiement de solutions digitales performantes, en combinant analyse, expertise technologique et compréhension des enjeux métiers afin de créer une valeur durable et mesurable.
                  </p>
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Notre Vision</h3>
                  <p className="xb-item--content">
                    Devenir un partenaire de référence pour les organisations souhaitant renforcer leur écosystème digital, grâce à des solutions fiables, une approche méthodique et une vision long terme de la performance numérique.
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="xb-btn text-center mt-90 wow fadeInUp" data-wow-duration="600ms">
              <Fade direction="up" triggerOnce={false} duration={1500} delay={9}>
                <Link href="/about" className="thm-btn thm-btn--aso">
                  En savoir plus sur nous
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
