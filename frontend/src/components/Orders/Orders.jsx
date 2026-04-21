import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Orders.css';

function Orders() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
    setTimeout(() => {
      const sampleOrders = [
        { id: 'ORD-001', date: '2024-01-15', total: 580, status: 'delivered', items: 3 },
        { id: 'ORD-002', date: '2024-01-18', total: 620, status: 'preparing', items: 2 },
        { id: 'ORD-003', date: '2024-01-20', total: 350, status: 'confirmed', items: 1 }
      ];
      setOrders(sampleOrders);
      setLoading(false);
    }, 500);
  }, [language]);

  const getStatusInfo = (status) => {
    const statuses = { pending: { en: 'Pending', am: 'በመጠባበቅ ላይ', color: '#f39c12' }, confirmed: { en: 'Confirmed', am: 'ተረጋግጧል', color: '#3498db' }, preparing: { en: 'Preparing', am: 'በዝግጅት ላይ', color: '#9b59b6' }, delivered: { en: 'Delivered', am: 'ደርሷል', color: '#27ae60' } };
    return statuses[status] || statuses.pending;
  };

  const filteredOrders = orders.filter(order => activeTab === 'active' ? order.status !== 'delivered' : order.status === 'delivered');

  if (loading) return <div className="orders-loading"><i className="ri-loader-4-line ri-spin"></i><p>Loading...</p></div>;

  return (
    <div className="orders-page" key={renderKey}>
      <div className="orders-hero"><h1>{t('ordersTitle')}</h1><p>{t('ordersSubtitle')}</p></div>
      <div className="orders-container">
        <div className="orders-tabs">
          <button className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}><i className="ri-timer-line"></i> {t('activeOrders')}</button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}><i className="ri-history-line"></i> {t('orderHistory')}</button>
        </div>
        {filteredOrders.length === 0 ? (
          <div className="no-orders"><i className="ri-shopping-bag-line"></i><h3>{activeTab === 'active' ? t('noActiveOrders') : t('noHistoryOrders')}</h3><Link to="/menu" className="browse-menu-btn">{t('browseMenu')} <i className="ri-arrow-right-line"></i></Link></div>
        ) : (
          <div className="orders-list">{filteredOrders.map(order => { const statusInfo = getStatusInfo(order.status); return (
            <div key={order.id} className="order-card"><div className="order-header"><span className="order-id">{t('orderId')}: #{order.id}</span><span className="order-date">{order.date}</span><div className="order-status" style={{ color: statusInfo.color }}><i className="ri-time-line"></i><span>{language === 'en' ? statusInfo.en : statusInfo.am}</span></div></div>
            <div className="order-details"><span>{order.items} {t('items')}</span><span className="order-total">{t('price')} {order.total}</span></div>
            <div className="order-actions"><button className="track-btn">{t('trackOrder')}</button><button className="reorder-btn">{t('reorder')}</button></div></div>);
          })}</div>)}
      </div>
    </div>
  );
}
export default Orders;
