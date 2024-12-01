import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (error) {
        alert("Failed to fetch employee details: " + error.response.data.message);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
};

export default EmployeeDetails;
