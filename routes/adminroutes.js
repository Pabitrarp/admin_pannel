const express=require('express');
const admincontroller = require('../controller/admincontroller');

const router=express.Router();
router.post("/adminsignin",admincontroller);

module.exports=router;