import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const Createemployee = () => {
  const navigate=useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });
  const [errors, setErrors] = useState({});
  
useEffect(()=>{
  const user=JSON.parse(localStorage.getItem('user'))
  if(user==null){
    navigate("/login");
  }
},[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prevState) => {
      if (checked) {
        return {
          ...prevState,
          courses: [...prevState.courses, value],
        };
      }else{
        return{
            ...prevState,
            courses: prevState.courses.filter((course) => course !== value)
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const file=e.target.files[0];
    
      setEmployee({ ...employee, image: file});
   
  };


  const validation=()=>{
    let formerr={};
    if(!employee.name){
      formerr.name='Name is required';
    }else{
      if(employee.name.length < 3){
        formerr.name='Invalid Name';
      }
    }
    if(!employee.email){
      formerr.email='Email is required' ;

    }else{
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)){
        formerr.email="Invalid Email";
     }
    }
    if(employee.courses.length==0){
      formerr.courses='Choose courses';
    }
    if(!employee.designation){
      formerr.designation='Choose designation';
    }
    if(!employee.gender){
      formerr.gender='Choose Gender';
    }
    if(!employee.mobile){
      formerr.mobile='Entermobile';
    }
    else{
      if (employee.mobile.length !== 10) {
        formerr.mobile = 'Enter valid Mobile_No';
      }
    }
    if(!employee.image){
      formerr.image='choose a img';
    }
    setErrors(formerr);
   return Object.keys(formerr).length==0;
  }
  const inputClass = (field) => {
    return `w-full p-2 border ${errors[field] ? 'border-red-600 text-red-500' : 'border-gray-300'} mt-2 rounded `;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validation()) return;
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('courses', employee.courses); 
    if (employee.image) {
      formData.append('image', employee.image);
    }
   
    try {
       const res=await axios.post("http://localhost:8000/api/vi/empsignup",formData);
      if(res.data)
        { toast.success(res.data.message)
          navigate("/employeelist")
        }
    } catch (error) {
      
      toast.error(error.response.data.message)
    }
    
  };

  return (
    <Layout>
    <div className='flex justify-center items-center p-4 h-full'>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Create Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={employee.name}
                  onChange={handleChange}
                  className={inputClass('name')}
                 
                />
                 {errors.name&&
                  (<span className='text-red-500 font-semibold' >{errors.name}</span>)
                  }
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={employee.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                
                />
                 {errors.email&&
                  (<span className='text-red-500 font-semibold' >{errors.email}</span>)
                  }
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700">Mobile</label>
                <input 
                  type="text" 
                  id="mobile" 
                  name="mobile" 
                  value={employee.mobile}
                  onChange={handleChange}
                  className={inputClass('mobile')}
                
                />
                 {errors.mobile &&
                  (<span className='text-red-500 font-semibold' >{errors.mobile}</span>)
                  }
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Upload Image</label>
                <input 
                  type="file" 
                  id="image" 
                  name="image" 
                  accept=".jpg,.png"
                  onChange={handleImageChange}
                  className={inputClass('image')}
                />
                 {errors.image&&
                  (<span className='text-red-500 font-semibold' >{errors.image}</span>)
                  }
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-700">Designation</label>
                <select
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  className={inputClass('designation')}
                  required
                >
                  <option value="Select a designation">Select a designation</option>
                  <option value="Developer">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Tester">Seals</option>
                </select>
                {errors.designation&&
                  (<span className='text-red-500 font-semibold' >{errors.designation}</span>)
                  }
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <div className="mt-2">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Male
                  </label>
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Other
                  </label>
                </div>
                {errors.gender&&
                  (<span className='text-red-500 font-semibold ' >{errors.gender}</span>)
                  }
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Courses</label>
                <div className="mt-2">
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      name="courses"
                      value="MCA"
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    MCA
                  </label>
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      name="courses"
                      value="BCA"
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    BCA
                  </label>
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      name="courses"
                      value="B.SC"
                      
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    B.SC
                  </label>
                  
                </div>
                {errors.courses &&
                  (<span className='text-red-500 font-semibold' >{errors.courses}</span>)
                  }
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700 font-semibold">
            Create Employee
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};


