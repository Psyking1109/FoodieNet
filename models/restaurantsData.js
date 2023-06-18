const mongoose = require('mongoose')

const Schema = mongoose.Schema
const RestaurentSchema = new Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId
    },
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
    }],
    review:[{
        comment:{
            type:String
        },
        UserID:{
            type:mongoose.Schema.Types.ObjectId
        }
    }],
    reservations:[{
        customer:{
            type:mongoose.Schema.Types.ObjectId
        },
        numberofPeople:{
            type:Number
        },
        reservationDate:{
            type:Date
        },
        status:{
            type:String,
            emun:['copmleted','canceled','pending','rejected']
        }
    }],

})

module.exports = mongoose.model('Restaurent', RestaurentSchema);