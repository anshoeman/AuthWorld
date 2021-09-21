const mongoose = require('mongoose');
const db = "mongodb+srv://anshuman2002:anshuman2002@cluster0.gnebx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectDB = async()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true
        })
    console.log('mongodb connected');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;