const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CustomerDataSchema = new Schema({
    UserName:{
        type:String,
        required:true
    },
    contacts:[{
        contactNumber:{
            type:String
        },
        emailId:{
            type:String,
            required:true
        }
    }],
    savedRestaurent :[{
        Name:{
            type:String,
            required:true
        },
        Rating:{
            type:Number,
            required:true
        },
    
    }],
    budgets:[{
        solo:{
            type:number
        },
        duo:{
            type:number
        },
        trio:{
            type:number
        },
        family:{
            type:number
        }
    }]

})

module.exports = mongoose.model('CustomerData',CustomerDataSchema)