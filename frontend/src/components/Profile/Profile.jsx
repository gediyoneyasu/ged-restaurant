import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Profile.css';

function Profile() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '' });

  useEffect(() => {
    setRenderKey(prev => prev + 1);
    const token = localStorage.getItem('gedToken');
    const userData = localStorage.getItem('gedUser');
    if (!token || !userData) { navigate('/auth'); return; }
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({ name: parsedUser.name || '', email: parsedUser.email || '', phone: parsedUser.phone || '', address: parsedUser.address || '', city: parsedUser.city || '' });
    } catch { navigate('/auth'); }
  }, [language]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => { const updatedUser = { ...user, ...formData }; localStorage.setItem('gedUser', JSON.stringify(updatedUser)); setUser(updatedUser); setIsEditing(false); alert(language === 'en' ? 'Profile updated!' : 'መገለጫ ተዘምኗል!'); };

  if (!user) return <div className="profile-loading"><i className="ri-loader-4-line ri-spin"></i><p>Loading...</p></div>;

  return (
    <div className="profile-page" key={renderKey}>
      <div className="profile-hero"><div className="profile-hero-content"><h1>{t('myProfile')}</h1><p>{t('profileSubtitle')}</p></div></div>
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar"><div className="avatar-icon"><i className="ri-user-3-line"></i></div><h3>{user.name}</h3><p>{user.email}</p><span className="role-badge user">{user.role === 'admin' ? 'Admin' : 'Customer'}</span></div>
          <div className="profile-menu"><button className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><i className="ri-user-line"></i><span>{t('personalInfo')}</span></button>
          <button className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><i className="ri-shopping-bag-line"></i><span>{t('myOrders')}</span></button>
          <Link to="/cart" className="menu-item"><i className="ri-shopping-cart-line"></i><span>{t('myCart')}</span></Link>
          <Link to="/reservation" className="menu-item"><i className="ri-calendar-line"></i><span>{t('myReservations')}</span></Link>
          <button className="menu-item logout" onClick={() => { localStorage.removeItem('gedToken'); localStorage.removeItem('gedUser'); navigate('/auth'); }}><i className="ri-logout-box-line"></i><span>{t('logout')}</span></button></div>
        </div>
        <div className="profile-content">
          {activeTab === 'profile' && (<div className="profile-tab"><div className="tab-header"><h2>{t('personalInfo')}</h2>{!isEditing ? <button className="edit-btn" onClick={() => setIsEditing(true)}><i className="ri-edit-line"></i> {t('edit')}</button> : <div className="edit-actions"><button className="save-btn" onClick={handleSave}><i className="ri-save-line"></i> {t('save')}</button><button className="cancel-btn" onClick={() => setIsEditing(false)}><i className="ri-close-line"></i> {t('cancel')}</button></div>}</div>
          <div className="info-form"><div className="form-row"><div className="form-group"><label>{t('fullName')}</label>{isEditing ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : <p>{user.name}</p>}</div>
          <div className="form-group"><label>{t('email')}</label>{isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : <p>{user.email}</p>}</div></div>
          <div className="form-row"><div className="form-group"><label>{t('phone')}</label>{isEditing ? <input type="tel" name="phone" value={formData.phone} onChange={handleChange} /> : <p>{user.phone || 'Not provided'}</p>}</div></div></div></div>)}
          {activeTab === 'orders' && (<div className="profile-tab"><div className="tab-header"><h2>{t('myOrders')}</h2></div><div className="no-orders"><i className="ri-shopping-bag-line"></i><p>{t('noOrders')}</p><Link to="/menu" className="browse-btn">{t('browseMenu')}</Link></div></div>)}
        </div>
      </div>
    </div>
  );
}
export default Profile;
