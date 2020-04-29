const express = require('express')
const router = express.Router();
const StudentDetail = require('../model/StudentDetail')
const auth = require('../middleware/auth')


router.post('/studentDetails/add', async (req, res)=>{
    
    const detail = new StudentDetail(req.body);

    try{

        await detail.save();
        res.status(201).send(detail)

    }catch(e){
        res.send(e)
    }

});


module.exports = router
