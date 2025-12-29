import React from 'react';
import Image from 'next/image';

import sIcon1 from '@/public/images/icon/ab-page-icon01.svg';
import sIcon2 from '@/public/images/icon/ab-page-icon02.svg';
import sIcon3 from '@/public/images/icon/ab-page-icon03.svg';
import sIcon4 from '@/public/images/icon/ab-page-icon04.svg';

interface Feature {
  icon: string;
  title: string;
  content: string;
  delay: string;
}

const features: Feature[] = [
  {
    icon: sIcon1,
    title: 'Résultats Garantis',
    content: 'Des solutions numériques qui répondent à vos objectifs.',
    delay: '0ms',
  },
  {
    icon: sIcon2,
    title: 'Approche Proactive',
    content: 'Anticipons ensemble les défis de votre projet.',
    delay: '100ms',
  },
  {
    icon: sIcon3,
    title: 'Croissance Durable',
    content: 'Développement de solutions pérennes pour votre entreprise.',
    delay: '200ms',
  },
  {
    icon: sIcon4,
    title: 'Innovation Continue',
    content: 'Des technologies de pointe pour des résultats rapides.',
    delay: '300ms',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="fanfact pt-125 pb-125">
      <div className="container">
        <div className="ap-feature_wrap">
          <div className="row mt-none-30">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6 mt-30" key={index}>
                <div
                  className="ap-feature-item wow fadeInUp"
                  data-wow-delay={feature.delay}
                  data-wow-duration="600ms"
                >
                  <div className="xb-item--icon">
                    <Image src={feature.icon} alt={feature.title} />
                  </div>
                  <h4 className="xb-item--title">{feature.title}</h4>
                  <p className="xb-item--content">{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
