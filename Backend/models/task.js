const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String, // or Date if you want native Date support
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);