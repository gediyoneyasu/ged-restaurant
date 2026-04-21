import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Contact.css';

function Contact() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Save contact message to localStorage
    setTimeout(() => {
      const existingMessages = localStorage.getItem('gedContactMessages');
      const messages = existingMessages ? JSON.parse(existingMessages) : [];
      const newMessage = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'unread'
      };
      messages.push(newMessage);
      localStorage.setItem('gedContactMessages', JSON.stringify(messages));
      
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const contactInfo = [
    { icon: 'ri-map-pin-line', labelEn: 'Address', labelAm: 'አድራሻ', valueEn: 'Bole, Addis Ababa, Ethiopia', valueAm: 'ቦሌ፣ አዲስ አበባ፣ ኢትዮጵያ' },
    { icon: 'ri-phone-line', labelEn: 'Phone', labelAm: 'ስልክ', valueEn: '+251 964 113 416', valueAm: '+251 964 113 416' },
    { icon: 'ri-mail-line', labelEn: 'Email', labelAm: 'ኢሜይል', valueEn: 'info@gedrestaurant.com', valueAm: 'info@gedrestaurant.com' }
  ];

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="contact-success">
          <div className="success-card">
            <i className="ri-checkbox-circle-fill"></i>
            <h2>Message Sent!</h2>
            <p>Thank you for contacting us. We will get back to you soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page" key={language}>
      <div className="contact-hero"><h1>{t('contactTitle')}</h1><p>{t('contactSubtitle')}</p></div>
      <div className="contact-container">
        <div className="contact-info-grid">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="info-card">
              <div className="info-icon"><i className={info.icon}></i></div>
              <h3>{language === 'en' ? info.labelEn : info.labelAm}</h3>
              <p>{language === 'en' ? info.valueEn : info.valueAm}</p>
            </div>
          ))}
        </div>
        <div className="contact-main">
          <div className="contact-form-wrapper">
            <h2>{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input type="text" name="name" placeholder={t('name')} value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder={t('email')} value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <input type="tel" name="phone" placeholder={t('phone')} value={formData.phone} onChange={handleChange} />
                <select name="subject" value={formData.subject} onChange={handleChange} required>
                  <option value="">Select Subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Reservation">Reservation</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Complaint">Complaint</option>
                </select>
              </div>
              <textarea name="message" placeholder={t('message')} value={formData.message} onChange={handleChange} rows="5" required></textarea>
              <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
