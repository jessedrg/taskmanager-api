const mongoose = require('mongoose')
const validator = require('validator')
const Schema = new mongoose.Schema({
    description:{
        trim:true,
        required:true,
        type:String
    },completed:{
        default:false,
        type:Boolean
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

},{
    timestamps:true
})
const tasks = mongoose.model('Task',Schema)


module.exports = tasks;