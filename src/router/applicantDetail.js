const express = require('express')
const router = express.Router();
const ApplicantDetail = require('../model/ApplicantDetail')
const auth = require('../middleware/auth')
const  multer  = require('multer')
const upload = multer({
    dest: 'assets/images',
    limits: {
        fileSize: 2000000
    }

})




router.post('/user/applicantDetails/', auth, upload.single('schoolDocument'),  async (req, res)=>{
  

    const detail = new ApplicantDetail({
        ...req.body,
        owner: req.user._id,
        document_url:`assets/images/${req.file.filename}`
    } );
    
    try{
        await detail.save();
        req.user.isActivated = true;
        await req.user.save()
        res.status(201).send(detail)
    }catch(e){
        console.log(e)
        res.status(401).send()
    }


},(error, req, res, next)=>{
    res.status(400).send({error: error.message})

});


router.patch('/user/applicantDetails/:id', auth, async (req, res)=>{

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
