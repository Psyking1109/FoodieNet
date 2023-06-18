const express = require('express')

const {
    booking,
    cancelation
} = require('../controller/restaurentBookings')


const bookingRouter = express.Router();

//Book Restaurent
bookingRouter.post('/:RestaurantId',booking)

//Cancel Reservation
bookingRouter.patch('/:RestaurantId',cancelation)

module.exports = bookingRouter