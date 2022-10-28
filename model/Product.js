const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'must provide a title']
    },
    desc:{
        type:String,
        required:[true,'please provide desc'],
    },
    img:{
        type:String,
        required:[true,'please provide image'],
    },
    categories:{
        type:Array,
    },
    size:{
        type:String, 
    },
    color:{
        type:String, 
    },
    price:{
        type:Number,
        required:[true,'please provide price'],
    }
   
},
{timestamps: true})

module.exports = mongoose.model('Product',productSchema)