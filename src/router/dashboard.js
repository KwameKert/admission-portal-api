const express = require('express')
const router = express.Router()
const Application = require('../model/ApplicantProgram')
const Program = require('../model/Program');
const auth = require('../middleware/auth')
const Transaction = require('../model/Transaction')
const Applicant = require('../model/User')




//dashboard components 

router.get('/dashboard', auth, async (req, res) =>{
        
    try{

        let pendingApplications = await  Application.find({status: 'pending'}).countDocuments()
        let approvedApplications = await  Application.find({status: 'approved'}).countDocuments()
        let rejectedApplications = await Application.find({status: 'rejected'}).countDocuments()
        let transactionCount = await Transaction.find({}).countDocuments()
        let transactions = await Transaction.find({});

        console.log(pendingApplications)
        res.status(200).send({
            data: {
                 pending: pendingApplications,
                 approved: approvedApplications,
                 rejected: rejectedApplications,
                 transactionCount: transactionCount, 
                 transactions: transactions
            },
            message: 'Dashboard components loaded'
        })

    }catch(e){
        res.status(417).send({error: e.message})
    }
})



module.exports = router
