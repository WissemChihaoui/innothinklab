'use client';

import React, { useState } from 'react';
import hicon from '@/public/images/icon/magic.svg';
import { Fade } from 'react-awesome-reveal';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import Image from 'next/image';

const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<string>('1');

  const toggle = (id: string) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  return (
    <section className="faq pb-140">
      <div className="container">
        <div className="sec-title--two text-center mb-60">
          <Fade direction="down" triggerOnce={false} duration={1000} delay={9}>
            <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
              <Image src={hicon} alt="Icône FAQ" /> FAQ
            </div>
          </Fade>
          <Fade direction="up" triggerOnce={false} duration={1200} delay={9}>
            <h2
              className="title wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
Vous avez des questions ? Trouvez vos réponses
            </h2>
          </Fade>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="xb-faq wow fadeInUp" data-wow-delay="200ms" data-wow-duration="600ms">
              <Accordion open={open} toggle={toggle} className="accordion_box clearfix list-unstyled">
                {faqList.map(({ id, question, content }) => (
                  <AccordionItem className="block" key={id}>
                    <AccordionHeader targetId={id} className="acc-btn">
                      <span className="number">{id}</span> _ {question}
                      <span className="arrow"></span>
                    </AccordionHeader>
                    <AccordionBody accordionId={id} className="acc_body">
                      <div className="content">
                        <p>{content.text}</p>
                        <ul className="list-unstyled">
                          {content.points.map((point, idx) => (
                            <li key={idx}>
                              <i className="far fa-check"></i>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

interface FaqContent {
  text: string;
  points: string[];
}

interface FaqItem {
  id: string;
  question: string;
  content: FaqContent;
}

const faqList: FaqItem[] = [
  {
    id: '1',
    question: 'Quel est le délai pour développer un site web ?',
    content: {
      text: "Le délai de développement varie selon la complexité de votre projet :",
      points: [
        'Site vitrine : 2-4 semaines',
        'Site e-commerce : 4-8 semaines',
        'Application web personnalisée : À partir de 8 semaines',
        'Application mobile : 10-16 semaines'
      ]
    }
  },
  {
    id: '2',
    question: 'Proposez-vous des solutions de référencement (SEO) ?',
    content: {
      text: "Oui, nous offrons des services complets de référencement naturel :",
      points: [
        'Audit technique du site',
        'Optimisation du contenu',
        'Stratégie de mots-clés',
        'Netlinking de qualité',
        'Suivi des performances'
      ]
    }
  },
  {
    id: '3',
    question: 'Quelles technologies utilisez-vous pour le développement ?',
    content: {
      text: "Nous utilisons les dernières technologies du marché :",
      points: [
        'Frontend : React, Next.js, Vue.js',
        'Backend : Node.js, Python, PHP',
        'Bases de données : MySQL, MongoDB, PostgreSQL',
        'Mobile : React Native, Flutter',
        'Hébergement : AWS, Google Cloud, Vercel'
      ]
    }
  },
  {
    id: '4',
    question: 'Proposez-vous un accompagnement après la livraison ?',
    content: {
      text: "Oui, nous offrons différents niveaux de support :",
      points: [
        'Maintenance évolutive',
        'Mises à jour de sécurité',
        'Formation utilisateur',
        'Support technique prioritaire',
        'Hébergement géré'
      ]
    }
  },
  {
    id: '5',
    question: 'Quelle est votre approche pour la conception UX/UI ?',
    content: {
      text: "Notre processus de conception est centré sur l'utilisateur :",
      points: [
        'Recherche utilisateur approfondie',
        'Maquettes interactives',
        'Tests utilisateurs itératifs',
        'Design responsive',
        'Optimisation des performances'
      ]
    }
  }
];
