const express = require('express')

const {
    registerUser,
    login
} = require('../controller/entryControler')

const userRouter = express.Router()

//Register User
userRouter.post('/register',registerUser)

//Login
userRouter.get('/login',login)





module.exports = userRouter