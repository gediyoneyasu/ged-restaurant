import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function ReservationsManagement() {
  const { language } = useLanguage();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('gedReservations');
    if (saved) setReservations(JSON.parse(saved));
    else setReservations([]);
  }, []);

  const updateStatus = (id, status) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    setReservations(updated);
    localStorage.setItem('gedReservations', JSON.stringify(updated));
  };

  return (
    <div className="admin-table">
      <div className="table-header">
        <h2>{language === 'en' ? 'Reservations Management' : 'ማስያዣ አስተዳደር'}</h2>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {reservations.map(res => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>{res.guests}</td>
              <td><select value={res.status} onChange={e => updateStatus(res.id, e.target.value)}><option>pending</option><option>confirmed</option><option>completed</option><option>cancelled</option></select></td>
              <td><button className="delete-btn"><i className="ri-delete-bin-line"></i></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ReservationsManagement;
