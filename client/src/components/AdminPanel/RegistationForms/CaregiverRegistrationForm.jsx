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
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const skillsList = [
  "Bathing Assistance",
  "Mobility Support",
  "Medication Reminder",
  "Feeding Assistance",
  "Cooking",
  "Housekeeping",
  "Lifting",
  "Toileting",
];

const workHourOptions = [
  "08:00 - 17:00",
  "17:00 - 00:00",
  "00:00 - 08:00",
  "Live-in",
  "Rotational",
];

const CaregiverRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    age: "",
    gender: "",
    address: "",
    identificationNumber: "",
    yearsOfExperience: "",
    preferredWorkHours: "",
    skills: [],
    languagesSpoken: "",
    salary: "",
    dob: "",
    nic: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData({ ...formData, skills: typeof value === "string" ? value.split(",") : value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,15}$/;
    const nicRegex = /^[A-Za-z0-9]{6,20}$/;

    if (!formData.fullName || formData.fullName.length > 100) {
      toast.error("Full name is required and should be less than 100 characters.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Phone number must start with country code and contain 10 to 15 digits (e.g., +94123456789).");
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
    if (isNaN(formData.age) || +formData.age < 18 || +formData.age > 100) {
      toast.error("Age should be between 18 and 100");
      return false;
    }
    if (!nicRegex.test(formData.identificationNumber)) {
      toast.error("Invalid NIC / ID / Passport Number");
      return false;
    }
    if (!formData.dob) {
      toast.error("Date of birth is required");
      return false;
    }
    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0) {
      toast.error("Salary should be a positive number");
      return false;
    }
    if (formData.skills.length === 0) {
      toast.error("Please select at least one skill");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:4000/api/employee/register-caregiver", formData);
      toast.success("Caregiver registered successfully");
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
          Caregiver Registration
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
              <TextField fullWidth name="age" label="Age" type="number" value={formData.age} onChange={handleChange} required />
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
              <TextField fullWidth name="nic" label="ID / NIC / Passport Number" value={formData.identificationNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="address" label="Address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="yearsOfExperience" label="Years of Experience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Work Hours</InputLabel>
                <Select name="preferredWorkHours" value={formData.preferredWorkHours} onChange={handleChange} label="Preferred Work Hours">
                  <MenuItem value="">Select Work Hours</MenuItem>
                  {workHourOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Relevant Skills</InputLabel>
                <Select
                  multiple
                  name="skills"
                  value={formData.skills}
                  onChange={handleSkillChange}
                  input={<OutlinedInput label="Relevant Skills" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {skillsList.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      <Checkbox checked={formData.skills.indexOf(skill) > -1} />
                      <ListItemText primary={skill} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="languagesSpoken" label="Languages Spoken" value={formData.languagesSpoken} onChange={handleChange} multiline minRows={1} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="salary" label="Salary (LKR/hour)" type="number" value={formData.salary} onChange={handleChange} required />
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

export default CaregiverRegistrationForm;
