'use client';

import React from 'react';
import ContactSection from '../../components/ContactSection';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import icon from '@/public/images/icon/music-icon.svg';
import bImg1 from '@/public/images/hero/contact-img.png';
import bImg2 from '@/public/images/shape/brd_shape.png';
import Image from 'next/image';

const ContactPage: React.FC = () => {
  return (
    <>
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
                      <Image src={icon} alt="Contact Icon" /> Contactez-nous
                    </span>
                    <h2 className="title">
                      Contactez notre équipe pour des <br />
                      solutions innovantes et <br />
                      votre succès numérique
                    </h2>
                  </div>
                </div>
                <div className="col-lg-3 mt-30">
                  <div className="page-title-img">
                    <Image src={bImg1} alt="Contact" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-shape">
            <div className="shape shape--one">
              <Image src={bImg2} alt="Shape" />
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="contact-info-section pt-130 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="contact-info-item text-center">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4>Email</h4>
                  <p>Contact@thinklab.tn</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="contact-info-item text-center">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <h4>Téléphone</h4>
                  <p>+216 99 310 778</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="contact-info-item text-center">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4>Adresse</h4>
                  <p>5 eme étage, Place F.Hached,<br />Immeuble Hadrumet, Sousse 4000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
        <CtaSection />
        <Footer />
      </div>
      <Scrollbar />
    </>
  );
};

export default ContactPage;
