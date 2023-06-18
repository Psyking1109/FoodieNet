const mongoose = require('mongoose')
const restaurentData = require('../models/restaurantsData')
const jwt = require('jsonwebtoken')
const { json } = require('express')


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
      const restaurantId = await restaurentData.findOne({ 'userID': userName });
      if (!restaurantId) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
     const restID = restaurantId._id.toString()
      console.log("rest ID - ",restID)
      return restID; 
    } catch (error) {
      return res.status(401).json({ error: 'Invalid authorization token' });
    }
  };
  
  


  const CreateMenu = async (req, res) => {
    try {
      const id  = await getUser(req, res);
      console.log("id - ", id)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No restaurant' });
      }
      const restaurent = await restaurentData.findById(id);
  
      restaurent.menu.push({
        item: req.body.item,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        serves: req.body.serves
      });
  
      await restaurent.save();
      console.log(restaurent.menu);
  
      res.status(200).json({ message: 'Menu item created successfully' });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  

const deleteItem = async (req, res) => {
    const  id  = await getUser(req, res);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Product" })
    }
    const item = await restaurentData.findOneAndDelete({ _id: id })
    if (!item) {
        return res.status(404).json({ error: "No Such Product" })
    }
    res.status(200).json(item)
}

const bookings = async (req, res) => {
    const  id  = await getUser(req, res);
    try {
        const restaurent = await restaurentData.findById(id).select('reservations');
        res.status(200).json(restaurent)
    } catch (err) {
        return res.status(404).json({ error: "No such reservations" })
    }
}

const updateProduct = async (req, res) => {
    const id  = await getUser(req, res);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Product" })
    }
    const item = await restaurentData.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!item) {
        return res.status(404).json({ error: "No such Products" })
    }
    res.status(202).json(item)
}

const Bookingregecting = async (req, res) => {
    const username = req.params
    const  RestaurantId  = await getUser(req, res);
    if (!mongoose.Types.ObjectId.isValid(RestaurantId)) {
        return res.status(404).json({ error: "No restaurent" })
    }
    const restaurant = await restaurentData.findOneAndUpdate(
        { 'reservations.customer': username },
        { $set: { 'reservations.$.status': 'rejected' } },
        { new: true }
    )
    if (!restaurant) {
        return res.status(404).json({ error: "No record found" })
    }
    res.status(202).json(restaurant)
}

module.exports = {
    CreateMenu,
    deleteItem,
    updateProduct,
    Bookingregecting,
    bookings
}