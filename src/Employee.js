import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"



export default function Employee() {
    
    const [departments,setDepartments]=useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [employee, setEmployee]=useState([]);
    const navigate = useNavigate();

      useEffect(() => {
        loadDepartments();
      }, []);
    
      const loadDepartments = async () => {
        
        try {
          const result =await axios.get("http://localhost:8083/api/department/getAll") 
          // Handle the result
          console.log(result.data)
          if(result.data!=null)
            setDepartments(result.data);
        } catch (error) {
          console.error("Error making the request:", error);
          // Handle the error
        }
        
      };
      
      const [selectedRows2, setSelectedRows2] = useState([]);
      
      const handleClick = (value) => {
        if (selectedRows2.includes(value)) {
          setSelectedRows2(selectedRows2.filter((row) => row !== value));
        } else {
          setSelectedRows2([value]);
        }
        console.log(selectedRows2);
      };
      
      const getEmployees = async () => {
        try {
          console.log(selectedRows2[0]);
          const selectedDepartment = selectedRows2[0]; // Store selected department in a variable
          const result = await axios.get(`http://localhost:8083/api/employee/by-department/${selectedDepartment}`);
          console.log(result.data);
          if (result.data != null) {
            setEmployee(result.data);
            console.log(employee);
          }
        } catch (error) {
          console.error("Error making the request:", error);
          // Handle the error
        }
      };

    return (   
<div className="container">


<div className="py-4"> 
    <table class="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Description</th>
      <th scope="col">ParentID</th>
      <th scope="col">ManagerID</th>
    </tr>
  </thead>
  <tbody>
    {
        departments.map((department,index)=>(
                <tr key={index}
                        onClick={() => handleClick(department.id)}
                        className={selectedRows2.includes(departments.id) ? 'selected-row' : ''}>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                <td>{department.id}</td>
                <td>{department.description}</td>
                <td>{department.parentID}</td>
                <td>{department.managerID}</td>
            </tr>
        ))
    }
  </tbody>
</table> 
</div> 

<button
        className="btn btn-success"
        onClick={getEmployees}
      >
        Search Employees
      </button>


      <table class="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">DepartmentID</th>
      <th scope="col">ManagerID</th>
      <th scope="col">Email</th>
      <th scope="col">EnrollDate</th>
    </tr>
  </thead>
  <tbody>
    {
        employee.map((employe,index)=>(
                <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                <td>{employe.id}</td>
                <td>{employe.name}</td>
                <td>{employe.departmentID}</td>
                <td>{employe.managerID}</td>
                <td>{employe.email}</td>
                <td>{employe.enrollDate}</td>
            </tr>
        ))
    }
  </tbody>
</table> 
    </div>
        );
}