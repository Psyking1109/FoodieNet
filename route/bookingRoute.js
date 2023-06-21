const express = require('express')

const {
    booking,
    cancelation
} = require('../controller/restaurentBookings')


const bookingRouter = express.Router();

//Book Restaurent
bookingRouter.post('/:RestaurantId/bookRestaurant',booking)

//Cancel Reservation
bookingRouter.patch('/:restaurantId/:reservationId/cancelBooking',cancelation)

module.exports = bookingRouter