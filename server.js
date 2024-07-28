const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const emproutes=require('./routes/emproutes');
const adminroutes=require('./routes/adminroutes');
const bodyParser = require('body-parser');
const path = require('path');
const adminmodel=require("./models/adminmodel");

const db=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1/emp");
        console.log("connected");
    } catch (error) {
        console.log(error);
    }

}
db();
///create a default admin//
const admins_signup=async(req,res)=>{
    const adminEmail = 'admin@example.com';

   try {
       const user=await adminmodel.findOne({Email:adminEmail});
       if(user){
         return console.log('adminpresent'); 
       }
       await adminmodel.create({Name:'pabitra',Email:adminEmail,Password:"123456"});
         
       console.log("admincreated"); 
   } catch (error) {
       console.log(error); 
    
   }
}

admins_signup();



const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/vi",emproutes);
app.use("/api/vi",adminroutes);

app.get("/",(req,res)=>{
    res.send("ok")
}).listen(8000,()=>{
    console.log("server run"); 
})