import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function Settings() {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({
    deliveryFee: 50,
    minOrder: 200,
    openingTime: '08:00',
    closingTime: '22:00'
  });

  const handleSave = () => {
    localStorage.setItem('gedSettings', JSON.stringify(settings));
    alert(language === 'en' ? 'Settings saved!' : 'ቅንብሮች ተቀምጠዋል!');
  };

  return (
    <div className="admin-table">
      <div className="table-header">
        <h2>{language === 'en' ? 'Settings' : 'ቅንብሮች'}</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="form-group"><label>Delivery Fee (ETB)</label><input type="number" value={settings.deliveryFee} onChange={e => setSettings({...settings, deliveryFee: e.target.value})} /></div>
        <div className="form-group"><label>Minimum Order (ETB)</label><input type="number" value={settings.minOrder} onChange={e => setSettings({...settings, minOrder: e.target.value})} /></div>
        <div className="form-group"><label>Opening Time</label><input type="time" value={settings.openingTime} onChange={e => setSettings({...settings, openingTime: e.target.value})} /></div>
        <div className="form-group"><label>Closing Time</label><input type="time" value={settings.closingTime} onChange={e => setSettings({...settings, closingTime: e.target.value})} /></div>
        <button className="add-btn" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}
export default Settings;
