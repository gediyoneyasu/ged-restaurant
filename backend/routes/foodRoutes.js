const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  getAllFoods, 
  getPublicFoods,
  getFoodById, 
  getPopularFoods, 
  createFood, 
  updateFood, 
  toggleFoodActive,
  deleteFood 
} = require('../controllers/foodController');

// Public routes (customers) - MUST be before /:id routes
router.get('/public', getPublicFoods);
router.get('/popular', getPopularFoods);

// Admin routes
router.get('/', protect, admin, getAllFoods);
router.post('/', protect, admin, createFood);
router.put('/toggle-active/:id', protect, admin, toggleFoodActive);  // Note: /toggle-active/:id
router.put('/:id', protect, admin, updateFood);
router.delete('/:id', protect, admin, deleteFood);
router.get('/:id', getFoodById);  // Public route for single food

module.exports = router;
