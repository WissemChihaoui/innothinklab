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
                Votre Partenaire en Solutions Numériques
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
                      <span>Innovation :</span> Des solutions technologiques de pointe pour votre réussite numérique.
                    </p>
                  </div>
                </div>

                <div className="about-item_box ul_li">
                  <div className="xb-item--icon">
                    <Image src={about2} alt="Client Focus icon" />
                  </div>
                  <div className="xb-item--holder">
                    <p className="xb-item--content">
                      <span>Approche Client :</span> Des solutions sur mesure adaptées à vos besoins spécifiques.
                    </p>
                  </div>
                </div>

                <div className="about-item_box ul_li">
                  <div className="xb-item--icon">
                    <Image src={about3} alt="Transparency icon" />
                  </div>
                  <div className="xb-item--holder">
                    <p className="xb-item--content">
                      <span>Excellence :</span> Un engagement envers la qualité et les résultats concrets.
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
                    Notre mission est de transformer votre présence numérique grâce à des solutions web et mobiles innovantes, en mettant l'accent sur la qualité, la performance et l'expérience utilisateur.
                  </p>
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Notre Vision</h3>
                  <p className="xb-item--content">
                    Être le partenaire de référence pour les entreprises ambitieuses qui cherchent à se démarquer dans l'univers numérique, en combinant créativité, expertise technique et approche centrée sur les résultats.
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
