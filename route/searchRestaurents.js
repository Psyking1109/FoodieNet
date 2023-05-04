const express = require('express')


const {
    showCombos,
    reviews
} = require('../controller/restaurentselectController')


const {
    authenticateUser
} = require('../controller/entryControler')

const searchRouter = express.Router()


// Search Restaurents
searchRouter.get('/searchrestaurant',showCombos)
searchRouter.post('/comment/:id',reviews)



module.exports = searchRouter