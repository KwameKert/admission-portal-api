const mongoose = require('mongoose')
const Schema = mongoose.Schema

//student detail schema

const studentDetailSchema = new Schema({
    
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
    }

})



const StudentDetail = mongoose.model('StudentDetail', studentDetailSchema)

module.exports = StudentDetail 
