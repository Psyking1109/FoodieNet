require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserRoute = require('./route/entry')
const RestaurentProfileRouter = require('./route/restaurantProfile')
const RestaurentSearchRouter = require('./route/searchRestaurents')


app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})


app.use('/api/user',UserRoute)
app.use('/api/restaurentProfile',RestaurentProfileRouter)
app.use('/api/restaurentSearch',RestaurentSearchRouter)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
})
.catch((error)=>{
    console.log(error)
})