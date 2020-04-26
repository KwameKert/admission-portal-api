const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req,res, next) =>{
    try{
        const token = req.header("Authorization").replace('Bearer ', '');
        const decoded = await jwt.verify(token, 'tasksecret');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(user){
            req.user = user
            req.token = token
        }else{
            throw new Error();
        }
       

    }catch(e){
        res.status(401).send("{error: 'Please authenticate ' }")
    }
    next()
}


module.exports = auth