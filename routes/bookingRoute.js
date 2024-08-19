const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
const {driverAuth, adminAuth, userAuth} = require('../middleware/auth');

router.post('/UserBooking', bookingController.createBooking)
router.get('/BookingData', driverAuth, bookingController.getAllBooking)
// router
//     .route('/')
//     .post(bookingController.createBooking)
    // .get(bookingController.getAllBookings);

router
    .route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);

module.exports = router;