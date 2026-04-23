const Order = require('../models/Order');
const axios = require('axios');

const CHAPA_BASE_URL = 'https://api.chapa.co/v1';

const initializeChapaPayment = async (order) => {
  if (!process.env.CHAPA_SECRET_KEY) {
    throw new Error('CHAPA_SECRET_KEY is missing on server');
  }

  if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is missing on server');
  }

  const txRef = `ged-${order.orderNumber}-${Date.now()}`;
  const returnUrl = `${process.env.FRONTEND_URL}/checkout?payment=chapa&orderId=${order._id}&tx_ref=${txRef}`;

  const payload = {
    amount: String(order.grandTotal),
    currency: 'ETB',
    email: order.customerEmail,
    first_name: order.customerName,
    phone_number: order.customerPhone,
    tx_ref: txRef,
    callback_url: returnUrl,
    return_url: returnUrl,
    customization: {
      title: 'Ged Restaurant Payment',
      description: `Payment for order ${order.orderNumber}`
    }
  };

  const response = await axios.post(`${CHAPA_BASE_URL}/transaction/initialize`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const chapaData = response.data?.data;
  if (!chapaData?.checkout_url) {
    throw new Error('Failed to get Chapa checkout URL');
  }

  return {
    checkoutUrl: chapaData.checkout_url,
    txRef
  };
};

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

    if (paymentMethod === 'chapa') {
      const chapa = await initializeChapaPayment(order);
      return res.status(201).json({
        success: true,
        order,
        payment: {
          provider: 'chapa',
          checkoutUrl: chapa.checkoutUrl,
          txRef: chapa.txRef
        }
      });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyChapaPayment = async (req, res) => {
  try {
    const { orderId, txRef } = req.body;

    if (!orderId || !txRef) {
      return res.status(400).json({ success: false, message: 'orderId and txRef are required' });
    }

    if (!process.env.CHAPA_SECRET_KEY) {
      return res.status(500).json({ success: false, message: 'CHAPA_SECRET_KEY is missing on server' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const response = await axios.get(`${CHAPA_BASE_URL}/transaction/verify/${txRef}`, {
      headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` }
    });

    const paymentStatus = response.data?.data?.status;
    if (paymentStatus === 'success') {
      order.paymentStatus = 'paid';
      order.orderStatus = order.orderStatus === 'pending' ? 'confirmed' : order.orderStatus;
      await order.save();
      return res.json({ success: true, order, paymentStatus });
    }

    order.paymentStatus = 'failed';
    await order.save();
    return res.status(400).json({ success: false, order, paymentStatus: paymentStatus || 'failed' });
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

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  verifyChapaPayment
};
