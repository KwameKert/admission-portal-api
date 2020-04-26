const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//user schema

const userSchema = new mongoose.Schema({
    name : {
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

userSchema.statics.findByCredentials = async (email, password)=>{

    const user = await User.findOne({email})

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




//creating user model 
const User = mongoose.model('User', userSchema)



module.exports = User
 