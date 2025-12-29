import React from 'react';
import cta from '@/public/images/cta/clip-bord.png';
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Image from 'next/image';

interface CtaSectionProps {
    cClass?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({ cClass = '' }) => {
    return (
        <section className={`cta ${cClass}`}>
            <div className="container">
                <div className="cta-wrap">
                    <div className="cta-inner ul_li_between">
                        <Fade direction="left" triggerOnce={false} duration={1000} delay={9}>
                            <div>
                                <div className="xb-item--holder wow fadeInLeft" data-wow-delay="100ms" data-wow-duration="600ms">
                                    <h2 className="xb-item--title">Boostez Votre Présence en Ligne</h2>
                                    <span className="xb-item--content">
                                        Discutons de votre projet et trouvons ensemble la meilleure solution numérique pour votre entreprise
                                    </span>
                                    <div className="xb-btn mt-45">
                                        <Link href="/contact" className="thm-btn thm-btn--aso thm-btn--aso_white">
                                            Demander un devis gratuit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        <Fade direction="right" triggerOnce={false} duration={1000} delay={9}>
                            <div>
                                <div className="cta-right_img wow fadeInRight" data-wow-delay="150ms" data-wow-duration="600ms">
                                    <Image className="updown" src={cta} alt="SEO Consultation Illustration" />
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
