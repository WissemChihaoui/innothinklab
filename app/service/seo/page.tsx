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
                        <Image src={icon} alt="Icône SEO" /> Référencement SEO
                      </span>
                      <h2 className="title mb-30">Optimisation complète pour améliorer votre visibilité en ligne</h2>
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
                <h2 className="sd-title">Améliorez votre classement avec nos stratégies SEO avancées</h2>
                <p className="sd-content">
                  Dans le paysage numérique concurrentiel d'aujourd'hui, le référencement SEO est essentiel pour améliorer la visibilité et l'autorité de votre site web. En mettant en œuvre des techniques SEO optimales, vous améliorez non seulement votre classement dans les moteurs de recherche mais établissez également votre crédibilité dans votre secteur. Cette approche stratégique implique l'identification des mots-clés pertinents, l'optimisation technique du site et la création de contenu de qualité qui favorise le référencement naturel. À mesure que votre profil SEO se renforce, votre autorité de domaine augmente, menant à un trafic organique accru et à une plus grande confiance de la part des utilisateurs et des moteurs de recherche.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment vos performances SEO grâce à des analyses approfondies, en ajustant nos stratégies selon les résultats pour maximiser votre visibilité. En privilégiant la qualité plutôt que la quantité, nous cultivons un écosystème de référencement robuste qui renforce considérablement l'autorité de votre site et améliore ses performances globales dans les résultats de recherche. Nous mettons en œuvre des campagnes de netlinking ciblées pour connecter votre site avec des sources pertinentes et des influenceurs de votre secteur, en soulignant la valeur que votre contenu apporte.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus d'optimisation SEO</h2>
                <p className="sd-content">
                  Notre processus de service commence par un audit SEO complet et une analyse de votre site web, suivi d'une étude des concurrents pour informer une stratégie de référencement sur mesure. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des résultats optimaux et une amélioration continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Audit SEO initial</h3>
                  <p className="xb-item--contact">Évaluons les performances SEO de votre site et identifions les points d'amélioration.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse concurrentielle SEO</h3>
                  <p className="xb-item--contact">Analysons les stratégies SEO des concurrents pour identifier les opportunités.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Stratégie de référencement</h3>
                  <p className="xb-item--contact">Mettons en œuvre des techniques SEO adaptées à vos objectifs spécifiques.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Suivi et optimisation</h3>
                  <p className="xb-item--contact">Suivons les performances et optimisons continuellement votre référencement.</p>
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
                  <h2 className="sd-title">Résultats de nos services SEO</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Référencement SEO Avancé" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer la visibilité organique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Augmenter le trafic qualifié.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Renforcer l'autorité de domaine.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser le taux de conversion.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer le classement des mots-clés.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Garantir une croissance durable.
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
