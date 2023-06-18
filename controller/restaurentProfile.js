const mongoose = require('mongoose')
const restaurentData = require('../models/restaurantsData')
const { json } = require('express')


const getUser = async () => {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, 'secretKey');
    const restaurantId = restaurentData.findOne({ 'userID': decodedToken.username })
    return restaurantId

}


const CreateMenu = async (req, res) => {
    const { id } = await getUser()
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No restaurent" })
    }
    const restaurent = await restaurentData.findById(id)

    restaurent.menu.push({
        item: req.body.item,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        serves: req.body.serves
    })
    await restaurent.save();
    res.status(200).json({ message: "Menu item created successfully" })
    console.log(restaurent.menu)
}

const deleteItem = async (req, res) => {
    const { id } = await getUser()
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
    const { id } = await getUser()
    try {
        const restaurent = await restaurentData.findById(id).select('reservations');
        res.status(200).json(restaurent)
    } catch (err) {
        return res.status(404).json({ error: "No such reservations" })
    }
}

const updateProduct = async (req, res) => {
    const { id } = await getUser()
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
    const { RestaurantId } = await getUser()
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