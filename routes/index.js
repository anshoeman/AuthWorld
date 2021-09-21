const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuth} = require('../config/auth');
router.get('/',forwardAuth,(req,res)=>{
    res.render('index');
})


router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        name:req.user.name
    });
})
module.exports = router;