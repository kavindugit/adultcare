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
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  FormGroup,
  CircularProgress
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define constants outside component for better organization
const AVAILABLE_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const TIME_SLOTS = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00"
];

const INITIAL_FORM_STATE = {
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
  availableDate: [],
  availableWorkingHours: [],
  consultationFee: "",
  currentHospital: "",
  phoneNumber: "",
  address: "",
  gender: "",
  dob: "",
  nic: ""
};

const DoctorRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailableDateChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData({ 
      ...formData, 
      availableDate: typeof value === "string" ? value.split(",") : value 
    });
  };

  const handleTimeSlotChange = (timeSlot) => {
    setFormData((prev) => {
      const isSelected = prev.availableWorkingHours.includes(timeSlot);
      const updatedHours = isSelected
        ? prev.availableWorkingHours.filter(time => time !== timeSlot)
        : [...prev.availableWorkingHours, timeSlot];
      
      return {
        ...prev,
        availableWorkingHours: updatedHours
      };
    });
  };

  const validateForm = () => {
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3})?[\s-]?\d{10,15}$/;
    
    // Validation checks
    if (!formData.fullName.trim() || formData.fullName.length > 100) {
      toast.error("Full name is required and should be less than 100 characters.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Invalid phone number format. Include country code if applicable.");
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
    if (!formData.nic.trim()) {
      toast.error("NIC Number is required");
      return false;
    }
    if (!formData.specialization.trim()) {
      toast.error("Specialization is required");
      return false;
    }
    if (!formData.medicalLicenseNumber.trim()) {
      toast.error("Medical License Number is required");
      return false;
    }
    if (isNaN(Number(formData.yearsOfExperience)) || Number(formData.yearsOfExperience) < 0) {
      toast.error("Years of experience must be a positive number");
      return false;
    }
    if (isNaN(Number(formData.consultationFee)) || Number(formData.consultationFee) <= 0) {
      toast.error("Consultation fee must be a positive number");
      return false;
    }
    if (formData.availableDate.length === 0) {
      toast.error("Please select at least one available day");
      return false;
    }
    if (formData.availableWorkingHours.length === 0) {
      toast.error("Please select at least one time slot");
      return false;
    }
    if (!formData.licenseExpireDate) {
      toast.error("License expiry date is required");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select gender");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare data for backend
      const formattedData = {
        ...formData,
        // Format phone number to ensure it has + prefix if missing
        phoneNumber: formData.phoneNumber.startsWith('+') 
          ? formData.phoneNumber 
          : `+${formData.phoneNumber.replace(/[^0-9]/g, '')}`,
        // Keep subspecialities and languagesSpoken as strings for backend
        subspecialities: formData.subspecialities.trim(),
        languagesSpoken: formData.languagesSpoken.trim(),
        // Convert numeric strings to numbers
        yearsOfExperience: Number(formData.yearsOfExperience),
        consultationFee: Number(formData.consultationFee)
      };

      const response = await axios.post("http://localhost:4000/api/employee/register-doctor", formattedData);
      
      if (response.data.success) {
        toast.success("Doctor registered successfully");
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={4} sx={{ p: 4, mt: 5, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Doctor Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                Personal Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="fullName" 
                label="Full Name" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="dob" 
                label="Date of Birth" 
                type="date" 
                value={formData.dob} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  label="Gender"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="nic" 
                label="NIC Number" 
                value={formData.nic} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="phoneNumber" 
                label="Phone Number" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                helperText="Include country code (e.g., +94)"
                required 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="address" 
                label="Clinic Address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            {/* Account Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Account Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="email" 
                label="Email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="password" 
                label="Password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="confirmPassword" 
                label="Confirm Password" 
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            {/* Professional Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Professional Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="specialization" 
                label="Specialization" 
                value={formData.specialization} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="subspecialities" 
                label="Subspecialities (comma-separated)" 
                value={formData.subspecialities} 
                onChange={handleChange} 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="medicalLicenseNumber" 
                label="Medical License Number" 
                value={formData.medicalLicenseNumber} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="licenseExpireDate" 
                label="License Expiry Date" 
                type="date" 
                value={formData.licenseExpireDate} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                required 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="nationalMedicalRegistrationNumber" 
                label="National Medical Reg. No." 
                value={formData.nationalMedicalRegistrationNumber} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="yearsOfExperience" 
                label="Years of Experience" 
                type="number" 
                value={formData.yearsOfExperience} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="languagesSpoken" 
                label="Languages Spoken (comma-separated)" 
                value={formData.languagesSpoken} 
                onChange={handleChange} 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="consultationFee" 
                label="Consultation Fee" 
                type="number" 
                value={formData.consultationFee} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="currentHospital" 
                label="Current Hospital" 
                value={formData.currentHospital} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            {/* Availability */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Availability
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Available Days</InputLabel>
                <Select
                  multiple
                  name="availableDate"
                  value={formData.availableDate}
                  onChange={handleAvailableDateChange}
                  input={<OutlinedInput label="Available Days" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {AVAILABLE_DAYS.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={formData.availableDate.indexOf(day) > -1} />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth required>
                <Typography variant="subtitle2">Preferred Time Slots</Typography>
                <FormGroup row>
                  {TIME_SLOTS.map((timeSlot) => (
                    <FormControlLabel
                      key={timeSlot}
                      control={
                        <Checkbox
                          value={timeSlot}
                          checked={formData.availableWorkingHours.includes(timeSlot)}
                          onChange={() => handleTimeSlotChange(timeSlot)}
                        />
                      }
                      label={timeSlot}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
                sx={{ py: 1.5 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register Doctor"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default DoctorRegistrationForm;