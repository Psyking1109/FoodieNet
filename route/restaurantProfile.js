const express = require('express')


const {
    CreateMenu,
    deleteItem,
    updateProduct,
    Bookingregecting,
    bookings
} = require('../controller/restaurentProfile')




const restaurantProfileRouter = express.Router()


// Create Menu
restaurantProfileRouter.post('/:id/createMenu',CreateMenu)

//Delete Menu
restaurantProfileRouter.delete('/:id/deleteMenu',deleteItem)

//Update Products
restaurantProfileRouter.patch('/:id/deleteMenu',updateProduct)

//Booking Rejection
restaurantProfileRouter.patch('/:username/rejectBooking',Bookingregecting)

//View All bookings
restaurantProfileRouter.get('/allBookings',bookings)



module.exports = restaurantProfileRouter