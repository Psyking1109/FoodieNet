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
searchRouter.get('/searchrestaurant',authenticateUser(['User']),showCombos)
searchRouter.post('/comment/:id',authenticateUser(['User']),reviews)



module.exports = searchRouter