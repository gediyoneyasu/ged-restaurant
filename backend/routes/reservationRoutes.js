const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createReservation, getUserReservations, getAllReservations, updateReservationStatus, deleteReservation } = require('../controllers/reservationController');

router.post('/', protect, createReservation);
router.get('/my-reservations', protect, getUserReservations);
router.get('/all', protect, admin, getAllReservations);
router.put('/:id/status', protect, admin, updateReservationStatus);
router.delete('/:id', protect, deleteReservation);

module.exports = router;
