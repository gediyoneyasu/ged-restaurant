import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Cart.css';

function Cart() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
    loadCart();
  }, [language]);

  const loadCart = () => {
    const cart = localStorage.getItem('gedCart');
    if (cart) {
      try {
        const cartData = JSON.parse(cart);
        setCartItems(cartData.items || []);
        setCartTotal(cartData.total || 0);
      } catch {
        setCartItems([]);
        setCartTotal(0);
      }
    }
  };

  const updateCartCount = () => {
    const cartData = { items: cartItems, total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) };
    localStorage.setItem('gedCart', JSON.stringify(cartData));
    setCartTotal(cartData.total);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) { removeItem(id); return; }
    const updated = cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
    setCartItems(updated);
    updateCartCount();
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    if (updated.length === 0) localStorage.removeItem('gedCart');
    else updateCartCount();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    if (window.confirm(language === 'en' ? 'Clear all items?' : 'ሁሉንም እቃዎች ማጥፋት?')) {
      localStorage.removeItem('gedCart');
      setCartItems([]);
      setCartTotal(0);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const deliveryFee = cartTotal > 200 ? 0 : 50;
  const tax = cartTotal * 0.05;
  const grandTotal = cartTotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <i className="ri-shopping-cart-line"></i>
          <h2>{t('emptyCart')}</h2>
          <p>{t('emptyCartMsg')}</p>
          <Link to="/menu" className="browse-btn">{t('browseMenu')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" key={renderKey}>
      <div className="cart-hero">
        <h1>{t('cartTitle')}</h1>
        <p>{t('cartSubtitle')}</p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header"><span>{t('item')}</span><span>{t('price')}</span><span>{t('quantity')}</span><span>{t('total')}</span><span></span></div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info"><img src={item.image} alt={item.name} /><div><h4>{item.name}</h4></div></div>
              <div className="item-price">{t('price')} {item.price}</div>
              <div className="item-quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div>
              <div className="item-total">{t('price')} {item.price * item.quantity}</div>
              <button className="item-remove" onClick={() => removeItem(item.id)}><i className="ri-delete-bin-line"></i></button>
            </div>
          ))}
          <button className="clear-cart" onClick={clearCart}><i className="ri-delete-bin-line"></i> {t('clearCart')}</button>
        </div>

        <div className="cart-summary">
          <h3>{t('orderSummary')}</h3>
          <div className="summary-row"><span>{t('subtotal')}</span><span>{t('price')} {cartTotal}</span></div>
          <div className="summary-row"><span>{t('deliveryFee')}</span><span>{deliveryFee === 0 ? t('free') : `${t('price')} ${deliveryFee}`}</span></div>
          <div className="summary-row"><span>{t('tax')}</span><span>{t('price')} {tax.toFixed(2)}</span></div>
          <div className="summary-row total"><span>{t('total')}</span><span>{t('price')} {grandTotal.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>{t('proceedToCheckout')} <i className="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
