const express = require('express')


const {
    CreateMenu,
    deleteItem,
    updateProduct,
    Bookingregecting,
    bookings
} = require('../controller/restaurentProfile')

const {
    authenticateUser
}=require('../controller/entryControler')



const restaurantProfileRouter = express.Router()


// Create Menu
restaurantProfileRouter.post('/createMenu',authenticateUser(['Restaurant']),CreateMenu)

//Delete Menu
restaurantProfileRouter.delete('/:id/deleteMenu',authenticateUser(['Restaurant']),deleteItem)

//Update Products
restaurantProfileRouter.patch('/:id/deleteMenu',authenticateUser(['Restaurant']),updateProduct)

//Booking Rejection
restaurantProfileRouter.patch('/:reservationId/rejectBooking',authenticateUser(['Restaurant']),Bookingregecting)

//View All bookings
restaurantProfileRouter.get('/allBookings',bookings)



module.exports = restaurantProfileRouter