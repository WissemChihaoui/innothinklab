import React from 'react';
import { Fade } from "react-awesome-reveal";
import check from '@/public/images/icon/check.svg';
import error from '@/public/images/icon/erorr.svg';
import logo from '@/public/images/logo/logo-white.svg';
import star from '@/public/images/icon/star.svg';
import Image from 'next/image';

interface FeaturesSectionProps {
}

const FeaturesSection: React.FC<FeaturesSectionProps> = (props) => {
  return (
    <section className="feature">
      <div className="feature-wrapper sec-bg sec-bg--2 pt-130 pb-130">
        <div className="container">
          <div className="feature_inner">
            <div className="sec-title--two text-center mb-60">
              <Fade direction='down' triggerOnce={false} duration={1000} delay={9}>
                <div>
                  <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
                    <Image src={star} alt="Icône étoile" />Pourquoi nous choisir
                  </div>
                </div>
              </Fade>
              <Fade direction='up' triggerOnce={false} duration={1200} delay={9}>
                <div>
                  <h2 className="title wow fadeInDown" data-wow-delay="150ms" data-wow-duration="600ms">
                    Découvrez ce qui nous démarque
                  </h2>
                </div>
              </Fade>
            </div>
            <table className="feature-table">
              <thead>
                <tr>
                  <th>Fonctionnalités</th>
                  <th><Image src={logo} alt="Notre Logo" /></th>
                  <th>Autres agences</th>
                </tr>
              </thead>
              <tbody className="table-body">
                <tr>
                  <td>Solutions sur mesure adaptées à vos besoins</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={error} alt="Croix" /></td>
                </tr>
                <tr>
                  <td>Développement web et mobile de pointe</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={error} alt="Croix" /></td>
                </tr>
                <tr>
                  <td>100% dédié à votre projet</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={error} alt="Croix" /></td>
                </tr>
                <tr>
                  <td>Transparence sur les objectifs et délais</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={check} alt="Coche" /></td>
                </tr>
                <tr>
                  <td>Support technique continu</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={error} alt="Croix" /></td>
                </tr>
                <tr>
                  <td>Optimisation pour le référencement (SEO)</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={error} alt="Croix" /></td>
                </tr>
                <tr>
                  <td>Approche centrée sur l'expérience utilisateur</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={check} alt="Coche" /></td>
                </tr>
                <tr>
                  <td>Rapport qualité/prix compétitif</td>
                  <td><Image src={check} alt="Coche" /></td>
                  <td><Image src={check} alt="Coche" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
