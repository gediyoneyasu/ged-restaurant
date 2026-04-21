import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import './HomeSettings.css';

function HomeSettings() {
  const { language } = useLanguage();
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('sliders');
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [sliderForm, setSliderForm] = useState({
    titleEn: '', titleAm: '', subtitleEn: '', subtitleAm: '', image: '', order: 0, isActive: true
  });
  const [categoryForm, setCategoryForm] = useState({
    nameEn: '', nameAm: '', descriptionEn: '', descriptionAm: '', image: '', icon: 'ri-restaurant-line', order: 0, isActive: true
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadSliders();
    loadCategories();
  }, []);

  const loadSliders = () => {
    const saved = localStorage.getItem('gedHomeSliders');
    if (saved) {
      setSliders(JSON.parse(saved));
    } else {
      const defaultSliders = [
        { id: 1, titleEn: 'Authentic Ethiopian Cuisine', titleAm: 'ትክክለኛ የኢትዮጵያ ምግብ', subtitleEn: 'Experience the rich flavors of Ethiopia', subtitleAm: 'የኢትዮጵያን ልዩ ጣዕም ይለማመዱ', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg', order: 1, isActive: true },
        { id: 2, titleEn: 'Fresh Ingredients Daily', titleAm: 'ትኩስ ንጥረ ነገሮች', subtitleEn: 'We source the freshest ingredients', subtitleAm: 'ትኩስ ንጥረ ነገሮችን እናመጣለን', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', order: 2, isActive: true },
        { id: 3, titleEn: 'Cozy Atmosphere', titleAm: 'ምቹ ሁኔታ', subtitleEn: 'Perfect for family gatherings', subtitleAm: 'ለቤተሰብ ስብሰባ ተስማሚ', image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', order: 3, isActive: true }
      ];
      setSliders(defaultSliders);
      localStorage.setItem('gedHomeSliders', JSON.stringify(defaultSliders));
    }
  };

  const loadCategories = () => {
    const saved = localStorage.getItem('gedHomeCategories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaultCategories = [
        { id: 1, nameEn: 'Ethiopian', nameAm: 'ኢትዮጵያዊ', descriptionEn: 'Traditional Ethiopian dishes', descriptionAm: 'ባህላዊ የኢትዮጵያ ምግቦች', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', icon: 'ri-restaurant-line', order: 1, isActive: true },
        { id: 2, nameEn: 'Pizza', nameAm: 'ፒዛ', descriptionEn: 'Delicious Italian pizzas', descriptionAm: 'ጣፋጭ የጣሊያን ፒዛዎች', image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg', icon: 'ri-pizza-line', order: 2, isActive: true },
        { id: 3, nameEn: 'Burgers', nameAm: 'በርገር', descriptionEn: 'Juicy gourmet burgers', descriptionAm: 'ጭማቂ ጎርሜት በርገሮች', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', icon: 'ri-hamburger-line', order: 3, isActive: true },
        { id: 4, nameEn: 'Breakfast', nameAm: 'ቁርስ', descriptionEn: 'Start your day right', descriptionAm: 'ቀንዎን በትክክል ይጀምሩ', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', icon: 'ri-sun-line', order: 4, isActive: true }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('gedHomeCategories', JSON.stringify(defaultCategories));
    }
  };

  const handleSliderSubmit = (e) => {
    e.preventDefault();
    if (editingSlider) {
      const updated = sliders.map(s => s.id === editingSlider.id ? { ...sliderForm, id: s.id } : s);
      setSliders(updated);
      localStorage.setItem('gedHomeSliders', JSON.stringify(updated));
    } else {
      const newSlider = { ...sliderForm, id: Date.now() };
      setSliders([...sliders, newSlider]);
      localStorage.setItem('gedHomeSliders', JSON.stringify([...sliders, newSlider]));
    }
    setShowSliderModal(false);
    setEditingSlider(null);
    setSliderForm({ titleEn: '', titleAm: '', subtitleEn: '', subtitleAm: '', image: '', order: 0, isActive: true });
    setImagePreview('');
    window.dispatchEvent(new Event('homeUpdated'));
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      const updated = categories.map(c => c.id === editingCategory.id ? { ...categoryForm, id: c.id } : c);
      setCategories(updated);
      localStorage.setItem('gedHomeCategories', JSON.stringify(updated));
    } else {
      const newCategory = { ...categoryForm, id: Date.now() };
      setCategories([...categories, newCategory]);
      localStorage.setItem('gedHomeCategories', JSON.stringify([...categories, newCategory]));
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({ nameEn: '', nameAm: '', descriptionEn: '', descriptionAm: '', image: '', icon: 'ri-restaurant-line', order: 0, isActive: true });
    setImagePreview('');
    window.dispatchEvent(new Event('homeUpdated'));
  };

  const deleteSlider = (id) => {
    if (window.confirm('Delete this slider?')) {
      const updated = sliders.filter(s => s.id !== id);
      setSliders(updated);
      localStorage.setItem('gedHomeSliders', JSON.stringify(updated));
      window.dispatchEvent(new Event('homeUpdated'));
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm('Delete this category?')) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      localStorage.setItem('gedHomeCategories', JSON.stringify(updated));
      window.dispatchEvent(new Event('homeUpdated'));
    }
  };

  const toggleSliderActive = (id) => {
    const updated = sliders.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    setSliders(updated);
    localStorage.setItem('gedHomeSliders', JSON.stringify(updated));
    window.dispatchEvent(new Event('homeUpdated'));
  };

  const toggleCategoryActive = (id) => {
    const updated = categories.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c);
    setCategories(updated);
    localStorage.setItem('gedHomeCategories', JSON.stringify(updated));
    window.dispatchEvent(new Event('homeUpdated'));
  };

  return (
    <div className="home-settings">
      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'sliders' ? 'active' : ''}`} onClick={() => setActiveTab('sliders')}>
          <i className="ri-image-line"></i> Home Slider
        </button>
        <button className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          <i className="ri-grid-line"></i> Food Categories
        </button>
      </div>

      {/* Sliders Section */}
      {activeTab === 'sliders' && (
        <div className="admin-table">
          <div className="table-header">
            <h2>Home Page Slider</h2>
            <button className="add-btn" onClick={() => { setEditingSlider(null); setSliderForm({ titleEn: '', titleAm: '', subtitleEn: '', subtitleAm: '', image: '', order: 0, isActive: true }); setImagePreview(''); setShowSliderModal(true); }}>
              <i className="ri-add-line"></i> Add Slide
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr><th>Image</th><th>Title (EN)</th><th>Title (AM)</th><th>Status</th><th>Order</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {sliders.sort((a,b) => a.order - b.order).map(slide => (
                  <tr key={slide.id}>
                    <td><img src={slide.image} alt={slide.titleEn} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td>{slide.titleEn}</td>
                    <td>{slide.titleAm}</td>
                    <td><button onClick={() => toggleSliderActive(slide.id)} style={{ background: slide.isActive ? '#27ae60' : '#e74c3c', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer' }}>{slide.isActive ? 'Active' : 'Inactive'}</button></td>
                    <td>{slide.order}</td>
                    <td><div className="action-btns"><button className="edit-btn" onClick={() => { setEditingSlider(slide); setSliderForm(slide); setImagePreview(slide.image); setShowSliderModal(true); }}><i className="ri-edit-line"></i></button><button className="delete-btn" onClick={() => deleteSlider(slide.id)}><i className="ri-delete-bin-line"></i></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Categories Section */}
      {activeTab === 'categories' && (
        <div className="admin-table">
          <div className="table-header">
            <h2>Food Categories (Home Page)</h2>
            <button className="add-btn" onClick={() => { setEditingCategory(null); setCategoryForm({ nameEn: '', nameAm: '', descriptionEn: '', descriptionAm: '', image: '', icon: 'ri-restaurant-line', order: 0, isActive: true }); setImagePreview(''); setShowCategoryModal(true); }}>
              <i className="ri-add-line"></i> Add Category
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr><th>Image</th><th>Name (EN)</th><th>Name (AM)</th><th>Description</th><th>Status</th><th>Order</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {categories.sort((a,b) => a.order - b.order).map(cat => (
                  <tr key={cat.id}>
                    <td><img src={cat.image} alt={cat.nameEn} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td>{cat.nameEn}</td>
                    <td>{cat.nameAm}</td>
                    <td>{language === 'en' ? cat.descriptionEn?.substring(0, 30) : cat.descriptionAm?.substring(0, 30)}...</td>
                    <td><button onClick={() => toggleCategoryActive(cat.id)} style={{ background: cat.isActive ? '#27ae60' : '#e74c3c', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer' }}>{cat.isActive ? 'Active' : 'Inactive'}</button></td>
                    <td>{cat.order}</td>
                    <td><div className="action-btns"><button className="edit-btn" onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setImagePreview(cat.image); setShowCategoryModal(true); }}><i className="ri-edit-line"></i></button><button className="delete-btn" onClick={() => deleteCategory(cat.id)}><i className="ri-delete-bin-line"></i></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Slider Modal */}
      {showSliderModal && (
        <div className="modal-overlay" onClick={() => setShowSliderModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{editingSlider ? 'Edit Slide' : 'Add Slide'}</h3><button onClick={() => setShowSliderModal(false)}><i className="ri-close-line"></i></button></div>
            <form onSubmit={handleSliderSubmit}>
              <div className="modal-body">
                <input type="text" placeholder="Title (English)" value={sliderForm.titleEn} onChange={e => setSliderForm({...sliderForm, titleEn: e.target.value})} required />
                <input type="text" placeholder="Title (Amharic)" value={sliderForm.titleAm} onChange={e => setSliderForm({...sliderForm, titleAm: e.target.value})} />
                <input type="text" placeholder="Subtitle (English)" value={sliderForm.subtitleEn} onChange={e => setSliderForm({...sliderForm, subtitleEn: e.target.value})} />
                <input type="text" placeholder="Subtitle (Amharic)" value={sliderForm.subtitleAm} onChange={e => setSliderForm({...sliderForm, subtitleAm: e.target.value})} />
                <input type="text" placeholder="Image URL" value={sliderForm.image} onChange={e => { setSliderForm({...sliderForm, image: e.target.value}); setImagePreview(e.target.value); }} required />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }} />}
                <input type="number" placeholder="Order (lower number appears first)" value={sliderForm.order} onChange={e => setSliderForm({...sliderForm, order: parseInt(e.target.value)})} />
                <label><input type="checkbox" checked={sliderForm.isActive} onChange={e => setSliderForm({...sliderForm, isActive: e.target.checked})} /> Active (show on homepage)</label>
              </div>
              <div className="modal-footer"><button type="button" onClick={() => setShowSliderModal(false)}>Cancel</button><button type="submit">Save</button></div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{editingCategory ? 'Edit Category' : 'Add Category'}</h3><button onClick={() => setShowCategoryModal(false)}><i className="ri-close-line"></i></button></div>
            <form onSubmit={handleCategorySubmit}>
              <div className="modal-body">
                <input type="text" placeholder="Name (English)" value={categoryForm.nameEn} onChange={e => setCategoryForm({...categoryForm, nameEn: e.target.value})} required />
                <input type="text" placeholder="Name (Amharic)" value={categoryForm.nameAm} onChange={e => setCategoryForm({...categoryForm, nameAm: e.target.value})} required />
                <textarea placeholder="Description (English)" value={categoryForm.descriptionEn} onChange={e => setCategoryForm({...categoryForm, descriptionEn: e.target.value})} rows="2"></textarea>
                <textarea placeholder="Description (Amharic)" value={categoryForm.descriptionAm} onChange={e => setCategoryForm({...categoryForm, descriptionAm: e.target.value})} rows="2"></textarea>
                <input type="text" placeholder="Image URL" value={categoryForm.image} onChange={e => { setCategoryForm({...categoryForm, image: e.target.value}); setImagePreview(e.target.value); }} required />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }} />}
                <select value={categoryForm.icon} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})}>
                  <option value="ri-restaurant-line">Restaurant</option>
                  <option value="ri-pizza-line">Pizza</option>
                  <option value="ri-hamburger-line">Burger</option>
                  <option value="ri-cup-line">Drink</option>
                  <option value="ri-sun-line">Breakfast</option>
                  <option value="ri-fire-line">Spicy</option>
                </select>
                <input type="number" placeholder="Order" value={categoryForm.order} onChange={e => setCategoryForm({...categoryForm, order: parseInt(e.target.value)})} />
                <label><input type="checkbox" checked={categoryForm.isActive} onChange={e => setCategoryForm({...categoryForm, isActive: e.target.checked})} /> Active (show on homepage)</label>
              </div>
              <div className="modal-footer"><button type="button" onClick={() => setShowCategoryModal(false)}>Cancel</button><button type="submit">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeSettings;
