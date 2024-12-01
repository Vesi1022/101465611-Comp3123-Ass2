import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/employees",
        { name, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/employees");
    } catch (error) {
      alert("Failed to add employee: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEmployee;
