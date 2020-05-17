const express = require('express')
const router = express.Router();
const Application = require('../model/ApplicantProgram')
const auth = require('../middleware/auth')



//get all applications

router.get('/applications', auth, async (req, res) =>{
    
    try{

        let applications = await  Application.find({})
        res.status(200).send(applications)

    }catch(e){
        res.status(401).send({error: e.message})
    }


})














module.exports = router    

