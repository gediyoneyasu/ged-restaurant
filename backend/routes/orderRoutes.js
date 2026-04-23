const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus, verifyChapaPayment } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.post('/chapa/verify', protect, verifyChapaPayment);
router.get('/my-orders', protect, getUserOrders);
router.get('/all', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
