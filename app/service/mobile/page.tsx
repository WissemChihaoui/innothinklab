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
                        <Image src={icon} alt="Icône Service Mobile" /> Développement Mobile
                      </span>
                      <h2 className="title mb-30">Développement robust et fiable pour les applications mobiles</h2>
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
                <h2 className="sd-title">Développez votre présence mobile avec nos applications sur mesure</h2>
                <p className="sd-content">
                  Dans l'écosystème mobile actuel, le développement d'applications est essentiel pour améliorer l'engagement et la visibilité de votre marque. En créant des applications mobiles performantes et intuitives, vous améliorez non seulement l'expérience utilisateur mais établissez également une connexion directe avec vos clients. Cette approche stratégique implique l'identification des besoins spécifiques aux mobiles, la création d'interfaces utilisateur optimales et le développement de solutions techniques robustes qui favorisent l'engagement naturel. À mesure que votre présence mobile se développe, votre base d'utilisateurs augmente, menant à une meilleure rétention et à une plus grande fidélité de la part des clients.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment les performances de vos applications grâce à des analyses approfondies, en ajustant nos stratégies selon les retours utilisateurs pour maximiser les résultats. En privilégiant la qualité plutôt que la quantité, nous cultivons un écosystème mobile robuste qui renforce considérablement l'engagement de vos utilisateurs et améliore les performances globales de vos applications. Nous mettons en œuvre des stratégies de distribution ciblées pour connecter votre application avec les bonnes opportunités et les influenceurs pertinents de votre secteur, en soulignant la valeur que votre solution mobile apporte.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus de développement mobile</h2>
                <p className="sd-content">
                  Notre processus de service commence par une consultation approfondie et une analyse de votre projet mobile, suivi d'une étude de marché pour informer une stratégie de développement sur mesure. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des résultats optimaux et une amélioration continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse des besoins mobiles</h3>
                  <p className="xb-item--contact">Évaluons vos besoins et définissons les objectifs de votre application mobile.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Étude de marché mobile</h3>
                  <p className="xb-item--contact">Analysons les applications concurrentes pour identifier les meilleures opportunités.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Développement de l'application</h3>
                  <p className="xb-item--contact">Créons des applications mobiles adaptées à vos besoins spécifiques.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Lancement et maintenance</h3>
                  <p className="xb-item--contact">Assurons le déploiement et la maintenance continue de votre application.</p>
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
                  <h2 className="sd-title">Résultats de nos services mobiles</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Développement Mobile sur Mesure" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer l'engagement utilisateur.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser l'expérience mobile.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Augmenter la rétention client.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Assurer la performance technique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Maximiser les téléchargements.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Garantir la scalabilité.
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
