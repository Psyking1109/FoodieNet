const express = require('express')


const {
    getRestaurentByBudget
} = require('../controller/restaurentselectController')



const searchRouter = express.Router()


// Search Restaurents
searchRouter.get('/searchrestaurant',getRestaurentByBudget)



module.exports = searchRouter