const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const saltRounds = 10;

const User = require('../models/user');

const env = require('nodemon');


router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length>=1){
          return res.status(409).json({
              message: "mail exists"
          })
        }else{
            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created Successfully',
                            createdUser: result
                        })
                    }).catch(err => {console.log(err);
                    res.status(500).json({
                        error:err
                    });
                
                })
                }
            
    })
    }
    })

    


})

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Authentication failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Authentication failed'
                })
            }
            if(result){
                const token =  jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: 'Authentication successful',
                    token: token
                })
            }
            return res.status(401).json({
                message: 'Authentication failed here'
            })
        })
        
    })
    .catch(err => {console.log(err);
        res.status(500).json({
            error:err
        });
    })
})



module.exports = router;