const mongoose = require('mongoose')
const Schema = mongoose.Schema
//applicant detail schema

const applicantDetailSchema = new Schema({
    
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    otherNames: {
        type: String, 
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    fatherName: {
        type: String, 
    },
    fatherAddress: {
        type: String, 
    },
    fatherPhone: {
        type: Number,
    },
    dob: {
        type: Date,
        required: true
    },
    motherName: {
        type: String, 
    },
    motherAddress: {
        type: String, 
    },
    motherPhone: {
        type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    document_url: {
        type: String,
        required: true
    }

},{
    timestamps: true
})

const ApplicantDetail = mongoose.model('ApplicantDetail', applicantDetailSchema)

module.exports = ApplicantDetail 
