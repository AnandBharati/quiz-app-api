const router = require('express').Router();
const mongoose = require('mongoose');
const loginModule = require('../models/login');


router.get('/allUser',(req, res)=>{
    try {
        loginModule.find({},(err, doc)=>{
            !err ? res.status(200).json(doc) : res.status(202).json('cannot find users');
        })
    } catch (error) {
        res.status(404);
    }
})


module.exports = router;