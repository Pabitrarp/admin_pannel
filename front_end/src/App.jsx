import React from "react";

import { Route, Routes } from "react-router-dom";
import { Authentication } from "./Components/Authentication";
import { Home } from "./Pages/Home";
import { EmployeeList } from "./Pages/EmployeeList";
import { Createemployee } from "./Pages/Createemployee";

const App = () => {
  
  return (
      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/dashbord" element={<Home/>}/>
        <Route path="/employeelist" element={<EmployeeList/>}/>
        <Route path="/create_employee" element={<Createemployee/>}/>
        <Route path="/login" element={<Authentication/>}/>
      </Routes>
   
  
  );
};

export default App;
