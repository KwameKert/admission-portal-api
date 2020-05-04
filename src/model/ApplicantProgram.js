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
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})


const ApplicantProgram = mongoose.model('ApplicantProgram', applicantProgramSchema);

module.exports = ApplicantProgram