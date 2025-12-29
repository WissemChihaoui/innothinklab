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
                        <Image src={icon} alt="Icône Marketing Digital" /> Marketing Digital
                      </span>
                      <h2 className="title">
                        Développez votre marque avec nos stratégies innovantes
                      </h2>
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
                <h2 className="sd-title">Transformez votre présence avec nos stratégies marketing digitales</h2>
                <p className="sd-content">
                  Dans l'écosystème digital actuel, le marketing digital est essentiel pour améliorer la visibilité et l'engagement de votre marque. En mettant en œuvre des stratégies marketing performantes, vous améliorez non seulement votre reach mais établissez également une connexion forte avec votre audience cible. Cette approche stratégique implique l'identification des personas, la création de contenu engageant et le déploiement de campagnes multicanaux qui favorisent la conversion. À mesure que votre présence marketing se développe, votre notoriété de marque augmente, menant à une meilleure acquisition client et à une plus grande fidélité de la part de votre audience.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment vos performances marketing grâce à des analyses approfondies, en ajustant nos stratégies selon les résultats pour maximiser votre retour sur investissement. En privilégiant la pertinence plutôt que le volume, nous cultivons un écosystème marketing robuste qui renforce considérablement votre impact commercial et améliore les performances globales de vos campagnes. Nous mettons en œuvre des stratégies de contenu ciblées pour connecter votre marque avec les bonnes audiences et les influenceurs pertinents de votre secteur, en soulignant la valeur que votre message apporte.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus de marketing digital</h2>
                <p className="sd-content">
                  Notre processus de service commence par une consultation approfondie et une analyse de votre positionnement, suivi d'une étude de marché pour informer une stratégie marketing sur mesure. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des résultats optimaux et une amélioration continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse de positionnement</h3>
                  <p className="xb-item--contact">Évaluons votre positionnement et définissons les objectifs de votre stratégie marketing.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Étude de marché et personas</h3>
                  <p className="xb-item--contact">Analysons les tendances du marché pour identifier les meilleures opportunités.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Stratégie multicanaux</h3>
                  <p className="xb-item--contact">Déployons des campagnes marketing adaptées à vos objectifs spécifiques.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Optimisation et reporting</h3>
                  <p className="xb-item--contact">Suivons les performances et optimisons continuellement vos campagnes.</p>
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
                  <h2 className="sd-title">Résultats de nos services marketing</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Marketing Digital Stratégique" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Augmenter la notoriété de marque.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer l'engagement client.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Générer des leads qualifiés.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser le taux de conversion.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Maximiser le retour sur investissement.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Assurer la croissance durable.
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
