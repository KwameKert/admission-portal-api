const mongoose = require('mongoose')
const Schema  = mongoose.Schema



const transactionModel = new Schema({
    
    amount: {
        type: number,
        required: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicantProgram'
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})



const Transaction = new model.Schema('Transaction', transactionModel);

module.exports = Transaction
