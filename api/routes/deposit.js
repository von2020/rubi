const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Deposit = require('../models/deposit');
const checkAuth = require('../middleware/auth');


// Handle Incoming Requests to /transfer
router.post('/', checkAuth, (req, res, next) => {

    const deposits = new Deposit({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        amount: req.body.amount
    })

    deposits.save().then(result => {
        console.log('hey',result);
        res.status(201).json({
            message: 'Transfer Successful',
            createdDeposit: result
        })
    }).catch(err => console.log(err));

    
})


// Handle Incomining Requests to /deposit
router.get('/',checkAuth, (req, res, next) => {
    Deposit.find().exec()
    .then( docs => {
        console.log('from db', docs)
        if(docs){
            res.status(200).json(docs)
        }else{
            res.status(404).json({message: "no valid entry found for deposits"})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
})

router.get('/:depositId', checkAuth, (req, res, next) => {
    const id = req.params.depositId;
    Deposit.findById(id).exec()
    .then( doc => {
        console.log('from db', doc)
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message: "no valid entry found for deposit id"})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });


    
})


module.exports = router;