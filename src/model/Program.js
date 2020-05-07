const mongoose = require('mongoose')
const Schema = mongoose.Schema


const programSchema = new Schema({
    
    name: {
        type: String, 
        required: true
    },
    length:{

        type:String,
        required: true
    },
    faculty: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img_url: {
        type: String
    },
    price: {
        type: Number, 
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


programSchema.pre('findOneAndUpdate', function(next){

    const program = this

    program.updatedAt = Date.now

    next()


});

const Program = mongoose.model('Program',programSchema); 

module.exports = Program

