const express = require('express')
const router = express.Router();
const ApplicantDetail = require('../model/ApplicantDetail')
const auth = require('../middleware/auth')


router.post('/applicantDetails/', auth, async (req, res)=>{
    
    const detail = new ApplicantDetail({
        ...req.body,
        detail: req.user._id
    } );
        
    try{

        await detail.save();
        res.status(201).send(detail)

    }catch(e){
        res.send(e)
    }

});


router.patch('/applicantDetails/:id', auth, async (req, res)=>{

        let updates = Object.keys(req.body)
        let _id = req.params.id
        let allowedParams = ['firstName', 'otherNames', 'lastName', 'occupation', 'address', 'fatherName', 
        'fatherAddress','fatherEmail','motherEmail' , 'fatherPhone', 'motherName', 'motherAddress', 'motherPhone' ]
        let isValid =  updates.every((update)=> allowedParams.includes(update));
        

        try{

        if(!isValid){
            res.status(401).send({'message' : 'Invalid inputs'})
        }else{
            let details = await ApplicantDetail.findOne({_id, applicant: req.user._id}) 
           if(!details){
                res.status(404).send({message: "User not Found"})
           }else{


            updates.forEach(update=>details[update] = req.body[update])
            
            await details.save()


            res.status(200).send({'message': 'Applicant details updated '})
           }
            


        }


        }catch(e){
            console.log(e)
            res.status(417).send(e)
        }


});

module.exports = router
