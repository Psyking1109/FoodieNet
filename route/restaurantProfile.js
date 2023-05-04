const express = require('express')


const {
    CreateMenu,
   deleteItem,
   updateProduct
} = require('../controller/restaurentProfile')




const restaurantProfileRouter = express.Router()


// Create Menu
restaurantProfileRouter.post('/:id/createMenu',CreateMenu)


module.exports = restaurantProfileRouter