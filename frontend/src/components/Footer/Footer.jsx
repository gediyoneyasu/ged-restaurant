import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

function Footer() {
  const { language, t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', icon: 'ri-home-line', labelEn: 'Home', labelAm: 'መነሻ' },
    { path: '/menu', icon: 'ri-restaurant-line', labelEn: 'Menu', labelAm: 'ምናሌ' },
    { path: '/reservation', icon: 'ri-calendar-line', labelEn: 'Reservation', labelAm: 'ማስያዝ' },
    { path: '/orders', icon: 'ri-shopping-bag-line', labelEn: 'My Orders', labelAm: 'ትእዛዞቼ' },
    { path: '/about', icon: 'ri-information-line', labelEn: 'About Us', labelAm: 'ስለእኛ' },
    { path: '/contact', icon: 'ri-customer-service-line', labelEn: 'Contact', labelAm: 'ያግኙን' }
  ];

  const socialLinks = [
    { icon: 'ri-facebook-fill', url: 'https://facebook.com', name: 'Facebook', color: '#1877f2' },
    { icon: 'ri-instagram-line', url: 'https://instagram.com', name: 'Instagram', color: '#e4405f' },
    { icon: 'ri-telegram-fill', url: 'https://telegram.org', name: 'Telegram', color: '#0088cc' },
    { icon: 'ri-twitter-x-line', url: 'https://twitter.com', name: 'Twitter', color: '#1da1f2' },
    { icon: 'ri-whatsapp-line', url: 'https://whatsapp.com', name: 'WhatsApp', color: '#25d366' },
    { icon: 'ri-youtube-fill', url: 'https://youtube.com', name: 'YouTube', color: '#ff0000' }
  ];

  const paymentMethods = [
    { icon: 'ri-bank-card-line', name: 'Chapa', color: '#E67E22' },
    { icon: 'ri-cash-line', name: 'Cash', color: '#27ae60' },
    { icon: 'ri-mobile-line', name: 'Telebirr', color: '#3498db' },
    { icon: 'ri-bank-line', name: 'CBE Birr', color: '#2980b9' }
  ];

  const openingHours = {
    weekdays: { en: 'Monday - Friday', am: 'ሰኞ - አርብ', hours: '8:00 AM - 10:00 PM' },
    saturday: { en: 'Saturday', am: 'ቅዳሜ', hours: '9:00 AM - 11:00 PM' },
    sunday: { en: 'Sunday', am: 'እሁድ', hours: '9:00 AM - 9:00 PM' }
  };

  return (
    <footer className="ged-footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <i className="ri-restaurant-2-line"></i>
            <span>Ged <span className="logo-highlight">Restaurant</span></span>
          </div>
          <p className="footer-description">
            {language === 'en' 
              ? 'Experience the authentic taste of Ethiopia with modern cuisine. Fresh ingredients, great service, and memorable moments.'
              : 'ትኩስ ንጥረ ነገሮች፣ ጥሩ አገልግሎት እና የማይረሱ አፍታዎች። ዘመናዊ ምግብ ጋር ትክክለኛ የኢትዮጵያ ጣዕም ይለማመዱ።'}
          </p>
          <div className="footer-social">
            <h4>{language === 'en' ? 'Follow Us' : 'ይከተሉን'}</h4>
            <div className="social-icons">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={{ '--hover-color': social.color }}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3><i className="ri-link-m"></i> {language === 'en' ? 'Quick Links' : 'ፈጣን አገናኞች'}</h3>
          <ul className="footer-links">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>
                  <i className={link.icon}></i>
                  <span>{language === 'en' ? link.labelEn : link.labelAm}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours Section */}
        <div className="footer-section">
          <h3><i className="ri-time-line"></i> {language === 'en' ? 'Opening Hours' : 'የስራ ሰዓት'}</h3>
          <ul className="footer-hours">
            <li>
              <span>{language === 'en' ? openingHours.weekdays.en : openingHours.weekdays.am}</span>
              <span>{openingHours.weekdays.hours}</span>
            </li>
            <li>
              <span>{language === 'en' ? openingHours.saturday.en : openingHours.saturday.am}</span>
              <span>{openingHours.saturday.hours}</span>
            </li>
            <li>
              <span>{language === 'en' ? openingHours.sunday.en : openingHours.sunday.am}</span>
              <span>{openingHours.sunday.hours}</span>
            </li>
          </ul>
          
          <div className="footer-delivery">
            <i className="ri-truck-line"></i>
            <div>
              <h4>{language === 'en' ? 'Free Delivery' : 'ነጻ አቅርቦት'}</h4>
              <p>{language === 'en' ? 'On orders over 200 ETB' : 'ከ200 ብር በላይ ትዕዛዝ'}</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3><i className="ri-customer-service-line"></i> {language === 'en' ? 'Contact Info' : 'የእውቂያ መረጃ'}</h3>
          <ul className="footer-contact">
            <li>
              <i className="ri-map-pin-line"></i>
              <span>Bole, Addis Ababa, Ethiopia</span>
            </li>
            <li>
              <i className="ri-phone-line"></i>
              <a href="tel:+251964113416">+251 964 113 416</a>
            </li>
            <li>
              <i className="ri-mail-line"></i>
              <a href="mailto:info@gedrestaurant.com">info@gedrestaurant.com</a>
            </li>
            <li>
              <i className="ri-whatsapp-line"></i>
              <a href="https://wa.me/251964113416">+251 964 113 416 (WhatsApp)</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="footer-payment">
        <div className="payment-container">
          <p>{language === 'en' ? 'We Accept' : 'እንቀበላለን'}</p>
          <div className="payment-icons">
            {paymentMethods.map((method, idx) => (
              <div key={idx} className="payment-method">
                <i className={method.icon} style={{ color: method.color }}></i>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p>&copy; {currentYear} Ged Restaurant. {language === 'en' ? 'All rights reserved.' : 'መብቱ በህግ የተጠበቀ ነው።'}</p>
          <div className="footer-legal">
            <Link to="/privacy">{language === 'en' ? 'Privacy Policy' : 'የግላዊነት ፖሊሲ'}</Link>
            <Link to="/terms">{language === 'en' ? 'Terms of Service' : 'የአገልግሎት ውሎች'}</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
