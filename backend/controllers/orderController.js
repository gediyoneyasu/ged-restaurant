const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryFee, tax, grandTotal, orderType, paymentMethod, deliveryAddress, customerName, customerPhone, customerEmail } = req.body;
    
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const order = await Order.create({
      orderNumber,
      user: req.user.id,
      items,
      totalAmount,
      deliveryFee,
      tax,
      grandTotal,
      orderType,
      paymentMethod,
      deliveryAddress,
      customerName,
      customerPhone,
      customerEmail
    });
    
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.orderStatus = status;
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus };
