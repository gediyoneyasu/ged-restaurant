import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Checkout.css';

function Checkout() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', notes: '' });

  useEffect(() => {
    setRenderKey(prev => prev + 1);
    const cart = localStorage.getItem('gedCart');
    if (cart) {
      try {
        const cartData = JSON.parse(cart);
        if (!cartData.items || cartData.items.length === 0) navigate('/cart');
        setCartItems(cartData.items || []);
        setCartTotal(cartData.total || 0);
      } catch { navigate('/cart'); }
    } else { navigate('/cart'); }
  }, [language]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const deliveryFee = cartTotal > 200 ? 0 : 50;
  const tax = cartTotal * 0.05;
  const grandTotal = cartTotal + deliveryFee + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('gedCart');
      setSubmitted(true);
      setLoading(false);
      window.dispatchEvent(new Event('cartUpdated'));
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-card">
            <i className="ri-checkbox-circle-fill"></i>
            <h2>{t('orderSuccess')}</h2>
            <p>{t('orderSuccessMsg')}</p>
            <Link to="/orders" className="view-orders-btn">{t('viewOrders')}</Link>
            <Link to="/menu" className="continue-btn">{t('continueShopping')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" key={renderKey}>
      <div className="checkout-hero"><h1>{t('checkoutTitle')}</h1><p>{t('checkoutSubtitle')}</p></div>
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section"><h3>{t('shippingInfo')}</h3>
            <div className="form-row"><input type="text" name="name" placeholder={t('name')} onChange={handleChange} required /><input type="email" name="email" placeholder={t('email')} onChange={handleChange} required /></div>
            <div className="form-row"><input type="tel" name="phone" placeholder={t('phone')} onChange={handleChange} required /><input type="text" name="address" placeholder={t('address')} onChange={handleChange} required /></div>
            <div className="form-row"><input type="text" name="city" placeholder={t('city')} onChange={handleChange} required /><textarea name="notes" placeholder={t('orderNotes')} rows="3"></textarea></div>
          </div>
          <div className="form-section"><h3>{t('paymentMethod')}</h3>
            <div className="payment-options">
              <label className="payment-option"><input type="radio" name="payment" defaultChecked /><i className="ri-cash-line"></i><div><strong>{t('cashOnDelivery')}</strong><small>{t('payOnDelivery')}</small></div></label>
              <label className="payment-option"><input type="radio" name="payment" /><i className="ri-bank-card-line"></i><div><strong>{t('chapaPayment')}</strong><small>{t('payOnline')}</small></div></label>
            </div>
          </div>
          <button type="submit" className="place-order-btn" disabled={loading}>{loading ? t('processing') : `${t('placeOrder')} - ${t('price')} ${grandTotal.toFixed(2)}`}</button>
        </form>
        <div className="order-summary"><h3>{t('orderSummary')}</h3>
          {cartItems.map((item, idx) => <div key={idx} className="summary-item"><span>{item.name} x{item.quantity}</span><span>{t('price')} {item.price * item.quantity}</span></div>)}
          <div className="summary-totals"><div><span>{t('subtotal')}</span><span>{t('price')} {cartTotal}</span></div>
          <div><span>{t('deliveryFee')}</span><span>{deliveryFee === 0 ? t('free') : `${t('price')} ${deliveryFee}`}</span></div>
          <div><span>{t('tax')}</span><span>{t('price')} {tax.toFixed(2)}</span></div>
          <div className="grand-total"><span>{t('total')}</span><span>{t('price')} {grandTotal.toFixed(2)}</span></div></div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
