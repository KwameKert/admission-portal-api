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
        res.status(500).send({error: e.message})
    }


})


//get all pending applications
router.get('/applications/pending', auth, async (req, res ) => {

    try{

        let applications = await Application.find({status: 'pending'})

        res.status(200).send({data: applications, message: 'Applications found'})
    }catch(e){
        res.status(500).send({ error: e.message })
    
    }

})

//get my applications
router.get('/myapplications', auth, async (req, res) =>{

    try{
        
        let ownerId = req.user._id

        let applications = await Application.find({applicant: ownerId}).populate('program').exec()

        res.status(200).send({data: applications, message: 'Applications found'})

    }catch(e){
        res.status(500).send({ error: e.message })
    }

})











module.exports = router    

