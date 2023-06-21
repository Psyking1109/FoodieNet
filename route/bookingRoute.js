const express = require('express')

const {
    booking,
    cancelation
} = require('../controller/restaurentBookings')

const {
    authenticateUser
}=require('../controller/entryControler')

const bookingRouter = express.Router();

//Book Restaurent
bookingRouter.post('/:RestaurantId/bookRestaurant',authenticateUser(['User']),booking)

//Cancel Reservation
bookingRouter.patch('/:restaurantId/:reservationId/cancelBooking',authenticateUser(['User']),cancelation)

module.exports = bookingRouter