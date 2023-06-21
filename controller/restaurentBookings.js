const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const restaurentData = require('../models/restaurantsData')


const getUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]
    let userName = ''
    if (!token) {
        console.log("Not a token")
      return res.status(401).json({ error: 'Authorization token not provided' });
    }
    try {
      jwt.verify(token,'secretKey' ,(err ,data)=>{
        if(err) console.log(err)
        if(!data){
            console.log("There aint no shit in it")
        }
        userName = data.username      
      });                
      return userName; 
    } catch (error) {
      return res.status(401).json({ error: 'Invalid authorization token' });
    }
  };


const booking = async(req,res) =>{
    const username = await getUser(req,res)
    const {RestaurantId} = req.params
    if(!mongoose.Types.ObjectId.isValid(RestaurantId)){
        return res.status(404).json({error:"No restaurent"})
    }
    const restaurent = await restaurentData.findById(RestaurantId)
    console.log("restaurant ",restaurent)
try{ restaurent.reservations.push({
    customer:username,
    numberofPeople:req.body.numberofPeople,
    reservationDate:req.body.date,
    status:'pending'
})
await restaurent.save()
res.status(200).send("Booked Succesfully !!")
}catch(err){
    res.status(500).send('Server error');
}  
}

const cancelation = async(req,res) =>{
    //const username = await getUser(req,res)
    const {reservationId , restaurantId} = req.params
    if(!mongoose.Types.ObjectId.isValid(restaurantId)){
        return res.status(404).json({error:"No restaurent"})
    }
    try{
    const restaurant = await restaurentData.findOneAndUpdate(
        {"_id":restaurantId , 'reservations._id':reservationId},
        {$set:{'reservations.$.status':'canceled'} },
        { new: true }
        )
    if(!restaurant){
        return res.status(404).json({error:"No record found"})
    }
    await restaurant.save()
    res.status(202).json("Revervation cancelled !!")
}catch(err){
     res.status(500).send('Server error');
}
}


module.exports = {
    booking,
    cancelation
}