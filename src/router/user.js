const express = require('express');
const router = new express.Router()
const User = require('../model/User')
const auth = require('../middleware/auth')
const ApplicantDetail = require('../model/ApplicantDetail')


router.post('/users',async (req,res)=>{

    const user = new User(req.body);

    try {
        //check for existing applicants
        users = await  User.find({email: user.email})

        //save if email doesnt exists else return error
        if(users.length < 1){
        
            await user.save()
            const token = await user.generateUserToken();
            res.status(201).send({user, token, message: "User added succesfully "})
        
        }else{

            res.status(401).send({error: "Email exists"})

        }
    }catch(e) {
        res.status(402).send({error: e.message})
    }
 
})


//get all users
router.get('/users',auth, async (req,res)=>{

    try{
        const users =  await User.find()
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
 
})

//get all Applicants
router.get('/users/applicants', auth, async (req, res) =>{

    try{
        const applicant = await  User.find({role: 'applicant'}).populate('details').exec()
      //  const applicants = await User.find({role: 'applicant'}).populate('details').exec();
        // const apps = await ApplicantDetail.find().populate().exec()

        res.send(applicant)

    }catch(e){
        console.log(e)
        res.status(417).send({error: 'Oops an error occured'})
    }

});


//logout users
router.get('/users/logout', auth, async (req, res)=>{

    try{

        req.user.tokens = req.user.tokens.filter((tokenObj)=>{
            return tokenObj.token !== req.token
        })

       
         req.user.save();

        res.status(200).send({message: 'User logged out'})

    }catch(e){
        res.status(500).send({error: 'Oops an error occured'})
    }

})


//logout user from all sesssions
router.get('/users/logoutAll', auth, async (req,res)=>{

    try{
        req.user.tokens = []

         req.user.save()
         res.status(200).send({message: 'logged out from all sessions'})

    }catch(e){

        res.status(417).send({error: 'Expectation failed'})
    }
})


router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send("User does not exist")
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedParams = ['name','email','role','password']
    const isValid = updates.every((update)=> allowedParams.includes(update))

    try {
      
    if(!isValid){
        return res.status(403).send({"error": "Invalid parameters"})
    }else{

        const user = req.user
        updates.forEach(update => user[update] = req.body[update] );

        user.save()

        res.send(user)
    }
    }catch(e){
        res.status(500).send(e)
    }
   
})





//user login
router.post('/users/login', async (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await User.findByCredentials(username, password)
        const token = await user.generateUserToken();
        res.status(200).send({user, token});

    }catch(e) {
     
        res.status(417).send({message: 'Invalid credentials'})
    }
})

module.exports = router
