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

const DoctorRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    subspecialities: "",
    medicalLicenseNumber: "",
    licenseExpireDate: "",
    nationalMedicalRegistrationNumber: "",
    yearsOfExperience: "",
    languagesSpoken: "",
    availableDate: "",
    availableWorkingHours: "",
    consultationFee: "",
    currentHospital: "",
    phoneNumber: "",
    address: "",
    gender: ""
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
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Doctor Registration
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
            <Grid item xs={12}>
              <TextField fullWidth name="specialization" label="Specialization" value={formData.specialization} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="subspecialities" label="Subspecialities (comma-separated)" value={formData.subspecialities} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="medicalLicenseNumber" label="Medical License Number" value={formData.medicalLicenseNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="licenseExpireDate" label="License Expiry Date" type="date" value={formData.licenseExpireDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="nationalMedicalRegistrationNumber" label="National Medical Reg. No." value={formData.nationalMedicalRegistrationNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="yearsOfExperience" label="Years of Experience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="languagesSpoken" label="Languages Spoken (comma-separated)" value={formData.languagesSpoken} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="availableDate" label="Available Date" type="date" value={formData.availableDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Available Working Hours</InputLabel>
                <Select name="availableWorkingHours" value={formData.availableWorkingHours} onChange={handleChange} label="Available Working Hours">
                  <MenuItem value="">Select Hours</MenuItem>
                  <MenuItem value="08:00 - 12:00">08:00 - 12:00</MenuItem>
                  <MenuItem value="12:00 - 16:00">12:00 - 16:00</MenuItem>
                  <MenuItem value="16:00 - 20:00">16:00 - 20:00</MenuItem>
                  <MenuItem value="08:00 - 17:00">08:00 - 17:00</MenuItem>
                  <MenuItem value="Night Shift">Night Shift</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="consultationFee" label="Consultation Fee" type="number" value={formData.consultationFee} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="currentHospital" label="Current Hospital" value={formData.currentHospital} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="address" label="Clinic Address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
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

export default DoctorRegistrationForm;