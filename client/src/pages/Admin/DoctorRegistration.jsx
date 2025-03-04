import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    phoneNumber: "",
    clinicAddress: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/doctors/register", formData);
      alert("Doctor registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="text" name="licenseNumber" placeholder="Medical License Number" value={formData.licenseNumber} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="text" name="clinicAddress" placeholder="Clinic Address" value={formData.clinicAddress} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegistration;
