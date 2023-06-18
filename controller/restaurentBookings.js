const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const restaurentData = require('../models/restaurantsData')


const getUser = async() =>{
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, 'secretKey');
    return decodedToken.username
}


const booking = async(req,res) =>{
    const username = await getUser()
    const {RestaurantId} = req.params
    if(!mongoose.Types.ObjectId.isValid(RestaurantId)){
        return res.status(404).json({error:"No restaurent"})
    }
    const restaurent = await restaurentData.findById(id)
try{ restaurent.reservations.push({
    customer:username,
    numberofPeople:req.body.numberofPeople,
    reservationDate:req.body.date,
    status:'pending'
})
await restaurent.save()
}catch(err){
    res.status(500).send('Server error');
}  
}

const cancelation = async(req,res) =>{
    const username = await getUser()
    const {RestaurantId} = req.params.id
    if(!mongoose.Types.ObjectId.isValid(RestaurantId)){
        return res.status(404).json({error:"No restaurent"})
    }
    const restaurant = await restaurentData.findOneAndUpdate(
        {'reservations.customer':username},
        {$set:{'reservations.$.status':'canceled'} },
        { new: true }
        )
    if(!restaurant){
        return res.status(404).json({error:"No record found"})
    }
    res.status(202).json(restaurant)
}


module.exports = {
    booking,
    cancelation
}