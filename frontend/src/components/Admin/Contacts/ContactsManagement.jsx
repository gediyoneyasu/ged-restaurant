import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function ContactsManagement() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    // Load contact messages from localStorage
    const saved = localStorage.getItem('gedContactMessages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const sampleMessages = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '0912345678', subject: 'General Inquiry', message: 'Great restaurant!', date: '2024-01-15', status: 'unread' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', subject: 'Reservation', message: 'Need table for 5 people', date: '2024-01-16', status: 'read' }
      ];
      setMessages(sampleMessages);
      localStorage.setItem('gedContactMessages', JSON.stringify(sampleMessages));
    }
  }, []);

  const markAsRead = (id) => {
    const updated = messages.map(msg => 
      msg.id === id ? { ...msg, status: 'read' } : msg
    );
    setMessages(updated);
    localStorage.setItem('gedContactMessages', JSON.stringify(updated));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      const updated = messages.filter(msg => msg.id !== id);
      setMessages(updated);
      localStorage.setItem('gedContactMessages', JSON.stringify(updated));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  return (
    <div className="admin-table">
      <div className="table-header">
        <h2>{language === 'en' ? 'Contact Messages' : 'የእውቂያ መልዕክቶች'}</h2>
      </div>
      
      <div className="contacts-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? '#fefaf5' : 'white' }}>
                  <td>{msg.name}</td><td>{msg.email}</td><td>{msg.subject}</td>
                  <td><span className={`status-badge ${msg.status === 'unread' ? 'status-pending' : 'status-delivered'}`}>{msg.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => setSelectedMessage(msg)}><i className="ri-eye-line"></i></button>
                      <button className="delete-btn" onClick={() => deleteMessage(msg.id)}><i className="ri-delete-bin-line"></i></button>
                      {msg.status === 'unread' && <button className="save-btn" onClick={() => markAsRead(msg.id)}><i className="ri-check-line"></i></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedMessage && (
          <div className="message-detail" style={{ background: 'white', padding: '20px', borderRadius: '15px' }}>
            <h3>Message Details</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
            <p><strong>Date:</strong> {selectedMessage.date}</p>
            <p><strong>Message:</strong></p>
            <p style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>{selectedMessage.message}</p>
            <button className="delete-btn" onClick={() => setSelectedMessage(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsManagement;
