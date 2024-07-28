const adminmodel=require('../models/adminmodel');

//admin signin//
const admin_signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const admin=await adminmodel.findOne({Email:email});
        if(!admin){
            res.status(404).send({message:"admin not found"})
        }else{
            if(admin.Password==password){
                res.status(200).send({message:"loginsuccessfully",success:true,admin});
            }else{
                res.status(201).send({message:"invalid password"});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"server error"});
    }
}
module.exports=admin_signin;