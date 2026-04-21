const Food = require('../models/Food');
const Category = require('../models/Category');

// Get all foods for admin (shows ALL foods regardless of isActive)
const getAllFoods = async (req, res) => {
  try {
    const { category, popular, search } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (popular === 'true') filter.isPopular = true;
    if (search) {
      filter.$or = [
        { nameEn: { $regex: search, $options: 'i' } },
        { nameAm: { $regex: search, $options: 'i' } }
      ];
    }
    
    const foods = await Food.find(filter).populate('category', 'nameEn nameAm');
    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get public foods for customers (ONLY shows isActive = true)
const getPublicFoods = async (req, res) => {
  try {
    const { category, popular, search } = req.query;
    let filter = { isActive: true, isAvailable: true };
    
    if (category) filter.category = category;
    if (popular === 'true') filter.isPopular = true;
    if (search) {
      filter.$or = [
        { nameEn: { $regex: search, $options: 'i' } },
        { nameAm: { $regex: search, $options: 'i' } }
      ];
    }
    
    const foods = await Food.find(filter).populate('category', 'nameEn nameAm');
    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category', 'nameEn nameAm');
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
    res.json({ success: true, food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get popular foods (only active ones)
const getPopularFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isPopular: true, isAvailable: true, isActive: true }).limit(6);
    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create food (Admin only)
const createFood = async (req, res) => {
  try {
    const { nameEn, nameAm, descriptionEn, descriptionAm, price, category, isPopular, preparationTime, isActive } = req.body;
    
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ success: false, message: 'Category not found' });
    }
    
    const food = await Food.create({
      nameEn, nameAm, descriptionEn, descriptionAm, price, category, 
      isPopular: isPopular || false,
      preparationTime: preparationTime || 15,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({ success: true, food });
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update food (Admin only)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    
    const { nameEn, nameAm, descriptionEn, descriptionAm, price, category, isPopular, isAvailable, isActive, preparationTime } = req.body;
    
    if (nameEn) food.nameEn = nameEn;
    if (nameAm) food.nameAm = nameAm;
    if (descriptionEn) food.descriptionEn = descriptionEn;
    if (descriptionAm) food.descriptionAm = descriptionAm;
    if (price) food.price = price;
    if (category) food.category = category;
    if (isPopular !== undefined) food.isPopular = isPopular;
    if (isAvailable !== undefined) food.isAvailable = isAvailable;
    if (isActive !== undefined) food.isActive = isActive;
    if (preparationTime) food.preparationTime = preparationTime;
    
    await food.save();
    res.json({ success: true, food });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle food active status (Admin only)
const toggleFoodActive = async (req, res) => {
  try {
    console.log('Toggle active for ID:', req.params.id);
    
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    
    food.isActive = !food.isActive;
    await food.save();
    
    console.log(`Food ${food.nameEn} is now ${food.isActive ? 'ACTIVE' : 'INACTIVE'}`);
    
    res.json({ 
      success: true, 
      food, 
      message: `Food is now ${food.isActive ? 'ACTIVE' : 'INACTIVE'} and ${food.isActive ? 'visible' : 'hidden'} on website`
    });
  } catch (error) {
    console.error('Toggle active error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete food (Admin only)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    await food.deleteOne();
    res.json({ success: true, message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { 
  getAllFoods, 
  getPublicFoods,
  getFoodById, 
  getPopularFoods, 
  createFood, 
  updateFood, 
  toggleFoodActive,
  deleteFood 
};
