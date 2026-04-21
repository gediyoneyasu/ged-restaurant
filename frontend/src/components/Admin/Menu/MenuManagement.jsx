import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

function MenuManagement() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    nameEn: '', nameAm: '', price: '', category: '', descriptionEn: '', descriptionAm: '', 
    isActive: true, isPopular: false, image: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedItems = localStorage.getItem('gedMenuItems');
    const savedCategories = localStorage.getItem('gedCategories');
    
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      const defaultItems = [
        { id: 1, nameEn: 'Doro Wat', nameAm: 'ዶሮ ወጥ', price: 250, category: 'lunch', descriptionEn: 'Spicy chicken stew', descriptionAm: 'ቅመም ዶሮ ወጥ', isActive: true, isPopular: true, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg' },
        { id: 2, nameEn: 'Tibs', nameAm: 'ጥብስ', price: 280, category: 'lunch', descriptionEn: 'Sautéed meat', descriptionAm: 'የተጠበሰ ሥጋ', isActive: true, isPopular: true, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' },
        { id: 3, nameEn: 'Kitfo', nameAm: 'ክትፎ', price: 300, category: 'dinner', descriptionEn: 'Minced raw beef', descriptionAm: 'የተፈጨ ጥሬ ሥጋ', isActive: false, isPopular: false, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg' }
      ];
      setItems(defaultItems);
      localStorage.setItem('gedMenuItems', JSON.stringify(defaultItems));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      const defaultCategories = [
        { id: 'breakfast', nameEn: 'Breakfast', nameAm: 'ቁርስ' },
        { id: 'lunch', nameEn: 'Lunch', nameAm: 'ምሳ' },
        { id: 'dinner', nameEn: 'Dinner', nameAm: 'እራት' },
        { id: 'traditional', nameEn: 'Traditional', nameAm: 'ባህላዊ' },
        { id: 'modern', nameEn: 'Modern', nameAm: 'ዘመናዊ' },
        { id: 'drinks', nameEn: 'Drinks', nameAm: 'መጠጦች' }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('gedCategories', JSON.stringify(defaultCategories));
    }
    
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      const updated = items.map(item => 
        item.id === editingItem.id ? { ...item, ...formData, id: item.id } : item
      );
      setItems(updated);
      localStorage.setItem('gedMenuItems', JSON.stringify(updated));
    } else {
      const newItem = { ...formData, id: Date.now() };
      const updated = [...items, newItem];
      setItems(updated);
      localStorage.setItem('gedMenuItems', JSON.stringify(updated));
    }
    
    setShowModal(false);
    setEditingItem(null);
    setImagePreview('');
    setFormData({ nameEn: '', nameAm: '', price: '', category: '', descriptionEn: '', descriptionAm: '', isActive: true, isPopular: false, image: '' });
    window.dispatchEvent(new Event('menuUpdated'));
  };

  const handleToggleActive = (id, currentStatus) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, isActive: !currentStatus } : item
    );
    setItems(updated);
    localStorage.setItem('gedMenuItems', JSON.stringify(updated));
    window.dispatchEvent(new Event('menuUpdated'));
    alert(`Food is now ${!currentStatus ? 'ACTIVE' : 'INACTIVE'}`);
  };

  const deleteItem = (id) => {
    if (window.confirm('Delete this item?')) {
      const updated = items.filter(item => item.id !== id);
      setItems(updated);
      localStorage.setItem('gedMenuItems', JSON.stringify(updated));
      window.dispatchEvent(new Event('menuUpdated'));
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading menu items...</div>;
  }

  return (
    <div>
      <div className="admin-table">
        <div className="table-header">
          <h2>{language === 'en' ? 'Menu Management' : 'ምናሌ አስተዳደር'}</h2>
          <button className="add-btn" onClick={() => { setEditingItem(null); setFormData({ nameEn: '', nameAm: '', price: '', category: '', descriptionEn: '', descriptionAm: '', isActive: true, isPopular: false, image: '' }); setImagePreview(''); setShowModal(true); }}>
            <i className="ri-add-line"></i> {language === 'en' ? 'Add Item' : 'ምግብ ጨምር'}
          </button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ background: !item.isActive ? '#fff3f3' : 'white', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    <img src={item.image || 'https://via.placeholder.com/50'} alt={item.nameEn} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  </td>
                  <td style={{ padding: '12px' }}>{language === 'en' ? item.nameEn : item.nameAm}</td>
                  <td style={{ padding: '12px' }}>ETB {item.price}</td>
                  <td style={{ padding: '12px' }}>{language === 'en' ? item.category : categories.find(c => c.id === item.category)?.nameAm || item.category}</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => handleToggleActive(item.id, item.isActive)}
                      style={{
                        background: item.isActive ? '#27ae60' : '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}
                    >
                      {item.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE'}
                    </button>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div className="action-btns" style={{ display: 'flex', gap: '8px' }}>
                      <button className="edit-btn" onClick={() => { setEditingItem(item); setFormData(item); setImagePreview(item.image || ''); setShowModal(true); }} style={{ background: '#3498db', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="delete-btn" onClick={() => deleteItem(item.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '15px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
            <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}><i className="ri-close-line"></i></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: '20px' }}>
                {/* Image URL Field */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.pexels.com/..." 
                    value={formData.image} 
                    onChange={handleImageChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                  />
                  {imagePreview && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Preview</p>
                    </div>
                  )}
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Use free images from: 
                    <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22', marginLeft: '5px' }}>Pexels</a>, 
                    <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22', marginLeft: '5px' }}>Unsplash</a>
                  </p>
                </div>
                
                <input type="text" placeholder="Name (English)" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input type="text" placeholder="Name (Amharic)" value={formData.nameAm} onChange={e => setFormData({...formData, nameAm: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input type="number" placeholder="Price (ETB)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{language === 'en' ? cat.nameEn : cat.nameAm}</option>
                  ))}
                </select>
                <textarea placeholder="Description (English)" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} rows="2" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }}></textarea>
                <textarea placeholder="Description (Amharic)" value={formData.descriptionAm} onChange={e => setFormData({...formData, descriptionAm: e.target.value})} rows="2" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }}></textarea>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} />
                  Popular Item (shows star badge)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                  Active (show on website)
                </label>
              </div>
              <div className="modal-footer" style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="save-btn" style={{ padding: '8px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;
