const express = require('express')
const router = express.Router()
const Program = require('../model/Program')
const auth  = require('../middleware/auth')
const ApplicantProgram = require('../model/ApplicantProgram')

    

router.post('/program', auth,  async (req, res)=>{

    let program = new Program(req.body)
    try{
        await  program.save()
        res.status(201).send(program)
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
            const programs = await  Program.find()
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
            res.status(200).send({'message': 'Program deleted successfully'})

        }


    }catch(e){

        res.status(417).send(e)

    }


})

module.exports = router
