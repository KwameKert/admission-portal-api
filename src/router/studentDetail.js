const express = require('express')
const router = express.Router();
const StudentDetail = require('../model/StudentDetail')
const auth = require('../middleware/auth')


router.post('/studentDetails/', auth, async (req, res)=>{
    
    const detail = new StudentDetail({
        ...req.body,
        student: req.user._id});

    try{

        await detail.save();
        res.status(201).send(detail)

    }catch(e){
        res.send(e)
    }

});


router.patch('/studentDetails/:id', auth, async (req, res)=>{

        let updates = req.body
        let _id = req.params.id
        let details = req.body
        let allowedParams = ['first_name', 'other_names', 'last_name', 'occupation', 'address', 'fatherName', 
        'fatherAddress', 'fatherPhone', 'motherName', 'motherAdress', 'motherPhone' ]
        let isValid = updates.every((update)=> allowedParams.includes(update));
        

        if(!isValid){
            res.status(401).send({'message' : 'Invalid inputs'})
        }
        try{

            let detailsFound = await StudentDetail.findOne({_id, student: req.user._id}) 

           if(!detailsFound){
                res.status(404).send({message: "User not Found"})
           } 

            updates.forEach(update=>detailsFound[update] = req.body[update])
            
            await detailsFound.save()

            res.status(200).send({'message': 'Student details updated '})

        }catch(e){
            res.status(417).send(e)
        }


});

module.exports = router
