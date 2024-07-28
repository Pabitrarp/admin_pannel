import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const Headers = () => {
  const navigate=useNavigate();
  const [User,setUser]=useState({});
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
     setUser(user);
    

  },[])
  return (
   <div className='navbar bg-blue-700 text-white flex  items-center p-4'>
      <h1 className="text-2xl font-bold flex-1">Admin Dashboard</h1>
      <h1 className="text-2xl font-bold mr-8">{User?User.Name:''}</h1>
    <button className="bg-red-500 py-2 px-2  rounded font-bold text-xl" onClick={()=>{
      localStorage.clear();
      navigate("/login");
    }}>Logout</button> 
   </div>
  )
}
