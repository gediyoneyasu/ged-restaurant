const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameAm: { type: String, required: true },
  icon: { type: String, default: 'ri-restaurant-line' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
