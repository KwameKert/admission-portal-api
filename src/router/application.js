const express = require('express')
const router = express.Router();
const Application = require('../model/ApplicantProgram')
const Program = require('../model/Program')
const Applicant = require('../model/User')
const auth = require('../middleware/auth')



//get all applications
router.get('/applications', auth, async (req, res) =>{
    
    try{
        let applications = await  Application.find({}).populate(['program', 'applicant', 'details']).exec()
        res.status(200).send({message: 'Applications found', data: applications})

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
        res.status(400).send({ error: e.message })
    
    }

})

//get my applications
router.get('/myapplications', auth, async (req, res) =>{

    try{
        
        let ownerId = req.user._id

        let applications = await Application.find({applicant: ownerId}).populate('program').exec()

        res.status(200).send({data: applications, message: 'Applications found'})

    }catch(e){
        res.status(400).send({ error: e.message })
    }

})


//view application
router.get('/application/:id', auth, async( req, res )=>{
    
        let id = req.params.id
        
        try{
            let application = await Application.findOne({_id: id})
            let program = await Program.findOne({_id: application.program})
            let applicant = await Applicant.findOne({ _id: application.applicant }).populate('details').exec()
            

            res.status(200).send({data: {program, applicant, application }, message: 'Application found'})

        }catch(e){
            res.status(400).send({error: e.message})
        }


})

//update application
router.patch('/application/:id', auth, async(req, res) =>{

    let id = req.params.id

    try{
        
        let application = await Application.findOne({_id: id})
        application.status = req.body.status

        await application.save();

        res.status(200).send({data: application, message: 'Application updated '});

    }catch(e){
        
        res.status(400).send({error: e.message})
    }
})






module.exports = router    

