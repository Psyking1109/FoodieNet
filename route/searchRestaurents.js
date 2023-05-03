const express = require('express')


const {
    showCombos
} = require('../controller/restaurentselectController')



const searchRouter = express.Router()


// Search Restaurents
searchRouter.get('/searchrestaurant',showCombos)



module.exports = searchRouter