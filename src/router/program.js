const express = require('express')
const router = express.Router()
const Program = require('../model/Program')
const auth  = require('../middleware/auth')


router.post('/program', auth,  async (req, res)=>{

    let program = new Program(req.body)


    try{

        await  program.save()

        res.send(201).send(program)

    }catch(e){
        res.send(417).send(e)
    }


});
