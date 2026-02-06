'use client';

import React, { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';

interface FormState {
  name: string;
  email: string;
  subject: string;
  phone: string;
  company: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [forms, setForms] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState<'success' | 'error' | ''>('');

  const [, forceUpdate] = useState(0);
  const validator = useRef(
    new SimpleReactValidator({ className: 'errorMessage' })
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForms(prev => ({ ...prev, [name]: value }));

    if (validator.current.allValid()) {
      validator.current.hideMessages();
    } else {
      validator.current.showMessages();
    }

    // Force re-render to show validation message updates
    forceUpdate(prev => prev + 1);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      validator.current.hideMessages();
      setIsSubmitting(true);
      setSubmitMessage('');

      try {
        const response = await fetch('/api/contact/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: forms.name,
            email: forms.email,
            subject: forms.subject,
            phone: forms.phone,
            company: forms.company,
            message: forms.message,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitMessage(result.message);
          setSubmitMessageType('success');
          
          // Reset form
          setForms({
            name: '',
            email: '',
            subject: '',
            phone: '',
            company: '',
            message: '',
          });
          
          // Clear validation messages
          validator.current.hideMessages();
          forceUpdate(prev => prev + 1);
        } else {
          setSubmitMessage(result.message);
          setSubmitMessageType('error');
        }
      } catch (error) {
        console.error('Contact form submission error:', error);
        setSubmitMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        setSubmitMessageType('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate(prev => prev + 1);
    }
  };

  return (
    <form onSubmit={submitHandler} className="contact-form">
      <div className="row">
        <div className="col-lg-6">
          <div className="input-field">
            <label htmlFor="name">Nom*</label>
            <div className="input-box">
              <input
                value={forms.name}
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={changeHandler}
                onBlur={changeHandler}
              />
              {validator.current.message('name', forms.name, 'required|alpha_space')}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="input-field">
            <label htmlFor="email">Email*</label>
            <div className="input-box">
              <input
                value={forms.email}
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={changeHandler}
                onBlur={changeHandler}
              />
              {validator.current.message('email', forms.email, 'required|email')}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-field">
            <label htmlFor="phone">Téléphone*</label>
            <div className="input-box">
              <input
                value={forms.phone}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                onChange={changeHandler}
                onBlur={changeHandler}
              />
              {validator.current.message('phone', forms.phone, 'required|phone')}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-field">
            <label htmlFor="subject">Sujet*</label>
            <div className="input-box">
              <input
                value={forms.subject}
                type="text"
                name="subject"
                id="subject"
                className="form-control"
                onChange={changeHandler}
                onBlur={changeHandler}
                disabled={isSubmitting}
              />
              {validator.current.message('subject', forms.subject, 'required')}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-field">
            <label htmlFor="company">Entreprise</label>
            <div className="input-box">
              <input
                value={forms.company}
                type="text"
                name="company"
                id="company"
                className="form-control"
                onChange={changeHandler}
                onBlur={changeHandler}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-field text-field">
            <label htmlFor="message">Message*</label>
            <div className="input-box">
              <textarea
                value={forms.message}
                name="message"
                id="message"
                className="form-control"
                placeholder="Comment pouvons-nous vous aider?"
                onChange={changeHandler}
                onBlur={changeHandler}
                disabled={isSubmitting}
                rows={5}
              ></textarea>
              {validator.current.message('message', forms.message, 'required')}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Message Display */}
      {submitMessage && (
        <div className={`submit-message ${submitMessageType}`} style={{
          marginTop: '20px',
          padding: '12px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: submitMessageType === 'success' ? '#d4edda' : '#f8d7da',
          color: submitMessageType === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${submitMessageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {submitMessage}
        </div>
      )}

      <div className="cp-det-btn mt-20 d-grid">
        <button 
          className="cp-btn" 
          type="submit"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyez-nous un message <i className="fal fa-arrow-right ms-2"></i>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
