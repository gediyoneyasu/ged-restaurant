import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Dashboard from './Dashboard/Dashboard';
import OrdersManagement from './Orders/OrdersManagement';
import MenuManagement from './Menu/MenuManagement';
import ReservationsManagement from './Reservations/ReservationsManagement';
import UsersManagement from './Users/UsersManagement';
import ContactsManagement from './Contacts/ContactsManagement';
import HomeSettings from './HomeSettings/HomeSettings';
import Settings from './Settings/Settings';
import './Admin.css';

function Admin() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('gedToken');
    const userData = localStorage.getItem('gedUser');
    
    if (!token || !userData) {
      navigate('/auth');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        navigate('/');
        return;
      }
      setUser(parsedUser);
    } catch {
      navigate('/auth');
    }
  }, [navigate]);

  const menuItems = [
    { path: '', icon: 'ri-dashboard-line', labelEn: 'Dashboard', labelAm: 'ዳሽቦርድ' },
    { path: 'orders', icon: 'ri-shopping-bag-line', labelEn: 'Orders', labelAm: 'ትእዛዞች' },
    { path: 'menu', icon: 'ri-restaurant-line', labelEn: 'Menu Management', labelAm: 'ምናሌ አስተዳደር' },
    { path: 'reservations', icon: 'ri-calendar-line', labelEn: 'Reservations', labelAm: 'ማስያዣዎች' },
    { path: 'users', icon: 'ri-user-line', labelEn: 'Users', labelAm: 'ተጠቃሚዎች' },
    { path: 'contacts', icon: 'ri-mail-line', labelEn: 'Contact Messages', labelAm: 'የእውቂያ መልዕክቶች' },
    { path: 'home', icon: 'ri-home-line', labelEn: 'Home Settings', labelAm: 'የመነሻ ቅንብሮች' },
    { path: 'settings', icon: 'ri-settings-line', labelEn: 'Settings', labelAm: 'ቅንብሮች' }
  ];

  if (!user) {
    return (
      <div className="admin-loading">
        <i className="ri-loader-4-line ri-spin"></i>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel" key={language}>
      <div className="admin-sidebar">
        <div className="admin-logo">
          <i className="ri-restaurant-2-line"></i>
          <span>Ged <span className="logo-highlight">Admin</span></span>
        </div>
        
        <div className="admin-user">
          <div className="admin-avatar"><i className="ri-user-3-line"></i></div>
          <div className="admin-info"><h4>{user.name}</h4><p>{user.role}</p></div>
        </div>
        
        <nav className="admin-nav">
          {menuItems.map(item => (
            <Link key={item.path} to={`/admin/${item.path}`}>
              <i className={item.icon}></i>
              <span>{language === 'en' ? item.labelEn : item.labelAm}</span>
            </Link>
          ))}
        </nav>
        
        <Link to="/" className="admin-back"><i className="ri-arrow-left-line"></i><span>Back to Site</span></Link>
      </div>

      <div className="admin-content">
        <div className="admin-header"><h1>Admin Panel</h1></div>
        <div className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/reservations" element={<ReservationsManagement />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/contacts" element={<ContactsManagement />} />
            <Route path="/home" element={<HomeSettings />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
