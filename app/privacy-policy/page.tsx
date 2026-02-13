'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import icon from '@/public/images/icon/magic.svg';
import gImg1 from '@/public/images/gallery/cp-img01.jpg';
import gImg2 from '@/public/images/gallery/cp-img02.jpg';
import gImg3 from '@/public/images/gallery/cp-img03.jpg';
import gImg4 from '@/public/images/gallery/cp-img04.jpg';
import gImg5 from '@/public/images/gallery/cp-img05.jpg';
import gImg6 from '@/public/images/gallery/cp-img06.jpg';
import Image from 'next/image';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <div className="body_wrap sco_agency">
        <Header />
        <section
          className="page-title cp-page-title pt-200 pos-rel bg_img"
          style={{ backgroundImage: `url('/images/bg/page_bg01.jpg')` }}
        >
          <div className="container">
            <div className="page-title-wrap">
              <div className="row mt-none-30 align-items-center">
                <div className="col-lg-8 mt-30">
                  <div className="page-title-box">
                    <span className="sub-title">
                      <Image src={icon} alt="Icône Confidentialité" /> Politique de Confidentialité
                    </span>
                    <h2 className="title">
                      Politique de confidentialité du site web <br />
                      InnoThinkLab et vos droits <br />
                      d'accès et d'utilisation
                    </h2>
                    <span className="page-update_time">Mis à jour le : 29 décembre 2025</span>
                  </div>
                </div>
                <div className="col-lg-4 mt-30">
                  <div className="cp-img-slide">
                    <div className="cp-img-inner ul_li">
                      <div className="cp-item marquee-first">
                        {[gImg1, gImg2, gImg3, gImg1, gImg2, gImg3].map((img, i) => (
                          <div className="xb-img" key={`img1-${i}`}>
                            <Image src={img} alt={`Gallery Image ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                      <div className="cp-item marquee-2">
                        {[gImg4, gImg5, gImg6, gImg4, gImg5, gImg6].map((img, i) => (
                          <div className="xb-img" key={`img2-${i}`}>
                            <Image src={img} alt={`Gallery Image ${i + 7}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="terms-conditions-section cp-det-bg">
          <div className="container">
            <div className="terms-section_inner pt-120 pb-75">
              <div className="row">
                <div className="col-lg-11">
                  {[
                    {
                      title: 'Contrôleur de données et collecte de données',
                      content: [
                        'InnoThinkLab s\'engage à protéger votre vie privée...',
                        'Certains types de données peuvent être nécessaires pour accéder et utiliser des fonctionnalités spécifiques...',
                      ],
                    },
                    {
                      title: 'Responsabilités de l\'utilisateur',
                      content: [
                        'Les utilisateurs sont responsables des données tierces partagées via le site web InnoThinkLab...',
                      ],
                    },
                    {
                      title: 'Traitement et sécurité des données',
                      content: [
                        'Les données sont traitées à l\'aide de systèmes IT sécurisés dans les bureaux opérationnels d\'InnoThinkLab...',
                      ],
                    },
                    {
                      title: 'Stockage et conservation des données',
                      content: [
                        'Les données personnelles ne sont conservées que le temps nécessaire...',
                      ],
                    },
                    {
                      title: 'Action légale',
                      content: [
                        'InnoThinkLab peut divulguer des données personnelles pour se conformer aux obligations légales...',
                      ],
                    },
                    {
                      title: 'Droits de l\'utilisateur',
                      content: [
                        'Les utilisateurs ont le droit d\'accéder, de mettre à jour ou de supprimer leurs données personnelles...',
                      ],
                      list: [
                        'Les utilisateurs peuvent demander des informations sur les données personnelles détenues par InnoThinkLab.',
                        'Corriger toute donnée inexacte ou incomplète.',
                        'Demander la suppression de leurs données lorsqu\'elles ne sont plus nécessaires.',
                        'Demander leurs données dans un format transférable.',
                        'Limiter le traitement de leurs données dans certaines situations.',
                        'S\'opposer au traitement de leurs données à des fins de marketing direct ou d\'intérêts légitimes.',
                        'Retirer le consentement au traitement des données à tout moment.',
                        'Déposer une plainte auprès d\'une autorité de contrôle s\'ils estiment que leurs droits sont violés.',
                      ],
                    },
                    {
                      title: "Demandes 'Ne pas suivre'",
                      content: [
                        'InnoThinkLab ne prend actuellement pas en charge les demandes "Ne pas suivre"...',
                      ],
                    },
                    {
                      title: 'Mises à jour de la politique',
                      content: [
                        'InnoThinkLab peut mettre à jour cette Politique de Confidentialité périodiquement...',
                      ],
                    },
                    {
                      title: 'Retargeting et cookies publicitaires',
                      content: [
                        'InnoThinkLab utilise des cookies à des fins publicitaires via des partenaires comme AdRoll...',
                      ],
                    },
                  ].map((section, i) => (
                    <div className="item-details-widget" key={i}>
                      <h2 className="item_details_info_title">{section.title}</h2>
                      {section.content.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                      {section.list && (
                        <ul className="privacy-details">
                          {section.list.map((item, liIdx) => (
                            <li key={liIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="item-details-widget">
                    <h2 className="item_details_info_title">Contact</h2>
                    <p>
                      <Link href="/contact" className="details-link">
                        Cliquez ici
                      </Link>{' '}
                      pour nous contacter concernant cette Politique de Confidentialité ou d'autres questions connexes. Vous pouvez également nous envoyer un e-mail à :{' '}
                      <a href="mailto:contact@innothinklab.com">contact@innothinklab.com</a>
                    </p>
                  </div>

                  <div className="item-details-widget">
                    <h2 className="item_details_info_title">Téléchargement</h2>
                    <p>
                      Vous pouvez télécharger notre règlement intérieur complet au format PDF :
                    </p>
                    <div className="download-section mt-20">
                      <a 
                        href="/regelement_interieur.pdf" 
                        download="regelement_interieur.pdf"
                        className="thm-btn thm-btn--border"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: '2px solid #0C111D',
                          color: '#0C111D',
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0C111D';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#0C111D';
                        }}
                      >
                        <i className="fas fa-download me-2"></i>
                        Télécharger le règlement intérieur
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection cClass="bg" />
      </div>
      <Footer />
      <Scrollbar />
    </>
  );
};

export default PrivacyPage;
