'use client';

import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Fade } from "react-awesome-reveal";
import Link from 'next/link';
import Image from 'next/image';

import icon from '@/public/images/icon/dollar-icon.svg';
import picon from '@/public/images/icon/pricing-icon01.svg';
import picon2 from '@/public/images/icon/pricing-icon02.svg';
import picon3 from '@/public/images/icon/pricing-icon03.svg';
import check from '@/public/images/icon/check-icon.svg';
import cross from '@/public/images/icon/cross-icon.svg';

const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <section className="pricing pt-130 pb-130">
      <div className="container">
        <div className="sec-title--two text-center mb-60">
          <Fade direction='down' triggerOnce={false} duration={1000} delay={9}>
            <div>
              <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
                <Image src={icon} alt="Icône Dollar" />
                {' '}Nos meilleurs tarifs
              </div>
            </div>
          </Fade>
          <Fade direction='down' triggerOnce={false} duration={1200} delay={9}>
            <div>
              <h2 className="title wow fadeInDown" data-wow-delay="150ms" data-wow-duration="600ms">
                Nous offrons les meilleurs tarifs
              </h2>
            </div>
          </Fade>
        </div>

        <div className="xb-pricing-nav-wrap text-center mb-110">
          <Nav tabs className="xb-pricing-nav ul_li_center nav nav-tabs" id="myTab" role="tablist">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggle('1')}
                style={{ cursor: 'pointer' }}
              >
                Facturation annuelle <span>-30%</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggle('2')}
                style={{ cursor: 'pointer' }}
              >
                Facturation mensuelle
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <div className="pg-pricing_content">
          <TabContent activeTab={activeTab} id="myTabContent">
            {/* Yearly Tab Content */}
            <TabPane tabId="1">
              <Row className="mt-none-30">
                {/* Pricing Plan 1 */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item pos-rel">
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon} alt="Basic Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Essentiel</h3>
                          <span className="xb-item--text">Pour les entreprises qui débutent.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 299</h2>
                        <span className="xb-item--time">Par an</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Recherche de mots-clés approfondie</li>
                        <li><Image src={check} alt="Check" /> Optimisation SEO on-page</li>
                        <li><Image src={check} alt="Check" /> Audits SEO techniques</li>
                        <li><Image src={check} alt="Check" /> Rapports de performance mensuels</li>
                        <li className="deactive"><Image src={cross} alt="Cross" /> Rapports hebdomadaires & Manager SEO</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Pricing Plan 2 */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item active pos-rel">
                    <span className="xb-item--top-text">Most popular ✨</span>
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon2} alt="Standard Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Standard</h3>
                          <span className="xb-item--text">Pour les entreprises avec plus de trafic.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 499</h2>
                        <span className="xb-item--time">Par an</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Toutes les fonctionnalités du forfait Essentiel</li>
                        <li><Image src={check} alt="Check" /> Stratégie SEO locale & optimisation</li>
                        <li><Image src={check} alt="Check" /> Création & optimisation de contenu</li>
                        <li><Image src={check} alt="Check" /> Netlinking de haute qualité</li>
                        <li><Image src={check} alt="Check" /> Rapports hebdomadaires & Manager SEO</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Pricing Plan 3 */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item pos-rel">
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon3} alt="Premium Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Premium</h3>
                          <span className="xb-item--text">Pour les entreprises de taille moyenne.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 999</h2>
                        <span className="xb-item--time">Par an</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Toutes les fonctionnalités du forfait Standard</li>
                        <li><Image src={check} alt="Check" /> Audit complet du site web & techniques SEO</li>
                        <li><Image src={check} alt="Check" /> Analyse et suivi concurrentiel</li>
                        <li><Image src={check} alt="Check" /> Campagnes de construction de liens avancées</li>
                        <li><Image src={check} alt="Check" /> Rapports hebdomadaires & Manager SEO</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>

            {/* Monthly Tab Content */}
            <TabPane tabId="2">
              <Row className="mt-none-30">
                {/* Pricing Plan 1 (Monthly) */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item pos-rel">
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon} alt="Basic Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Essentiel</h3>
                          <span className="xb-item--text">Pour les entreprises qui débutent.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 299</h2>
                        <span className="xb-item--time">Par mois</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Recherche approfondie des mots-clés</li>
                        <li><Image src={check} alt="Check" /> Optimisation SEO sur la page</li>
                        <li><Image src={check} alt="Check" /> Audit SEO technique</li>
                        <li><Image src={check} alt="Check" /> Rapports de performance mensuels</li>
                        <li className="deactive"><Image src={cross} alt="Cross" /> Weekly Reports & SEO Manager</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Pricing Plan 2 (Monthly) */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item active pos-rel">
                    <span className="xb-item--top-text">Most popular ✨</span>
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon2} alt="Standard Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Standard</h3>
                          <span className="xb-item--text">Pour les entreprises avec plus de trafic.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 499</h2>
                        <span className="xb-item--time">Par mois</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Toutes les fonctionnalités du forfait Essentiel</li>
                        <li><Image src={check} alt="Check" /> Stratégie SEO locale & optimisation</li>
                        <li><Image src={check} alt="Check" /> Création & optimisation de contenu</li>
                        <li><Image src={check} alt="Check" /> Netlinking de haute qualité</li>
                        <li><Image src={check} alt="Check" /> Rapports hebdomadaires & Manager SEO</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Pricing Plan 3 (Monthly) */}
                <Col lg="4" className="mt-30">
                  <div className="pg-pricing-item pos-rel">
                    <div className="xb-item--inner o-hidden pos-rel">
                      <div className="xb-item--holder ul_li">
                        <div className="xb-item--icon">
                          <Image src={picon3} alt="Premium Icon" />
                        </div>
                        <div className="xb-item--right">
                          <h3 className="xb-item--title">Premium</h3>
                          <span className="xb-item--text">Pour les entreprises de taille moyenne.</span>
                        </div>
                      </div>
                      <div className="xb-item--price">
                        <h2 className="xb-item--number">TND 999</h2>
                        <span className="xb-item--time">Par an</span>
                      </div>
                      <div className="xb-item--line"></div>
                      <h4 className="xb-item--feature">Fonctionnalités</h4>
                      <ul className="xb-item--list list-unstyled">
                        <li><Image src={check} alt="Check" /> Toutes les fonctionnalités du forfait Standard</li>
                        <li><Image src={check} alt="Check" /> Audit complet du site & SEO technique</li>
                        <li><Image src={check} alt="Check" /> Analyse concurrentielle & monitoring</li>
                        <li><Image src={check} alt="Check" /> Campagnes avancées de netlinking</li>
                        <li><Image src={check} alt="Check" /> Rapports hebdomadaires & Manager SEO</li>
                      </ul>
                      <div className="pg-det-btn">
                        <Link href="/contact" className="cp-btn">Choisissez votre plan</Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
