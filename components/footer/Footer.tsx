'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import icon1 from '@/public/images/icon/sms-white.svg';
import icon2 from '@/public/images/icon/call-white.svg';
import icon3 from '@/public/images/icon/location.svg';
import icon4 from '@/public/images/icon/sms02.svg';
import Services from '../../api/service';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Veuillez entrer votre adresse email');
      setMessageType('error');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setMessage('Veuillez entrer une adresse email valide');
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: '', // Optional name field
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setEmail(''); // Clear email on success
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer
      className="footer footer-style-two pt-200 bg_img pos-rel"
      style={{ backgroundColor: '#0c111d' }}
    >
      <div className="container">
        <div className="xb-footer pt-120">
          {/* Contact Info */}
          <div className="footer-info ul_li_between">
            <div className="info-item ul_li">
              <div className="xb-item--icon">
                <span>
                  <Image src={icon1} alt="Email Icon" />
                </span>
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">Notre Email</p>
                <h3 className="xb-item--title">contact@innothinklabs.com</h3>
              </div>
            </div>
            <div className="info-item ul_li">
              <div className="xb-item--icon clr-blue">
                <span>
                  <Image src={icon2} alt="Call Icon" />
                </span>
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">Notre Téléphone</p>
                <h3 className="xb-item--title">+216 99 310 778</h3>
              </div>
            </div>
            <div className="info-item ul_li">
              <div className="xb-item--icon clr-sky">
                <span>
                  <Image src={icon3} alt="Location Icon" />
                </span>
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">Notre Adresse</p>
                <h3 className="xb-item--title">5 eme étage, Place F.Hached,<br/> Immeuble Hadrumet, Sousse 4000</h3>
              </div>
            </div>
          </div>

          {/* Footer Widgets */}
          <div className="footer-inner mt-70 mb-100 ul_li_between align-items-start">
            {/* Newsletter */}
            <div className="sa-newslatter footer-widget">
              <span className="xb-item--sub-title">Newsletter</span>
              <p className="xb-item--content clr-white">
                Recevez nos dernières actualités
              </p>
              <form className="xb-item--input_field pos-rel" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  name="email" 
                  id="text6" 
                  placeholder="Votre Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required 
                />
                <div className="img">
                  <Image src={icon4} alt="Mail Icon" />
                </div>
                <button type="submit" className="xb-item--btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>
              </form>
              
              {/* Message Display */}
              {message && (
                <div className={`xb-item--message ${messageType === 'success' ? 'success' : 'error'}`} style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
                  color: messageType === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {message}
                </div>
              )}
              <span className="xb-item--text">
                En vous inscrivant, vous acceptez nos{' '}
                <Link href="/terms-conditions">Conditions d'utilisation</Link> et{' '}
                <Link href="/privacy-policy">Politique de confidentialité</Link>
              </span>
            </div>

            {/* Company Links */}
            <div className="footer-widget">
              <span className="xb-item--sub-title">Navigation</span>
              <ul className="xb-item--holder list-unstyled">
                <li className="xb-item--list"><Link href="/">Acceuil</Link></li>
                <li className="xb-item--list"><Link href="/about">Société</Link></li>
                <li className="xb-item--list"><Link href="/service">Services</Link></li>
                <li className="xb-item--list"><Link href="/casestudy">Portfolio</Link></li>
                <li className="xb-item--list"><Link href="/blog">Blog</Link></li>
                <li className="xb-item--list"><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-widget">
              <span className="xb-item--sub-title">Our Services</span>
              <ul className="xb-item--holder list-unstyled">
                {Services.slice(0, 6).map((service, index) => (
                  <li key={index} className="xb-item--list">
                    {service.title && (
                      <Link href={`/service/${service.slug}`}>
                        <span className="icon_list_text">{service.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            {/* <div className="footer-widget">
              <span className="xb-item--sub-title">Our Industries</span>
              <ul className="xb-item--holder list-unstyled">
                <li className="xb-item--list"><Link href="/">Healthcare</Link></li>
                <li className="xb-item--list"><Link href="/">Lawyers</Link></li>
                <li className="xb-item--list"><Link href="/">Real estate</Link></li>
                <li className="xb-item--list"><Link href="/">Insurance</Link></li>
                <li className="xb-item--list"><Link href="/">Crypto</Link></li>
                <li className="xb-item--list"><Link href="/">Automotive</Link></li>
              </ul>
            </div> */}
          </div>

          {/* Footer Bottom */}
          <div className="footer-copyright mt-70 ul_li_between">
            <p className="copyright mt-20">
              Copyright © 2025 <Link href="/">innothinklab</Link>. Tous droits reservés.
            </p>
            <ul className="footer-link ul_li mt-20">
              <li><span>Abonnez-vous :</span></li>
              <li><Link href="/"><i className="fab fa-twitter"></i></Link></li>
              <li><Link href="/"><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link href="/"><i className="fab fa-linkedin-in"></i></Link></li>
              <li><Link href="/"><i className="fab fa-youtube"></i></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
