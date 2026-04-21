import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useLanguage } from '../../contexts/LanguageContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './Home.css';

function Home() {
  const { language, t } = useLanguage();
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
    window.addEventListener('homeUpdated', loadHomeData);
    return () => window.removeEventListener('homeUpdated', loadHomeData);
  }, []);

  const loadHomeData = () => {
    // Load sliders from admin settings
    const savedSliders = localStorage.getItem('gedHomeSliders');
    if (savedSliders) {
      const allSliders = JSON.parse(savedSliders);
      const activeSliders = allSliders.filter(s => s.isActive !== false);
      setSliders(activeSliders.sort((a,b) => a.order - b.order));
    } else {
      setSliders([]);
    }
    
    // Load categories from admin settings
    const savedCategories = localStorage.getItem('gedHomeCategories');
    if (savedCategories) {
      const allCats = JSON.parse(savedCategories);
      const activeCats = allCats.filter(c => c.isActive !== false);
      setCategories(activeCats.sort((a,b) => a.order - b.order));
    } else {
      setCategories([]);
    }
    
    setLoading(false);
  };

  const features = [
    { icon: 'ri-restaurant-line', titleEn: 'Authentic Taste', titleAm: 'ትክክለኛ ጣዕም', descEn: 'Traditional recipes with modern touch', descAm: 'ዘመናዊ ንክኪ ያላቸው ባህላዊ ምግቦች' },
    { icon: 'ri-truck-line', titleEn: 'Fast Delivery', titleAm: 'ፈጣን አቅርቦት', descEn: 'Free delivery on orders over 200 ETB', descAm: 'ከ200 ብር በላይ ትዕዛዝ ነጻ አቅርቦት' },
    { icon: 'ri-calendar-line', titleEn: 'Easy Booking', titleAm: 'ቀላል ማስያዝ', descEn: 'Reserve your table online', descAm: 'ጠረጴዛዎን በመስመር ላይ ያስይዙ' },
    { icon: 'ri-secure-payment-line', titleEn: 'Secure Payment', titleAm: 'ደህንነቱ የተጠበቀ ክፍያ', descEn: 'Multiple payment options', descAm: 'የተለያዩ የክፍያ አማራጮች' }
  ];

  if (loading) {
    return <div className="loading-spinner"><i className="ri-loader-4-line ri-spin"></i><p>Loading...</p></div>;
  }

  return (
    <div className="home-page" key={language}>
      {/* Hero Slider Section - Managed from Admin */}
      {sliders.length > 0 && (
        <div className="hero-slider">
          <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]} autoplay={{ delay: 5000 }} loop={true} effect="fade" pagination={{ clickable: true }} navigation={true} className="hero-swiper">
            {sliders.map((slide) => (
              <SwiperSlide key={slide.id} className="hero-slide">
                <div className="slide-bg" style={{ backgroundImage: `url(${slide.image})` }} />
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <h1>{language === 'en' ? slide.titleEn : slide.titleAm}</h1>
                  <p>{language === 'en' ? slide.subtitleEn : slide.subtitleAm}</p>
                  <div className="hero-buttons">
                    <Link to="/menu" className="btn-primary">{t('shopNow')}</Link>
                    <a href="tel:+251964113416" className="btn-secondary">{t('callNow')}</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t('featuresTitle')}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon"><i className={feature.icon}></i></div>
                <h3>{language === 'en' ? feature.titleEn : feature.titleAm}</h3>
                <p>{language === 'en' ? feature.descEn : feature.descAm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Managed from Admin */}
      {categories.length > 0 && (
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{t('categoriesTitle')}</h2>
              <Link to="/menu" className="view-all">{t('viewAllCategories')} <i className="ri-arrow-right-line"></i></Link>
            </div>
            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.id} className="category-item">
                  <div className="category-card">
                    <div className="category-icon"><i className={category.icon}></i></div>
                    <h3>{language === 'en' ? category.nameEn : category.nameAm}</h3>
                    <p>{language === 'en' ? category.descriptionEn?.substring(0, 40) : category.descriptionAm?.substring(0, 40)}</p>
                  </div>
                  <div className="card-back">
                    <div className="back-image" style={{ backgroundImage: `url(${category.image})` }}></div>
                    <div className="back-content">
                      <h3>{language === 'en' ? category.nameEn : category.nameAm}</h3>
                      <p>{language === 'en' ? category.descriptionEn : category.descriptionAm}</p>
                      <Link to={`/menu?category=${category.nameEn.toLowerCase()}`} className="explore-link">
                        {t('explore')} <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('ctaTitle')}</h2>
            <p>{t('ctaSubtitle')}</p>
            <Link to="/reservation" className="cta-btn">{t('reserveNow')} <i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
