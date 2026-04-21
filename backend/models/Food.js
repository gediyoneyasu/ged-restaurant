const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameAm: { type: String, required: true },
  descriptionEn: { type: String, default: '' },
  descriptionAm: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, default: '' },
  isPopular: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },  // This is for stock
  isActive: { type: Boolean, default: true },     // NEW: Admin controls visibility on frontend
  preparationTime: { type: Number, default: 15 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Food', foodSchema);
