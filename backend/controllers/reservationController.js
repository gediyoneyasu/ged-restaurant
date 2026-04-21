const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, requests } = req.body;
    const reservation = await Reservation.create({ name, email, phone, date, time, guests, occasion, requests, user: req.user.id });
    res.status(201).json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    reservation.status = status;
    await reservation.save();
    res.json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    await reservation.deleteOne();
    res.json({ success: true, message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReservation, getUserReservations, getAllReservations, updateReservationStatus, deleteReservation };
