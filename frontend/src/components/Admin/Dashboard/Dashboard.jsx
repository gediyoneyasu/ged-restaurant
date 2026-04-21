import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    users: 0,
    reservations: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Load stats from localStorage
    const orders = JSON.parse(localStorage.getItem('gedOrders') || '[]');
    const users = JSON.parse(localStorage.getItem('gedUsers') || '[]');
    const reservations = JSON.parse(localStorage.getItem('gedReservations') || '[]');
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    setStats({
      orders: orders.length,
      revenue: totalRevenue,
      users: users.length || 5,
      reservations: reservations.length || 3
    });
    
    setRecentOrders(orders.slice(0, 5));
  }, []);

  const statCards = [
    { icon: 'ri-shopping-bag-line', labelEn: 'Total Orders', labelAm: 'ጠቅላላ ትእዛዞች', value: stats.orders, color: '#3498db' },
    { icon: 'ri-money-dollar-circle-line', labelEn: 'Revenue', labelAm: 'ገቢ', value: `ETB ${stats.revenue}`, color: '#27ae60' },
    { icon: 'ri-user-line', labelEn: 'Total Users', labelAm: 'ጠቅላላ ተጠቃሚዎች', value: stats.users, color: '#9b59b6' },
    { icon: 'ri-calendar-line', labelEn: 'Reservations', labelAm: 'ማስያዣዎች', value: stats.reservations, color: '#e67e22' }
  ];

  return (
    <div>
      <div className="stats-grid">
        {statCards.map((card, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon" style={{ background: card.color }}>
              <i className={card.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{card.value}</h3>
              <p>{language === 'en' ? card.labelEn : card.labelAm}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table">
        <div className="table-header">
          <h2>{t('recentOrders') || 'Recent Orders'}</h2>
          <Link to="/admin/orders" className="add-btn">
            {t('viewAll') || 'View All'} <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>{t('noOrders') || 'No orders yet'}</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>{t('orderId') || 'Order ID'}</th><th>{t('date') || 'Date'}</th><th>{t('total') || 'Total'}</th><th>{t('status') || 'Status'}</th></tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.date}</td>
                  <td>ETB {order.total}</td>
                  <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
