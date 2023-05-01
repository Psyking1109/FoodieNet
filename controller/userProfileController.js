const mongoose = require('mongoose')

const userData = require('../models/userData')
const restaurentData = require('../models/restaurentData')



const profile = async(req,res)=>{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No User"})
    }

    const User = await userData.findById(id)

    User.contacts.push({
        contactNumber:req.body.contactNumber
    })
    User.budgets.push({
        solo:req.body.solo,
        duo:req.body.duo,
        trio:req.body.trio,
    })

    await User.save()
}

const updateProfile = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such user"})
    }
    const user = await userData.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!user){
        return res.status(404).json({error:"No such Profile"})
    }
    res.status(202).json(user)
}

module.exports = {
    profile,
    updateProfile
}