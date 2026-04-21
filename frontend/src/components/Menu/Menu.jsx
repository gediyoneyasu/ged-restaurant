import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Menu.css';

function Menu() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    // Load from localStorage (only active items)
    const savedItems = localStorage.getItem('gedMenuItems');
    const savedCategories = localStorage.getItem('gedCategories');
    
    if (savedItems) {
      const allItems = JSON.parse(savedItems);
      // Only show active items (isActive === true)
      const activeItems = allItems.filter(item => item.isActive !== false);
      setFoods(activeItems);
    } else {
      setFoods([]);
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      const defaultCategories = [
        { id: 'breakfast', nameEn: 'Breakfast', nameAm: 'ቁርስ' },
        { id: 'lunch', nameEn: 'Lunch', nameAm: 'ምሳ' },
        { id: 'dinner', nameEn: 'Dinner', nameAm: 'እራት' }
      ];
      setCategories(defaultCategories);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    loadCartCount();
    
    // Listen for menu updates from admin
    window.addEventListener('menuUpdated', fetchData);
    window.addEventListener('cartUpdated', loadCartCount);
    
    return () => {
      window.removeEventListener('menuUpdated', fetchData);
      window.removeEventListener('cartUpdated', loadCartCount);
    };
  }, []);

  const loadCartCount = () => {
    const cart = localStorage.getItem('gedCart');
    if (cart) {
      try {
        const cartData = JSON.parse(cart);
        const total = cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(total);
      } catch { setCartCount(0); }
    }
  };

  const addToCart = (item) => {
    const cart = localStorage.getItem('gedCart');
    let cartData = { items: [], total: 0 };
    if (cart) {
      try { cartData = JSON.parse(cart); } catch { cartData = { items: [], total: 0 }; }
    }
    const existing = cartData.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartData.items.push({
        id: item.id,
        name: language === 'en' ? item.nameEn : item.nameAm,
        price: item.price,
        quantity: 1,
        image: item.image || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
      });
    }
    cartData.total = cartData.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    localStorage.setItem('gedCart', JSON.stringify(cartData));
    setCartCount(cartData.items.reduce((sum, i) => sum + i.quantity, 0));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${language === 'en' ? item.nameEn : item.nameAm} added to cart!`);
  };

  const filteredFoods = foods.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = searchTerm === '' || 
      (language === 'en' ? item.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) : 
       item.nameAm?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const displayCategories = [
    { id: 'all', nameEn: 'All', nameAm: 'ሁሉም', icon: 'ri-grid-line' },
    ...categories.map(cat => ({
      id: cat.id,
      nameEn: cat.nameEn,
      nameAm: cat.nameAm,
      icon: 'ri-restaurant-line'
    }))
  ];

  if (loading) {
    return <div className="loading-spinner"><i className="ri-loader-4-line ri-spin"></i><p>Loading menu...</p></div>;
  }

  return (
    <div className="menu-page" key={language}>
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1>{t('menuTitle')}</h1>
          <p>{t('menuSubtitle')}</p>
        </div>
      </div>

      <div className="menu-container">
        <div className="menu-search">
          <i className="ri-search-line"></i>
          <input type="text" placeholder={t('search')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="menu-categories">
          <div className="category-tabs">
            {displayCategories.map(cat => (
              <button key={cat.id} className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                <i className={cat.icon}></i>
                <span>{language === 'en' ? cat.nameEn : cat.nameAm}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="no-items"><i className="ri-restaurant-line"></i><p>{t('noItems')}</p></div>
        ) : (
          <div className="menu-grid">
            {filteredFoods.map(item => (
              <div key={item.id} className="menu-item-card">
                <div className="menu-item-image">
                  <img src={item.image || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'} alt={language === 'en' ? item.nameEn : item.nameAm} />
                  {item.isPopular && <span className="popular-tag">{t('popular')}</span>}
                </div>
                <div className="menu-item-info">
                  <h3>{language === 'en' ? item.nameEn : item.nameAm}</h3>
                  <p>{language === 'en' ? item.descriptionEn : item.descriptionAm}</p>
                  <div className="item-footer">
                    <span className="item-price">{t('price')} {item.price}</span>
                    <button className="add-to-cart" onClick={() => addToCart(item)}>
                      <i className="ri-shopping-cart-line"></i> {t('addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/cart" className="floating-cart">
        <i className="ri-shopping-cart-line"></i>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </div>
  );
}

export default Menu;
