const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApplicantDetail = require('./ApplicantDetail')
//user schema

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email: {
     type: String,
     required: true,
     unique: true,
     trim:true,
     lowercase: true,
     validate(value) {
         if(!validator.isEmail(value)){
             throw new Error('Email is invalid')
         }
     }
    },
    role : {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Please choose another password')
            }
        }
    },
    tokens: [
        {
            token : {
                type: String, 
                required: true
            }
        }
    ],
     

})


userSchema.virtual('details', {

    ref: 'ApplicantDetail',
    localField: '_id',
    foreignField: 'detail'
})

userSchema.virtual('programs', {

    ref: 'ApplicantProgram',
    localField: '_id',
    foreignField: 'applicant'

}) 


//hiding data 
userSchema.methods.toJSON = function() {

    const user = this

    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject;
}



userSchema.methods.generateUserToken = async function() {

    const user = this

    const token = jwt.sign({ _id: user._id.toString() },'tasksecret',{expiresIn: 60 * 60})

     user.tokens = user.tokens.concat({token})

     await user.save()

    return token;
}

userSchema.statics.findByCredentials = async (username, password)=>{

    const user = await User.findOne({username})
    if(!user){
        throw new Error("Email incorrect")
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid credentials")
    }

    return user;
}


userSchema.pre('save', async function(next) {

    const user = this

    if(user.isModified('password')){
        
        user.password = bycrypt.hashSync(user.password, 8);
    }
    
    next()
})



userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

//creating user model 
const User = mongoose.model('User', userSchema)



module.exports = User
 
