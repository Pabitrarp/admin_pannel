import React from 'react'
import { Headers} from '../Components/Headers';
import{Sidebar} from '../Components/Sidebar';
export const Layout = ({children}) => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
      <Headers></Headers>
      <div className="sidebar_andco_ntent flex flex-1 bg-gray-200 ">
        <Sidebar ></Sidebar>
        <div className="main_content w-full">
            {children}
        </div>
          
        </div>
        </div>
       
    </>
  )
}
