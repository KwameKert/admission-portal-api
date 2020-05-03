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
        required: false,
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
        required: true
    },
    fatherAddress: {
        type: String, 
        required: true
    },
    fatherPhone: {
        type: Number,
        required: true
    },

    motherName: {
        type: String, 
        required: true
    },
    motherAddress: {
        type: String, 
        required: true
    },
    motherPhone: {
        type: Number,
        required: true
    },
    detail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

const ApplicantDetail = mongoose.model('ApplicantDetail', applicantDetailSchema)

module.exports = ApplicantDetail 
