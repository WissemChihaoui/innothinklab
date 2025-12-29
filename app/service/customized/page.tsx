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
                        <Image src={icon} alt="Icône Solutions Sur Mesure" /> Solutions Sur Mesure
                      </span>
                      <h2 className="title mb-30">Développement personnalisé pour vos besoins uniques</h2>
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
                <h2 className="sd-title">Créez des solutions uniques adaptées à votre entreprise</h2>
                <p className="sd-content">
                  Dans le monde numérique d'aujourd'hui, les solutions sur mesure sont essentielles pour répondre aux besoins spécifiques de votre entreprise et vous démarquer de la concurrence. En développant des solutions personnalisées, vous améliorez non seulement l'efficacité opérationnelle mais créez également une expérience unique pour vos utilisateurs. Cette approche stratégique implique l'analyse approfondie de vos processus métier, la conception d'architectures techniques adaptées et le développement de fonctionnalités spécifiques qui répondent exactement à vos besoins. À mesure que votre solution personnalisée évolue, votre avantage concurrentiel se renforce, menant à une meilleure productivité et à une satisfaction accrue de vos clients.
                </p>
                <br />
                <p className="sd-content">
                  Enfin, nous surveillons constamment les performances de vos solutions personnalisées grâce à des analyses approfondies, en ajustant notre approche selon vos retours pour maximiser l'impact. En privilégiant la pertinence plutôt que la standardisation, nous cultivons un écosystème technique robuste qui renforce considérablement votre efficacité opérationnelle et améliore les performances globales de votre entreprise. Nous mettons en œuvre des stratégies d'intégration ciblées pour connecter vos solutions avec les systèmes existants et les partenaires pertinents de votre secteur, en soulignant la valeur que votre approche personnalisée apporte.
                </p>
              </div>
            </div>
          </div>

          <div className="sd-process_warp">
            <div className="container">
              <div className="sd-heading">
                <h2 className="sd-title">Notre processus de développement sur mesure</h2>
                <p className="sd-content">
                  Notre processus de service commence par une consultation approfondie et une analyse de vos besoins spécifiques, suivi d'une étude de vos processus métier pour informer une stratégie de développement personnalisée. Nous maintenons une communication régulière et fournissons des rapports complets pour garantir des résultats optimaux et une amélioration continue.
                </p>
              </div>
              <div className="sd-process_inner ul_li">
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg1} alt="" />
                  </div>
                  <h3 className="xb-item--title">Analyse des besoins métier</h3>
                  <p className="xb-item--contact">Évaluons vos processus et définissons les objectifs de votre solution personnalisée.</p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg2} alt="" />
                  </div>
                  <h3 className="xb-item--title">Conception architecturale</h3>
                  <p className="xb-item--contact">Concevons l'architecture technique adaptée à vos exigences spécifiques.</p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg3} alt="" />
                  </div>
                  <h3 className="xb-item--title">Développement personnalisé</h3>
                  <p className="xb-item--contact">Développons des solutions sur mesure adaptées à vos besoins uniques.</p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="sd-process-item">
                  <div className="xb-item--icon">
                    <Image src={sImg4} alt="" />
                  </div>
                  <h3 className="xb-item--title">Intégration et déploiement</h3>
                  <p className="xb-item--contact">Assurons l'intégration avec vos systèmes et le déploiement de votre solution.</p>
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
                  <h2 className="sd-title">Résultats de nos solutions sur mesure</h2>
                  <p className="sd-content">
                    Voici six points clés liés au "Développement Sur Mesure" dans le contexte de la transformation numérique et des solutions de gestion des risques <br /> pour les entreprises Fortune 500, avec plus de détails :
                  </p>
                </div>
                <div className="sd-list-item ul_li">
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Optimiser les processus métier.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Améliorer l'efficacité opérationnelle.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Créer un avantage concurrentiel.
                    </li>
                  </ul>
                  <ul className="sd-ser-list list-unstyled">
                    <li>
                      <Image src={sicon} alt="" />
                      Assurer la flexibilité technique.
                    </li>
                    <li>
                      <Image src={sicon} alt="" />
                      Maximiser le retour sur investissement.
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
