import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './About.css';

function About() {
  const { language, t } = useLanguage();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [language]);

  const teamMembers = [
    { id: 1, nameEn: 'Gediyon Yonas', nameAm: 'ገድዮን ዮናስ', positionEn: 'Founder & Head Chef', positionAm: 'መስራች እና ዋና ሼፍ', image: 'https://randomuser.me/api/portraits/men/1.jpg', bioEn: 'With over 15 years of experience in Ethiopian cuisine', bioAm: 'ከ15 ዓመታት በላይ ልምድ ባለው የኢትዮጵያ ምግብ ዘርፍ' },
    { id: 2, nameEn: 'Meron Assefa', nameAm: 'መሮን አሰፋ', positionEn: 'Restaurant Manager', positionAm: 'ሬስቶራንት ማኔጀር', image: 'https://randomuser.me/api/portraits/women/1.jpg', bioEn: 'Ensures every guest has a memorable experience', bioAm: 'እያንዳንዱ እንግዳ ልዩ በሆነ አገልግሎት የማይረሳ ልምድ እንዲኖረው ታረጋግጣለች' },
    { id: 3, nameEn: 'Tekle Berhan', nameAm: 'ተክለ ብርሃን', positionEn: 'Executive Chef', positionAm: 'ከፍተኛ ሼፍ', image: 'https://randomuser.me/api/portraits/men/2.jpg', bioEn: 'Master of traditional Ethiopian spices', bioAm: 'ባህላዊ የኢትዮጵያ ቅመሞች ዋና አዋቂ' }
  ];

  const stats = [
    { number: '8+', labelEn: 'Years of Excellence', labelAm: 'የላቀ አገልግሎት' },
    { number: '50+', labelEn: 'Expert Staff', labelAm: 'ባለሙያ ሰራተኞች' },
    { number: '1000+', labelEn: 'Happy Customers', labelAm: 'ደስተኛ ደንበኞች' },
    { number: '24/7', labelEn: 'Customer Support', labelAm: 'የደንበኛ ድጋፍ' }
  ];

  return (
    <div className="about-page" key={renderKey}>
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>{t('aboutTitle')}</h1>
          <p>{t('aboutSubtitle')}</p>
        </div>
      </div>

      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>{t('ourStory')}</h2>
              <p>Ged Restaurant was founded in 2016 with a simple mission: to bring authentic Ethiopian cuisine to food lovers in a warm and welcoming environment.</p>
              <p>Our passion for traditional Ethiopian cooking, combined with modern culinary techniques, creates a unique dining experience that keeps our guests coming back.</p>
            </div>
            <div className="story-image">
              <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" alt="Restaurant interior" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{language === 'en' ? stat.labelEn : stat.labelAm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2 className="section-title">{t('ourTeam')}</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image"><img src={member.image} alt={member.nameEn} /></div>
                <div className="team-info">
                  <h3>{language === 'en' ? member.nameEn : member.nameAm}</h3>
                  <p className="team-position">{language === 'en' ? member.positionEn : member.positionAm}</p>
                  <p className="team-bio">{language === 'en' ? member.bioEn : member.bioAm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{t('visitUs')}</h2>
            <Link to="/reservation" className="cta-btn">{t('bookTable')} <i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
