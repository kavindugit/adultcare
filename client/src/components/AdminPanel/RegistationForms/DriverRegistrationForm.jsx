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

const DriverRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    licenseNumber: "",
    licenseExpiry: "",
    dob: "",
    gender: "",
    address: "",
    identificationNumber: "",
    yearsOfExperience: "",
    availabilityHours: "",
    monthlySalary: "",
    otRate: ""
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
    const today = new Date();
    const dob = new Date(formData.dob);
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      toast.error("Driver must be at least 18 years old");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select a gender");
      return false;
    }
    if (!formData.monthlySalary || isNaN(formData.monthlySalary) || Number(formData.monthlySalary) <= 0) {
      toast.error("Monthly salary must be a positive number");
      return false;
    }
    if (!formData.otRate || isNaN(formData.otRate) || Number(formData.otRate) <= 0) {
      toast.error("OT rate must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post("http://localhost:4000/api/employee/register-driver", formData);
      toast.success("Driver registered successfully");
      setTimeout(() => navigate("/admin"), 1500);
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
          Driver Registration
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
              <TextField fullWidth name="licenseNumber" label="Driver's License Number" value={formData.licenseNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="licenseExpiry" label="License Expiry Date" type="date" value={formData.licenseExpiry} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
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
            <Grid item xs={6}>
              <TextField fullWidth name="identificationNumber" label="ID / NIC / Passport Number" value={formData.identificationNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="address" label="Address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="yearsOfExperience" label="Years of Driving Experience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Availability Hours</InputLabel>
                <Select name="availabilityHours" value={formData.availabilityHours} onChange={handleChange} label="Availability Hours">
                  <MenuItem value="">Select Hours</MenuItem>
                  <MenuItem value="06:00 - 14:00">06:00 - 14:00</MenuItem>
                  <MenuItem value="08:00 - 17:00">08:00 - 17:00</MenuItem>
                  <MenuItem value="14:00 - 22:00">14:00 - 22:00</MenuItem>
                  <MenuItem value="Night Shift">Night Shift</MenuItem>
                  <MenuItem value="Flexible">Flexible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="monthlySalary" label="Monthly Salary (LKR)" type="number" value={formData.monthlySalary} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="otRate" label="OT Rate (LKR/hour)" type="number" value={formData.otRate} onChange={handleChange} required />
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

export default DriverRegistrationForm;
