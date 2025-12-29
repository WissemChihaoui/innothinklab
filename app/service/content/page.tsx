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
                        <Image src={icon} alt="Icône Création de Contenu" /> Création de Contenu
                      </span>
                      <h2 className="title mb-30">Contenu engageant qui raconte votre histoire et convertit</h2>
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
                <h2 className="sd-title">Donnez vie à votre marque avec notre contenu de qualité</h2>
                <p className="sd-content">
                  Dans l'univers digital d'aujourd'hui, la création de contenu est essentielle pour améliorer l'engagement et la pertinence de votre marque. En produisant du contenu de qualité et engageant, vous améliorez non seulement votre visibilité mais établissez également une connexion authentique avec votre audience. Cette approche stratégique implique l'identification des sujets pertinents, la création de contenu optimisé et la distribution sur les canaux appropriés qui favorisent l'engagement naturel. À mesure que votre stratégie de contenu se développe, votre autorité thématique augmente, menant à une meilleure rétention et à une plus grande fidélité de la part de votre audience.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment les performances de votre contenu grâce à des analyses approfondies, en ajustant notre stratégie selon les résultats pour maximiser l'impact. En privilégiant la qualité plutôt que la quantité, nous cultivons un écosystème de contenu robuste qui renforce considérablement votre storytelling et améliore les performances globales de votre communication. Nous mettons en œuvre des stratégies de distribution ciblées pour connecter votre contenu avec les bonnes audiences et les influenceurs pertinents de votre secteur, en soulignant la valeur que votre message apporte.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus de création de contenu</h2>
                <p className="sd-content">
                  Notre processus de service commence par une consultation approfondie et une analyse de votre voix de marque, suivi d'une étude de votre audience pour informer une stratégie de contenu sur mesure. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des résultats optimaux et une amélioration continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse de voix de marque</h3>
                  <p className="xb-item--contact">Évaluons votre identité et définissons les objectifs de votre stratégie de contenu.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Recherche et planification</h3>
                  <p className="xb-item--contact">Analysons les tendances de contenu pour identifier les meilleures opportunités.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Création et production</h3>
                  <p className="xb-item--contact">Produisons du contenu de qualité adapté à vos objectifs spécifiques.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Distribution et optimisation</h3>
                  <p className="xb-item--contact">Assurons la diffusion de votre contenu et optimisons continuellement les performances.</p>
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
                  <h2 className="sd-title">Résultats de nos services de contenu</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Création de Contenu Stratégique" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Renforcer l'autorité thématique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer l'engagement du contenu.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Augmenter la portée organique.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser le storytelling de marque.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Générer des partages sociaux.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Assurer la pertinence continue.
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
