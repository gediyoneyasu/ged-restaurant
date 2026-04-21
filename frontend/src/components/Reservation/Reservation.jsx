import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Reservation.css';

function Reservation() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: 'none',
    specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const max = new Date();
    max.setDate(max.getDate() + 30);
    return max.toISOString().split('T')[0];
  };

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const occasions = [
    { value: 'none', labelEn: 'None', labelAm: 'ምንም' },
    { value: 'birthday', labelEn: 'Birthday', labelAm: 'ልደት' },
    { value: 'anniversary', labelEn: 'Anniversary', labelAm: 'አመታዊ በዓል' },
    { value: 'business', labelEn: 'Business Meeting', labelAm: 'የንግድ ስብሰባ' },
    { value: 'romantic', labelEn: 'Romantic Dinner', labelAm: 'ሮማንቲክ እራት' },
    { value: 'family', labelEn: 'Family Gathering', labelAm: 'የቤተሰብ ስብሰባ' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log('Reservation submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: 'none', specialRequests: ''
        });
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="reservation-page">
        <div className="reservation-success">
          <div className="success-card">
            <i className="ri-checkbox-circle-fill"></i>
            <h2>{t('successTitle')}</h2>
            <p>{t('successMessage')}</p>
            <button onClick={() => setSubmitted(false)} className="new-reservation-btn">
              {t('newReservation')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page" key={language}>
      <div className="reservation-hero">
        <div className="reservation-hero-content">
          <h1>{t('resTitle')}</h1>
          <p>{t('resSubtitle')}</p>
        </div>
      </div>

      <div className="reservation-container">
        <div className="reservation-form-wrapper">
          <div className="form-header">
            <i className="ri-calendar-check-line"></i>
            <h2>{t('formTitle')}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label><i className="ri-user-line"></i> {t('name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('name')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label><i className="ri-mail-line"></i> {t('email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('email')}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><i className="ri-phone-line"></i> {t('phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('phone')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label><i className="ri-calendar-line"></i> {t('date')}</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><i className="ri-time-line"></i> {t('time')}</label>
                <select name="time" value={formData.time} onChange={handleChange} required>
                  <option value="">{t('time')}</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label><i className="ri-group-line"></i> {t('guests')}</label>
                <select name="guests" value={formData.guests} onChange={handleChange}>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label><i className="ri-gift-line"></i> {t('occasion')}</label>
              <select name="occasion" value={formData.occasion} onChange={handleChange}>
                {occasions.map(occ => (
                  <option key={occ.value} value={occ.value}>
                    {language === 'en' ? occ.labelEn : occ.labelAm}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="ri-chat-1-line"></i> {t('specialRequests')}</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder={t('specialRequests')}
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <><i className="ri-loader-4-line ri-spin"></i> {t('submitting')}</>
              ) : (
                <><i className="ri-check-line"></i> {t('submit')}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
