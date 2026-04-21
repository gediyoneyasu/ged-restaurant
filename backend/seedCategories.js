const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/Category');

const categories = [
  { nameEn: 'Breakfast', nameAm: 'ቁርስ', icon: 'ri-sun-line', order: 1, isActive: true },
  { nameEn: 'Lunch', nameAm: 'ምሳ', icon: 'ri-restaurant-line', order: 2, isActive: true },
  { nameEn: 'Dinner', nameAm: 'እራት', icon: 'ri-moon-line', order: 3, isActive: true },
  { nameEn: 'Traditional', nameAm: 'ባህላዊ', icon: 'ri-history-line', order: 4, isActive: true },
  { nameEn: 'Modern', nameAm: 'ዘመናዊ', icon: 'ri-flashlight-line', order: 5, isActive: true },
  { nameEn: 'Drinks', nameAm: 'መጠጦች', icon: 'ri-cup-line', order: 6, isActive: true },
  { nameEn: 'Fast Food', nameAm: 'ፈጣን ምግብ', icon: 'ri-flashlight-line', order: 7, isActive: true },
  { nameEn: 'Desserts', nameAm: 'ጣፋጭ ምግቦች', icon: 'ri-cake-line', order: 8, isActive: true }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');
    
    // Insert new categories
    const inserted = await Category.insertMany(categories);
    console.log(`✅ Added ${inserted.length} categories:`);
    inserted.forEach(cat => {
      console.log(`   - ${cat.nameEn} (${cat.nameAm})`);
    });
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedCategories();
