const empmodel = require('../models/empmodel'); 

const emp_signup = async (req, res) => {
    const {name,email,mobile,designation,gender,courses} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const emp = await empmodel.findOne({ Email:email }); 
        if (emp) {
            return res.status(409).send({ message: "Employee exists" });
        }

        const user = await empmodel.create({ Name:name, Email:email, Mobile:mobile, Designation:designation, Gender:gender, Course:courses, Img:image });
        return res.status(200).send({ message: "Employee created", success:true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
///get all emp
const get_allemp=async(req,res)=>{
    try {
        const emp=await empmodel.find();
        res.status(200).json({emp});
    } catch (error) {
        res.status(200).send("error");
       console.log(error) 
    }
}


const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await empmodel.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Email, Mobile, Designation, Gender, Course } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Find the employee
        const employee = await empmodel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee fields
        employee.Name = Name || employee.Name;
        employee.Email = Email || employee.Email;
        employee.Mobile = Mobile || employee.Mobile;
        employee.Designation = Designation || employee.Designation;
        employee.Gender = Gender || employee.Gender;
        employee.Course = Course|| employee.Course; 
            employee.Img = image; 

        // Save updated employee
        await employee.save();
        res.send({message:'uodate successfully',employee});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const countemp = async (req,res) => {
    try {
      const result = await empmodel.countDocuments();
      if(result > 0)
      {
        res.status(200).send({
          success: true,
          message:"Users Count Retrived",
          result
        })
      }
      else{
        res.status(400).send({
          success: false,
          message:"Users Count Retrived Failed"
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
        message: 'Error while fetching user from DB',
    });
    }
  }
  
module.exports = {emp_signup,get_allemp,deleteEmployee,updateEmployee,countemp};
