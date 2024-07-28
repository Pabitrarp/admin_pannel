import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <nav className="p-4">
        <ul>
          <NavLink 
            to="/dashbord"
            className="p-4 text-2xl "
            activeClassName="bg-white text-black"
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink 
            to="/employeelist"
            className="p-4 text-2xl"
            activeClassName="bg-white text-black"
          >
            <li>Employee List</li>
          </NavLink>
          <NavLink 
            to="/create_employee"
            className="p-4 text-2xl"
            activeClassName="bg-white text-black"
          >
            <li>Create Employee</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};


