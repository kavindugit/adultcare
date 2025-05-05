import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NurseRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    licenseNumber: "",
    gender: "",
    address: "",
    nic: "",
    yearsOfExperience: "",
    specialization: "",
    availableShifts: "",
    certifications: "",
    salary: "",
    dob: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,15}$/;
    if (!formData.fullName || formData.fullName.length > 100) {
      toast.error("Full name is required and must be under 100 characters.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Phone number must include country code and be 10 to 15 digits long");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!formData.dob) {
      toast.error("Date of Birth is required");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select a gender");
      return false;
    }
    if (!formData.salary || isNaN(formData.salary) || Number(formData.salary) <= 0) {
      toast.error("Salary must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      // Log original input for debugging
      console.log("Certifications raw input:", formData.certifications);
  
      // Prepare payload
      const certificationsArray = typeof formData.certifications === "string"
        ? formData.certifications.split(",").map(c => c.trim()).filter(c => c !== "")
        : [];
  
      const payload = {
        ...formData,
        certifications: certificationsArray
      };
  
      console.log("Final Payload:", payload); // Make sure certifications are included
  
      await axios.post("http://localhost:4000/api/employee/register-nurse", payload);
      toast.success("Nurse registered successfully");
      
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };
  

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Nurse Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="licenseNumber" label="Nursing License Number" value={formData.licenseNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="address" label="Address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="nic" label="NIC" value={formData.nic} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="yearsOfExperience" label="Years of Experience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="specialization" label="Specialization" value={formData.specialization} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Available Shifts</InputLabel>
                <Select name="availableShifts" value={formData.availableShifts} onChange={handleChange} label="Available Shifts">
                  <MenuItem value="">Select Shift</MenuItem>
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                  <MenuItem value="Rotational">Rotational</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="certifications" label="Certifications (comma-separated)" value={formData.certifications} onChange={handleChange} multiline minRows={1} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="salary" label="Salary (Monthly LKR)" type="number" value={formData.salary} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default NurseRegistrationForm;
