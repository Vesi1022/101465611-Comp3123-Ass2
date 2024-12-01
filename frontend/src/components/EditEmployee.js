import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
        setDepartment(response.data.department);
      } catch (error) {
        alert("Failed to fetch employee data: " + error.response.data.message);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/employees/${id}`,
        { name, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/employees");
    } catch (error) {
      alert("Failed to update employee: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditEmployee;
