const mongoose = require('mongoose')
const Schema  = mongoose.Schema



const transactionModel = new Schema({
    
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicantProgram',
        required: true
    },
    user: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})



const Transaction = mongoose.model('Transaction', transactionModel);

module.exports = Transaction
