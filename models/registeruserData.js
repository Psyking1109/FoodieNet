const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['User','Restaurent'],
        default:'User'
    },

})

module.exports = mongoose.model('User',UserSchema)