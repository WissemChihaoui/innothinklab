'use client';

import React, { Fragment } from 'react';
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

interface Section {
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    title: 'Droits d\'auteur et propriété intellectuelle',
    content: [
      `Tout le contenu de ce site web, y compris les textes, graphiques, logos et marques de commerce, est la propriété intellectuelle d'InnoThinkLab...`,
      `Les images sur ce site web peuvent inclure des photos de stock sous licence...`,
    ],
  },
  {
    title: 'Conditions d\'utilisation du site web',
    content: [
      `En accédant à ce site web, vous acceptez de respecter les conditions suivantes...`,
      `De plus, les utilisateurs ne doivent pas soumettre ou transmettre de contenu illégal, abusif, diffamatoire...`,
      `Ce site web peut contenir des liens vers des sites externes...`,
    ],
  },
  {
    title: 'Logiciels et services',
    content: [
      `Nos services sont fournis "tels quels" et "selon disponibilité"...`,
    ],
  },
  {
    title: 'Politique des informations personnelles',
    content: [
      `InnoThinkLab adhère à des pratiques commerciales éthiques et protège vos informations personnelles...`,
    ],
  },
  {
    title: 'Avertissement',
    content: [
      `Les informations sur ce site web sont fournies de bonne foi et proviennent de fournisseurs fiables...`,
      `InnoThinkLab décline toutes garanties, y compris celles liées à l'adéquation à un usage particulier...`,
    ],
  },
  {
    title: 'Limitation de responsabilité',
    content: [
      `InnoThinkLab décline toute responsabilité pour les dommages, y compris la perte de données ou de profits...`,
    ],
  },
];

const TermsPage: React.FC = () => {
  return (
    <Fragment>
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
                      <Image src={icon} alt="Icône Conditions" /> Conditions Générales d'Utilisation
                    </span>
                    <h2 className="title">
                      Conditions générales d'utilisation du site web <br />
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
                            <Image src={img} alt={`Terms visual ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                      <div className="cp-item marquee-2">
                        {[gImg4, gImg5, gImg6, gImg4, gImg5, gImg6].map((img, i) => (
                          <div className="xb-img" key={`img2-${i}`}>
                            <Image src={img} alt={`Terms visual ${i + 7}`} />
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
                  {sections.map((section, index) => (
                    <div className="item-details-widget" key={index}>
                      <h2 className="item_details_info_title">{section.title}</h2>
                      {section.content.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                    </div>
                  ))}
                  <div className="item-details-widget">
                    <h2 className="item_details_info_title">Contact</h2>
                    <p>
                      <Link href="/contact" className="details-link">
                        Cliquez ici
                      </Link>{' '}
                      pour nous contacter concernant ces Conditions Générales d'Utilisation ou d'autres questions connexes. Vous pouvez également nous envoyer un e-mail à :{' '}
                      <a href="mailto:contact@innothinklab.com">contact@innothinklab.com</a>
                    </p>
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
    </Fragment>
  );
};

export default TermsPage;
