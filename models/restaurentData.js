const mongoose = require('mongoose')

const Schema = mongoose.Schema
const RestaurentSchema = new Schema({
    restaurentName:{
        type:String,
        required:true
    },
    contacts:[{
        contactType:{
            type:String
        },
        contactNumber:{
            type:String
        },
        emailId:{
            type:String,
            required:true
        }
    }],
    menu :[{
        item:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            enum:['Main_course','sidedish','starter','desert','beverage','setmenu'],
            required:true
        },
        description:{
            type:String
        },
        serves:{
            type:Number,
            required:true
        }
    }]

})

module.exports = mongoose.model('Restaurent', RestaurentSchema);