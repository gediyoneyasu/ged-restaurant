import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function OrdersManagement() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('gedOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const sampleOrders = [
        { id: 'ORD-001', date: '2024-01-15', customer: 'John Doe', total: 580, status: 'delivered', items: [{ name: 'Doro Wat', quantity: 1, price: 250 }] },
        { id: 'ORD-002', date: '2024-01-18', customer: 'Jane Smith', total: 620, status: 'preparing', items: [{ name: 'Mixed Grill', quantity: 1, price: 450 }] },
        { id: 'ORD-003', date: '2024-01-20', customer: 'Abebe Kebede', total: 350, status: 'confirmed', items: [{ name: 'Margherita Pizza', quantity: 1, price: 350 }] }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('gedOrders', JSON.stringify(sampleOrders));
    }
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('gedOrders', JSON.stringify(updated));
  };

  const deleteOrder = (id) => {
    if (window.confirm('Delete this order?')) {
      const updated = orders.filter(order => order.id !== id);
      setOrders(updated);
      localStorage.setItem('gedOrders', JSON.stringify(updated));
    }
  };

  const statuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

  return (
    <div className="admin-table">
      <div className="table-header">
        <h2>{language === 'en' ? 'Orders Management' : 'የትእዛዝ አስተዳደር'}</h2>
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.date}</td>
              <td>{order.customer}</td>
              <td>ETB {order.total}</td>
              <td>
                <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <div className="action-btns">
                  <button className="delete-btn" onClick={() => deleteOrder(order.id)}><i className="ri-delete-bin-line"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersManagement;
