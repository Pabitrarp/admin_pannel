import React,{useState} from 'react'
import login from '../assets/createproduct.png';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Authentication = () => {
    const navigate=useNavigate();
    const [Logindata, setLogindata] = useState({});
    const [errors, setErrors] = useState({});
   
    const login_submit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
       try {
       const res= await axios.post("http://localhost:8000/api/vi/adminsignin",Logindata);
       if(res.data.success)
         {
         
          localStorage.setItem('user',JSON.stringify(res.data.admin));
          toast.success(res.data.message);
          navigate("/dashbord");

         }
       else{
        toast.error(res.data.message);
       }
       } catch (error) {
        console.log(error);
       }
    }
    const handleInputChange = (e) => {
     const {name,value}=e.target;
        setLogindata((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
    };
  
    const validateForm = () => {
      let formErrors = {};
        if (!Logindata.email) {
          formErrors.email = 'Email is required';
        }else{
          if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Logindata.email)){
             formErrors.email="invalid email";
          }
        }
        if (!Logindata.password) {
          formErrors.password = 'Password is required';
        }else{
          if(Logindata.password.length >16){
            formErrors.password="Password is too long"
          }
        }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
  
    const inputClass = (field) => {
      return `flex items-center gap-2 border-2 h-10 ${errors[field] ? 'border-red-600 text-red-500' : 'border-slate-300'} bg-slate-300 rounded `;
    };
  
    return (
      <div className="main w-full h-screen flex items-center justify-center">
        <div className="form lg:w-3/4 md:w-5/6 sm:w-11/12 lg:h-3/4 md:h-1/2 sm:h-auto flex flex-col md:flex-row border-2 rounded-3xl bg-blue-700">
          <div className="lg:w-1/2 hidden md:flex items-center justify-center bg-white rounded-3xl">
            <img src={login} alt="img" className="w-full h-auto object-cover rounded-3xl" />
          </div>
          <div className="flex flex-col items-center lg:w-1/2 w-full justify-center p-4">
            <div className="header text-white text-3xl decoration-4 font-extrabold mb-6 animate-fade-down animate-once animate-duration-3000 animate-ease-out">
              Login
            </div>
            <div className="flex flex-col gap-1 w-72 mt-4 animate-fade-down animate-once animate-duration-3000 animate-ease-out">
              <div className={inputClass('email')}>
                <MdEmail className="ml-2 text-2xl text-blue-600" />
                <input
                  type="email"
                  name="email"
                  placeholder={errors.email ? errors.email : 'Enter email'}
                  className="focus:outline-none w-full h-full bg-slate-300 font-semibold placeholder-black cursor-pointer "
                  onChange={handleInputChange}
                  value={Logindata.email}
                />
              </div>
              {errors.email&&
                  (<span className='text-white font-semibold' >{errors.email}</span>)
                  }
            </div>
  
            <div className="flex flex-col gap-1 w-72 mt-4 animate-fade-down animate-once animate-duration-3000 animate-ease-out">
              <div className={inputClass('password')}>
                <RiLockPasswordFill className="text-2xl ml-2 text-blue-600" />
                <input
                  type="password"
                  placeholder={errors.password ? errors.password : 'Enter password'}
                  name="password"
                  className="focus:outline-none w-full h-full bg-slate-300 font-semibold placeholder-black cursor-pointer"
                  onChange={handleInputChange}
                  value={Logindata.password}
                  />
              </div>
              {errors.password&&
                  (<span className='text-white font-semibold' >{errors.password}</span>)
                  }
            </div>
              <button className="w-72 h-10 bg-green-500 text-xl font-bold mt-4 rounded" onClick={login_submit}>
                Submit
              </button>
          </div>
        </div>
      </div>
    );
}
