import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function UsersManagement() {
  const { language } = useLanguage();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('gedUsers');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const sampleUsers = [
        { id: 1, name: 'Admin User', email: 'admin@gedrestaurant.com', phone: '0911111111', role: 'admin', address: 'Addis Ababa', city: 'Addis Ababa', registeredAt: '2024-01-01' },
        { id: 2, name: 'John Customer', email: 'john@example.com', phone: '0922222222', role: 'customer', address: 'Bole', city: 'Addis Ababa', registeredAt: '2024-01-15' }
      ];
      setUsers(sampleUsers);
      localStorage.setItem('gedUsers', JSON.stringify(sampleUsers));
    }
  }, []);

  const changeRole = (id, newRole) => {
    const updated = users.map(user => user.id === id ? { ...user, role: newRole } : user);
    setUsers(updated);
    localStorage.setItem('gedUsers', JSON.stringify(updated));
  };

  const deleteUser = (id) => {
    if (window.confirm('Delete this user?')) {
      const updated = users.filter(user => user.id !== id);
      setUsers(updated);
      localStorage.setItem('gedUsers', JSON.stringify(updated));
    }
  };

  return (
    <div className="admin-table">
      <div className="table-header">
        <h2>{language === 'en' ? 'Registered Users' : 'የተመዘገቡ ተጠቃሚዎች'}</h2>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Registered</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
              <td>
                <select value={user.role} onChange={e => changeRole(user.id, e.target.value)}>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>{user.registeredAt}</td>
              <td>
                <div className="action-btns">
                  <button className="edit-btn" onClick={() => setSelectedUser(user)}><i className="ri-eye-line"></i></button>
                  <button className="delete-btn" onClick={() => deleteUser(user.id)}><i className="ri-delete-bin-line"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>User Details</h3><button onClick={() => setSelectedUser(null)}><i className="ri-close-line"></i></button></div>
            <div className="modal-body">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Address:</strong> {selectedUser.address || 'Not provided'}</p>
              <p><strong>City:</strong> {selectedUser.city || 'Not provided'}</p>
              <p><strong>Registered:</strong> {selectedUser.registeredAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
