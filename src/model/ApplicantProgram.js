const mongoose = require('mongoose')
const Schema = mongoose.Schema


const applicantProgramSchema = new Schema({

   applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    program : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },


    status: {
        type: String, 
        default: 'pending'
        
    },

}, {

    timestamps: true
})


applicantProgramSchema.virtual('transaction', {

    ref: 'Transaction',
    localField: '_id',
    foreignField: 'application'
})

const ApplicantProgram = mongoose.model('ApplicantProgram', applicantProgramSchema);

module.exports = ApplicantProgram
