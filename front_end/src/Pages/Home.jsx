import React, { useEffect, useState } from 'react'
import { Dashboard } from '../Components/Dashboard'
import { Layout } from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
  const navigate=useNavigate();
  const [User,setUser]=useState()
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user==null){
      navigate("/login");
    }else{
     setUser(user);
    }
  },[])
  return (
    <Layout>
      <Dashboard name={User}></Dashboard>
    </Layout>
  )
}
