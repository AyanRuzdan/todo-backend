const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim:true
    },
    priority:{
        type: Number,
        required: true,
        default:1,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    completed:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Task', taskSchema)