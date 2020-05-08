const express = require('express')
const router = express.Router()
const Program = require('../model/Program')
const auth  = require('../middleware/auth')
const ApplicantProgram = require('../model/ApplicantProgram')
const mongoose = require('mongoose')
const Transaction = require('../model/Transaction')   

router.post('/program/', auth,  async (req, res)=>{

    let program = new Program(req.body)
    try{
        await  program.save()
        let response = {
            data: program,
            message: 'Program added successfully'
        }
        res.status(201).send(response)
    }catch(e){
        res.send(417).send(e)
    }
});



router.patch('/program/:id', auth,  async (req, res) => {

    const _id = req.params.id
    const updates  = Object.keys(req.body)
    let allowedParams = ['name', 'description', 'price', 'endDate'  ];
    let isValid = updates.every(update=> allowedParams.includes(update))

        if(!isValid){
            res.status(400).send({'message ': 'Invalid update properties '})
            return
        }

    try{
        const program = await  Program.findById(_id);
        if(!program){
            res.status(404).send({'message': 'Program not found'})
            return
        }else{
            updates.forEach((update)=>{
                    program[update] = req.body[update]
            })
            await program.save();
            res.status(200).send({'message': 'Program updated'})
        }
    }catch(e){
        res.send(417).send(e)    

    }


})




//loading all programs

router.get('/program/all', auth,  async (req, res)=>{

        try{
            const programs = await  Program.find({status: {$ne: 'deleted'}})
            res.status(200).send(programs)
        }catch(e){
            res.status(417).send(e)
        }
});


//loading active programs
router.get('/program/active', auth,  async (req, res)=>{

        try{
            const programs = await  Program.find({status: 'active'})
            res.status(200).send(programs)
        }catch(e){
            res.status(417).send(e)
        }

    return
})

router.get('/program/:id', auth, async (req, res)=>{

    const _id = req.params.id

    try{
        const program  = await Program.findById(_id)

        if(!program){
            res.status(400).send({message: 'No program found'})
        }else{

            res.status(200).send({message: 'Program found'})
        }

    }catch(e){
        res.status(417).send({message: 'Snap! something went wrong '})
    }


})


//apply program
router.post('/program/apply', auth, async (req, res) =>{
    
    let application = {
        applicant: req.user._id,
        program: mongoose.Types.ObjectId(req.body.program)
    }


    try{

        let newApplication = new ApplicantProgram(application);
        await  newApplication.save()

        let transaction = new Transaction({application: newApplication._id,amount: req.body.amount })
        await transaction.save()

        res.status(200).send({transaction, application: newApplication, message: 'Application submitted '})
    }catch(e){
        console.log(e)
        res.status(417).send({message: 'Oops an error occured'})
    }

})




//delete program
router.delete('/program/:id', auth, async (req, res ) =>{
    
    const _id = req.params.id

    try{
        const program = await Program.findById(_id)

        if(!program){
            res.status(404).send({'message': 'Program not found'})
        }else{
            program.status = 'deleted'
            await program.save()
            const programs = await  Program.find({status: {$ne: 'deleted'}})
            res.status(200)
                .send({'message': 'Program deleted successfully',
                       'data': programs });

        }


    }catch(e){

        res.status(417).send(e)

    }


})

module.exports = router
