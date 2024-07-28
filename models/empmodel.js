const mongoose=require('mongoose')

const empSchema=new mongoose.Schema({
    Name: {
        type: String,
        required: true, 
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
    },
    Mobile: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },

    Course: [
        {
            type: String,
            required: true,
        },
    ],
    Img: {
        type:String,
        
    },
}, {
    timestamps: true, 
    versionKey: false, 
});;
const empmodel=mongoose.model('emps',empSchema)
module.exports=empmodel;