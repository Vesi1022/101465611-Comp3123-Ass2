import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      alert("Failed to delete employee: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/add-employee">Add Employee</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <Link to={`/edit-employee/${employee._id}`}>Edit</Link>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
