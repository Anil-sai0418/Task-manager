const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
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
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    }
}, { timestamps: true });

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel