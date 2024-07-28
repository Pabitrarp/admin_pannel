import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const designations = ["HR","Manager","sales"]; 
const genders = ['Male', 'Female', 'Other']; 
const coursesOptions = ['MCA', 'BCA', 'B.SC']; 
export const EmployeeList = () => {
  const navigate=useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/vi/emplist");
        setEmployees(res.data.emp);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEmployees();
    const user=JSON.parse(localStorage.getItem('user'))
    if(user==null){
      navigate("/login");
    }
    
  }, [employees]);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/vi/emplist/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

 const updateEmployee = async (id) => {
    const formData = new FormData();
    formData.append('Name', updatedEmployee.Name);
    formData.append('Email', updatedEmployee.Email);
    formData.append('Mobile', updatedEmployee.Mobile);
    formData.append('Designation', updatedEmployee.Designation);
    formData.append('Gender', updatedEmployee.Gender);
    formData.append('Course', updatedEmployee.Course);
    if (updatedEmployee.image) {
        formData.append('image', updatedEmployee.image);
    }

    try {
        const res=await axios.put(`http://localhost:8000/api/vi/emplist/${id}`, formData);
        toast.success(res.data.message);
       
        setEmployees(employees.map(employee => employee._id === id ? { ...employee, ...updatedEmployee, Img: updatedEmployee.image ? URL.createObjectURL(updatedEmployee.image) : employee.Img } : employee));
        setEditingEmployee(null);
        setUpdatedEmployee({});
        
    } catch (err) {
        console.log(err);
    }
};


  const handleUpdateChange = (e) => {
    setUpdatedEmployee({ ...updatedEmployee, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setUpdatedEmployee(prevState => {
      const updatedCourses = checked
        ? [...(prevState[name] || []), value]
        : (prevState[name] || []).filter(course => course !== value);
      return { ...prevState, [name]: updatedCourses };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedEmployee(prevState => ({
      ...prevState,
      image: file // Store the file in state
    }));
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({ ...prevState, [name]: value }));
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className='p-8'>
        <div className='mb-4 shadow-xl'>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {editingEmployee && (
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold mb-2">Edit Employee</h2>
            <input
              type="text"
              name="Name"
              value={updatedEmployee.Name || ''}
              onChange={handleUpdateChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              name="Email"
              value={updatedEmployee.Email || ''}
              onChange={handleUpdateChange}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              name="Mobile"
              value={updatedEmployee.Mobile || ''}
              onChange={handleUpdateChange}
              placeholder="Mobile"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              required
            />
              <input 
                  type="file" 
                  
                  name="image" 
                  accept=".jpg,.png"
                  onChange={handleImageChange}
                   className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
            <div className="mb-2">
              <label className="block">Designation</label>
              <select
                name="Designation"
                value={updatedEmployee.Designation || ''}
                onChange={handleUpdateChange}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Designation</option>
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block">Gender</label>
              {genders.map(gender => (
                <label key={gender} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="Gender"
                    value={gender}
                    checked={updatedEmployee.Gender === gender}
                    onChange={handleRadioChange}
                    className="form-radio"
                  />
                  <span className="ml-2">{gender}</span>
                </label>
              ))}
            </div>

            <div className="mb-2">
              <label className="block">Courses</label>
              {coursesOptions.map(course => (
                <label key={course} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name="Course"
                    value={course}
                    checked={(updatedEmployee.Course || []).includes(course)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{course}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => updateEmployee(editingEmployee._id)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditingEmployee(null)}
              className="p-2 bg-red-500 text-white rounded ml-2"
            >
              Cancel
            </button>
          </div>
        )}

        <table className='w-full bg-white border-collapse'>
          <thead>
            <tr className='bg-white '>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Course</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center shadow-xl'>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border">{employee.Name}</td>
                  <td className="py-2 px-4 border">
                    {employee.Img ? (
                      <img
                        src={`http://localhost:8000${employee.Img}`}
                        alt={employee.Name}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="py-2 px-4 border">{employee.Email}</td>
                  <td className="py-2 px-4 border">{employee.Mobile}</td>
                  <td className="py-2 px-4 border">{employee.Designation}</td>
                  <td className="py-2 px-4 border">{employee.Gender}</td>
                  <td className="py-2 px-4 border">
                    {employee.Course.join(', ')}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => {
                        setEditingEmployee(employee);
                        setUpdatedEmployee(employee);
                      }}
                      className="p-2 bg-yellow-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-2 px-4 border text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
