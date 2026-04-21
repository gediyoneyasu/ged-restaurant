import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState(localStorage.getItem('gedLanguage') || 'en');
  const navigate = useNavigate();
  const location = useLocation();

  const loadCartCount = () => {
    const cart = localStorage.getItem('gedCart');
    if (cart) {
      try {
        const cartData = JSON.parse(cart);
        const total = cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(total);
      } catch { setCartCount(0); }
    } else { setCartCount(0); }
  };

  useEffect(() => {
    const token = localStorage.getItem('gedToken');
    const user = localStorage.getItem('gedUser');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.name || '');
        setUserRole(userData.role || 'customer');
      } catch { setIsLoggedIn(false); }
    } else { setIsLoggedIn(false); }
    
    loadCartCount();
    window.addEventListener('cartUpdated', loadCartCount);
    return () => window.removeEventListener('cartUpdated', loadCartCount);
  }, [location.pathname]);

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('gedLanguage') || 'en';
      setLanguage(newLang);
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  const handleLogout = () => {
    localStorage.removeItem('gedToken');
    localStorage.removeItem('gedUser');
    setIsLoggedIn(false);
    navigate('/');
    closeMenu();
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('gedLanguage', lang);
    window.dispatchEvent(new Event('languageChanged'));
    setShowLangDropdown(false);
  };

  const t = {
    en: { home: 'Home', menu: 'Menu', reservation: 'Reservation', orders: 'My Orders', about: 'About', contact: 'Contact', login: 'Login', logout: 'Logout', cart: 'Cart', admin: 'Admin Panel' },
    am: { home: 'መነሻ', menu: 'ምናሌ', reservation: 'ማስያዝ', orders: 'ትእዛዞቼ', about: 'ስለእኛ', contact: 'ያግኙን', login: 'ግባ', logout: 'ውጣ', cart: 'ጋሪ', admin: 'አስተዳዳሪ' }
  };

  const text = t[language];

  return (
    <header className="ged-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/"><i className="ri-restaurant-2-line"></i><span>Ged <span className="logo-highlight">Restaurant</span></span></Link>
        </div>

        <ul className={showMenu ? "nav-links show" : "nav-links"} onClick={closeMenu}>
          <li><Link to="/">{text.home}</Link></li>
          <li><Link to="/menu">{text.menu}</Link></li>
          <li><Link to="/reservation">{text.reservation}</Link></li>
          <li><Link to="/orders">{text.orders}</Link></li>
          <li><Link to="/about">{text.about}</Link></li>
          <li><Link to="/contact">{text.contact}</Link></li>
          {isLoggedIn && userRole === 'admin' && <li><Link to="/admin">{text.admin}</Link></li>}
          {isLoggedIn && <li><button onClick={handleLogout} className="mobile-logout">{text.logout}</button></li>}
        </ul>

        <div className="header-actions">
          <div className="language-dropdown">
            <button className="lang-btn" onClick={() => setShowLangDropdown(!showLangDropdown)}>
              <span>{language === 'en' ? 'EN' : 'አማ'}</span>
              <i className="ri-arrow-down-s-line"></i>
            </button>
            {showLangDropdown && (
              <div className="lang-dropdown-menu">
                <button className={`lang-option ${language === 'en' ? 'active' : ''}`} onClick={() => selectLanguage('en')}>English (EN)</button>
                <button className={`lang-option ${language === 'am' ? 'active' : ''}`} onClick={() => selectLanguage('am')}>አማርኛ (AM)</button>
              </div>
            )}
          </div>

          <Link to="/cart" className="cart-btn">
            <i className="ri-shopping-cart-line"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {isLoggedIn ? (
            <div className="user-menu">
              <Link to="/profile" className="user-btn"><i className="ri-user-line"></i><span>{userName.split(' ')[0]}</span></Link>
              <button onClick={handleLogout} className="logout-icon"><i className="ri-logout-box-line"></i></button>
            </div>
          ) : (
            <Link to="/auth" className="auth-btn"><i className="ri-user-line"></i><span>{text.login}</span></Link>
          )}
          
          <i className="ri-menu-4-line" id="menu-toggle" onClick={toggleMenu}></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
