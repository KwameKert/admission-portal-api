const express = require('express')
const router = express.Router();
const Transaction = require('../model/Transaction')
const auth = require('../middleware/auth')

//get transactions
router.get('/transactions', auth, async (req, res)=>{
    
    try{

        let transactions = await Transaction.find({}).populate('application').exec()

        res.status(200).send({data: transactions, message: 'Transactions found'})

    }catch(e){
        res.status(417).send({error: e.message})
    }

})



module.exports = router
