const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const connectDB = require('./config/db');
const flash = require('connect-flash');
const passport = require('passport');
//Passport config
require('./config/passport')(passport);

connectDB();
//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  //Connect-flash
app.use(flash());

//Global variables

app.use((req,res,next)=>{
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
})

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//Ejs
app.set('view engine','ejs');
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server starts at port ${PORT}`)});