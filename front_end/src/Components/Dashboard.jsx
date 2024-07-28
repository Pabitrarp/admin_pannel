import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Dashboard = ({name}) => {
  const [count,setcount]=useState();
  
  useEffect(()=>{
    const countu=async()=>{
      try {
        const res= await axios.get("http://localhost:8000/api/vi/count");
        setcount(res.data.result);
      } catch (error) {
        console.log(error)
      }
    }
    countu();
    
  })
  return (
   
    <div className='p-20 '><p className='text-3xl font-bold mb-20'>welcom to 
       {" "}{name?name.Name:""}
       </p>
        <div className="emplist bg-white w-60 h-32 text-black text-center p-4 font-semibold text-xl shadow-lg hover:bg-slate-50 hover:shadow-gray-400 cursor-pointer">Total emp list
        <p className='mt-8'>{count}</p>  </div>
        
   
    </div>

  )
}
