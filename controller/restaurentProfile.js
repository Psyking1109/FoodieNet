const mongoose = require('mongoose')
const restaurentData = require('../models/restaurantsData')


const CreateMenu = async(req,res)=>{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No restaurent"})
    }
    const restaurent = await restaurentData.findById(id)
   
    restaurent.menu.push({
        item:req.body.item,
        price:req.body.price,
        description:req.body.description,
        type:req.body.type,
        serves:req.body.serves
    })
    await restaurent.save();
    res.status(200).json({ message: "Menu item created successfully" })
}

const deleteItem = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such Product"})
    }
    const item = await restaurentData.findOneAndDelete({_id:id})
    if(!item){
        return res.status(404).json({error:"No Such Product"})
    }
    res.status(200).json(item)
}


const updateProduct = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Product"})
    }
    const item = await restaurentData.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!item){
        return res.status(404).json({error:"No such Products"})
    }
    res.status(202).json(item)
}




module.exports = {
   CreateMenu,
   deleteItem,
   updateProduct
}