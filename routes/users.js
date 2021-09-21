const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require('passport');
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
//Register Handle

router.post("/register", (req, res) => {
  //Destructuring
  const { name, email, password, password2 } = req.body;
  let errors = [];
  //Check Required Feilds
  if (!name || !email || !password || !password2)
    errors.push({ msg: "Please Fill All The Feilds" });
  //Check If passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords Doesnt match" });
  }
  //check passwords length
  if (password.length < 6) {
    errors.push({ msg: "Enter a password with length more than 6" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation Passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "User Already Exists Please LogIn" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          password2:req.body.password2
        });
        //Hashing Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
                //Set password To hash
              newUser.password = hash;
              //Save The user
              newUser.save()
              .then(user=>{
                  req.flash('success_msg','You are now registered and can login');
                  res.redirect('/users/login')
              })
              .catch(err=>console.log(err));
          })
        );
      }
    });
  }
});


//user login(passport)
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next)
})

//Logout
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You were logged out');
    res.redirect('/users/login');
})
module.exports = router;
