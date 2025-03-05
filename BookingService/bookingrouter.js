const express = require('express');

const routerBooking = express.Router();

const bookingController=require("./bookingcontroller");
routerBooking.post('/bookings', bookingController.createBooking);
routerBooking.get('/bookings/:userId', bookingController.getBookingById);
routerBooking.put('/bookings/:userId',bookingController.updateBooking)

module.exports = routerBooking;