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
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);

  // Sample data for demonstration
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      title: 'Authentic Ethiopian Cuisine',
      titleAm: 'ትክክለኛ የኢትዮጵያ ምግብ',
      subtitle: 'Experience the rich flavors of Ethiopia with our signature dishes',
      subtitleAm: 'የኢትዮጵያን ልዩ ጣዕም ከእኛ ምግቦች ጋር ይለማመዱ'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      title: 'Fresh Ingredients Daily',
      titleAm: 'ትኩስ ንጥረ ነገሮች በየቀኑ',
      subtitle: 'We source the freshest ingredients to bring you the best taste',
      subtitleAm: 'ምርጥ ጣዕም ለማቅረብ ትኩስ ንጥረ ነጌሮችን እናመጣለን'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      title: 'Cozy Atmosphere',
      titleAm: 'ምቹ ሁኔታ',
      subtitle: 'Perfect for family gatherings and special occasions',
      subtitleAm: 'ለቤተሰብ ስብሰባ እና ለልዩ ዝግጅቶች ተስማሚ'
    }
  ];

  const features = [
    { icon: 'ri-restaurant-line', title: 'Authentic Taste', titleAm: 'ትክክለኛ ጣዕም', desc: 'Traditional recipes with modern touch', descAm: 'ዘመናዊ ንክኪ ያላቸው ባህላዊ ምግቦች' },
    { icon: 'ri-truck-line', title: 'Fast Delivery', titleAm: 'ፈጣን አቅርቦት', desc: 'Free delivery on orders over 200 ETB', descAm: 'ከ200 ብር በላይ ትዕዛዝ ነጻ አቅርቦት' },
    { icon: 'ri-calendar-line', title: 'Easy Booking', titleAm: 'ቀላል ማስያዝ', desc: 'Reserve your table online', descAm: 'ጠረጴዛዎን በመስመር ላይ ያስይዙ' },
    { icon: 'ri-secure-payment-line', title: 'Secure Payment', titleAm: 'ደህንነቱ የተጠበቀ ክፍያ', desc: 'Multiple payment options available', descAm: 'የተለያዩ የክፍያ አማራጮች አሉ' }
  ];

  const sampleDishes = [
    { id: 1, name: 'Doro Wat', nameAm: 'ዶሮ ወጥ', price: 250, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', description: 'Spicy chicken stew with boiled egg', descriptionAm: 'በተቀቀለ እንቁላል የተዘጋጀ ቅመም ዶሮ ወጥ', isPopular: true },
    { id: 2, name: 'Tibs', nameAm: 'ጥብስ', price: 280, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg', description: 'Sautéed meat with vegetables', descriptionAm: 'ከአትክልት ጋር የተጠበሰ ሥጋ', isPopular: true },
    { id: 3, name: 'Kitfo', nameAm: 'ክትፎ', price: 300, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', description: 'Minced raw beef with spices', descriptionAm: 'ከቅመም ጋር የተዘጋጀ የተፈጨ ጥሬ ሥጋ', isPopular: true },
    { id: 4, name: 'Shiro Wat', nameAm: 'ሽሮ ወጥ', price: 180, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', description: 'Chickpea stew with berbere', descriptionAm: 'ከበርበሬ ጋር የተዘጋጀ የሽምብራ ወጥ', isPopular: false },
    { id: 5, name: 'Injera', nameAm: 'እንጀራ', price: 50, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg', description: 'Traditional Ethiopian flatbread', descriptionAm: 'ባህላዊ የኢትዮጵያ እንጀራ', isPopular: true },
    { id: 6, name: 'Sambusa', nameAm: 'ሳሙሳ', price: 30, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', description: 'Crispy pastry filled with lentils', descriptionAm: 'በምስር የተሞላ ጥርት ያለ እንጨቃጫቆ', isPopular: false }
  ];

  const foodCategories = [
    { name: 'Ethiopian', nameAm: 'ኢትዮጵያዊ', icon: 'ri-restaurant-line', count: 25, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg' },
    { name: 'Pizza', nameAm: 'ፒዛ', icon: 'ri-pizza-line', count: 12, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' },
    { name: 'Burgers', nameAm: 'በርገር', icon: 'ri-hamburger-line', count: 8, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg' },
    { name: 'Grill', nameAm: 'ግሪል', icon: 'ri-fire-line', count: 15, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg' },
    { name: 'Breakfast', nameAm: 'ቁርስ', icon: 'ri-sun-line', count: 10, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' },
    { name: 'Beverages', nameAm: '��ጠጦች', icon: 'ri-drinks-line', count: 20, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg' }
  ];

  const sampleTestimonials = [
    { id: 1, name: 'Abebe Kebede', nameAm: 'አበበ ከበደ', position: 'Food Critic', positionAm: 'የምግብ ተቺ', comment: 'Best Ethiopian restaurant in town! The Doro Wat is amazing.', commentAm: 'ከተማው ውስጥ ምርጥ የኢትዮጵያ ምግብ ቤት! ዶሮ ወጡ ድንቅ ነው።', rating: 5, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Meron Assefa', nameAm: 'መሮን አሰፋ', position: 'Regular Customer', positionAm: 'ተደጋጋሚ ደንበኛ', comment: 'Great service and delicious food. Highly recommend!', commentAm: 'ጥሩ አገልግሎት እና ጣፋጭ ምግብ። በጣም እመክራለሁ!', rating: 5, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Tekle Berhan', nameAm: 'ተክለ ብርሃን', position: 'Food Blogger', positionAm: 'የምግብ ብሎገር', comment: 'Authentic Ethiopian flavors in a cozy atmosphere.', commentAm: 'ምቹ በሆነ ሁኔታ ውስጥ ትክክለኛ የኢትዮጵያ ጣዕሞች።', rating: 4, image: 'https://randomuser.me/api/portraits/men/2.jpg' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedDishes(sampleDishes);
      setCategories(foodCategories);
      setTestimonials(sampleTestimonials);
      setLoading(false);
    }, 1000);
  }, []);

  const translations = {
    en: {
      shopNow: 'Order Now',
      callNow: 'Call Now',
      featuresTitle: 'Why Choose Ged Restaurant?',
      categoriesTitle: 'Our Food Categories',
      viewAllCategories: 'View All Categories',
      featuredDishes: 'Popular Dishes',
      viewAll: 'View Full Menu',
      addToCart: 'Add to Cart',
      testimonials: 'What Our Customers Say',
      getStarted: 'Book a Table',
      price: 'ETB',
      from: 'From',
      explore: 'Explore',
      reserve: 'Reserve Now',
      callUs: 'Call Us'
    },
    am: {
      shopNow: 'አሁን ይዘዙ',
      callNow: 'አሁን ይደውሉ',
      featuresTitle: 'ለምን ገድ ሬስቶራንት ይመርጣሉ?',
      categoriesTitle: 'የምግብ ምድቦቻችን',
      viewAllCategories: 'ሁሉንም ምድቦች ይመልከቱ',
      featuredDishes: 'ታዋቂ ምግቦች',
      viewAll: 'ሙሉ ምናሌ ይመልከቱ',
      addToCart: 'ወደ ጋሪ ጨምር',
      testimonials: 'ደንበኞቻችን ምን ይላሉ',
      getStarted: 'ጠረጴዛ ያስይዙ',
      price: 'ብር',
      from: 'ከ',
      explore: 'ያስሱ',
      reserve: 'አሁን ያስይዙ',
      callUs: 'ደውሉልን'
    }
  };

  const t = translations[language];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Ethiopian': 'ri-restaurant-line',
      'Pizza': 'ri-pizza-line',
      'Burgers': 'ri-hamburger-line',
      'Grill': 'ri-fire-line',
      'Breakfast': 'ri-sun-line',
      'Beverages': 'ri-drinks-line'
    };
    return icons[category] || 'ri-restaurant-line';
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <i className="ri-loader-4-line ri-spin"></i>
        <p>Loading Ged Restaurant...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <div className="hero-slider">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 5000 }}
          loop={true}
          effect="fade"
          pagination={{ clickable: true }}
          navigation={true}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="hero-slide">
              <div 
                className="slide-bg" 
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} 
              />
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <small>{language === 'en' ? 'Welcome to Ged Restaurant' : 'እንኳን ወደ ገድ ሬስቶራንት በደህና መጡ'}</small>
                <h1>{language === 'en' ? slide.title : slide.titleAm}</h1>
                <p>{language === 'en' ? slide.subtitle : slide.subtitleAm}</p>
                <div className="hero-buttons">
                  <Link to="/menu" className="btn-primary">{t.shopNow}</Link>
                  <a href="tel:+251964113416" className="btn-secondary">{t.callNow}</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t.featuresTitle}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{language === 'en' ? feature.title : feature.titleAm}</h3>
                <p>{language === 'en' ? feature.desc : feature.descAm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Flip Card Design */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.categoriesTitle}</h2>
            <Link to="/menu" className="view-all">
              {t.viewAllCategories} <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map((category, idx) => (
              <div className="category-item" key={idx}>
                <div className="category-card">
                  <div className="category-icon">
                    <i className={getCategoryIcon(category.name)}></i>
                  </div>
                  <h3>{language === 'en' ? category.name : category.nameAm}</h3>
                  <p>{category.count} {language === 'en' ? 'Items' : 'ምግቦች'}</p>
                </div>
                <div className="card-back">
                  <div className="back-price">{language === 'en' ? category.name : category.nameAm}</div>
                  <div className="back-content">
                    <h3>{language === 'en' ? category.name : category.nameAm}</h3>
                    <p>{language === 'en' ? `Delicious ${category.name} dishes` : `ጣፋጭ ${category.nameAm} ምግቦች`}</p>
                    <div className="back-stats">
                      <span><i className="ri-restaurant-line"></i> {category.count} {language === 'en' ? 'Items' : 'ምግቦች'}</span>
                    </div>
                  </div>
                  <div className="explore-link">
                    <Link to={`/menu?category=${category.name}`}>
                      {t.explore} <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.featuredDishes}</h2>
            <Link to="/menu" className="view-all">
              {t.viewAll} <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="dishes-grid">
            {featuredDishes.slice(0, 6).map(dish => (
              <div key={dish.id} className="dish-card">
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />
                  {dish.isPopular && <span className="popular-badge">Popular</span>}
                </div>
                <div className="dish-info">
                  <h3>{language === 'en' ? dish.name : dish.nameAm}</h3>
                  <p>{language === 'en' ? dish.description.substring(0, 60) : dish.descriptionAm.substring(0, 60)}...</p>
                  <div className="dish-footer">
                    <span className="dish-price">{t.price} {dish.price}</span>
                    <button className="add-to-cart-btn">
                      <i className="ri-shopping-cart-line"></i> {t.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">{t.testimonials}</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={i < testimonial.rating ? 'ri-star-fill' : 'ri-star-line'}></i>
                  ))}
                </div>
                <p>"{language === 'en' ? testimonial.comment : testimonial.commentAm}"</p>
                <h4>{language === 'en' ? testimonial.name : testimonial.nameAm}</h4>
                <span>{language === 'en' ? testimonial.position : testimonial.positionAm}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{language === 'en' ? 'Book Your Table Today!' : 'ጠረጴዛዎን ዛሬ ያስይዙ!'}</h2>
            <p>{language === 'en' ? 'Experience the best dining experience in town' : 'ከተማው ውስጥ ምርጥ የመመገቢያ ልምድ ይለማመዱ'}</p>
            <Link to="/reservation" className="cta-btn">
              {t.reserve} <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
