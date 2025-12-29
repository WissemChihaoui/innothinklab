import React, { Fragment } from 'react';
import Header from '@/components/header/Header';
import Scrollbar from '@/components/scrollbar/scrollbar';
import Footer from '@/components/footer/Footer';
import CtaSection from '@/components/CtaSection/CtaSection';

import icon from '@/public/images/icon/ser-01.svg';
import srImg from '@/public/images/shape/brd_shape.png';
import srImg2 from '@/public/images/hero/sd-img.png';
import vImg from '@/public/images/video/img03.jpg';
import vImg2 from '@/public/images/video/polygon02.png';
import sImg1 from '@/public/images/icon/sd-icon01.svg';
import sImg2 from '@/public/images/icon/sd-icon02.svg';
import sImg3 from '@/public/images/icon/sd-icon03.svg';
import sImg4 from '@/public/images/icon/sd-icon04.svg';
import shape from '@/public/images/shape/sd-shape.png';
import sicon from '@/public/images/icon/check-icon.svg';
import Image from 'next/image';


const ServiceSinglePage = () => {

  return (
    <Fragment>
      <div className="sco_agency">
        <Header />
        <main className="page_content service-single-page">
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
                        <Image src={icon} alt="Icône Hébergement" /> Hébergement Web
                      </span>
                      <h2 className="title mb-30">Infrastructure fiable et performante pour votre présence en ligne</h2>
                    </div>
                  </div>
                  <div className="col-lg-3 mt-30">
                    <div className="sd-right-img pos-rel">
                      <Image src={srImg2} alt="" />
                      <div className="sd-arrow-shape">
                        <Image className="xbzoominzoomup" src={srImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="video pt-70 pb-65">
            <div className="container">
              <div className="xb-video sd-video pos-rel">
                <Image src={vImg} alt="" />
                <button className="popup-video btn-video">
                  <Image src={vImg2} alt="" />
                </button>
              </div>
            </div>
          </div>

          <div className="sd-ser-content_wrap pb-110">
            <div className="container">
              <div className="sd-ser-content">
                <h2 className="sd-title">Assurez la performance de votre site avec nos solutions d'hébergement</h2>
                <p className="sd-content">
                  Dans l'environnement digital actuel, l'hébergement web est essentiel pour garantir la disponibilité et la performance de votre site. En proposant des infrastructures robustes et sécurisées, vous améliorez non seulement la vitesse de chargement mais assurez également une expérience optimale pour vos visiteurs. Cette approche technique implique la sélection des serveurs appropriés, la configuration des systèmes de sécurité et la mise en place de solutions de sauvegarde qui garantissent la continuité de service. À mesure que votre infrastructure d'hébergement s'optimise, votre fiabilité augmente, menant à une meilleure expérience utilisateur et à une plus grande confiance de la part de vos clients.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment les performances de vos serveurs grâce à des analyses approfondies, en ajustant nos configurations selon les besoins pour maximiser la disponibilité. En privilégiant la sécurité plutôt que l'économie, nous cultivons un écosystème d'hébergement robuste qui renforce considérablement votre infrastructure technique et améliore les performances globales de vos applications. Nous mettons en œuvre des stratégies de monitoring proactives pour anticiper les problèmes et garantir une intervention rapide, en soulignant l'importance d'une infrastructure stable pour votre business.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus d'hébergement web</h2>
                <p className="sd-content">
                  Notre processus de service commence par une consultation approfondie et une analyse de vos besoins techniques, suivi d'une étude de vos exigences pour configurer une solution d'hébergement sur mesure. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des performances optimales et une maintenance continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse des besoins techniques</h3>
                  <p className="xb-item--contact">Évaluons vos exigences et définissons les objectifs de votre infrastructure.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Configuration de l'infrastructure</h3>
                  <p className="xb-item--contact">Analysons les meilleures solutions techniques pour identifier les opportunités.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Déploiement et sécurité</h3>
                  <p className="xb-item--contact">Déployons des solutions d'hébergement sécurisées adaptées à vos besoins.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Monitoring et maintenance</h3>
                  <p className="xb-item--contact">Assurons la surveillance continue et la maintenance de votre infrastructure.</p>
                  <span className="xb-item--number">04</span>
                </div>
                <div className="sd-shape">
                  <Image src={shape} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="sd-service_wrap pt-115 pb-130">
            <div className="container">
              <div className="sd-ser-outcome">
                <div className="sd-heading">
                  <h2 className="sd-title">Résultats de nos services d'hébergement</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Hébergement Web Performant" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Garantir la disponibilité 24/7.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser la vitesse de chargement.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Assurer la sécurité des données.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Maintenir la performance technique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Fournir un support technique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Garantir l'évolutivité.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <CtaSection />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default ServiceSinglePage;
