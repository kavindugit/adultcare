import React, { useState, useEffect } from "react";
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
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Chip,
  OutlinedInput,
  ListItemText,
  Collapse
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
    dob: "",
    preferredWorkingDays: [],
    preferredTimeSlots: [],
    isPartTime: false
  });

  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const shiftOptions = [
    "Day Shift (8:00 AM - 8:00 PM)",
    "Night Shift (8:00 PM - 8:00 AM)",
    "Full-Time (24-hour)"
  ];

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
    "10:00 PM - 12:00 AM",
    "12:00 AM - 2:00 AM",
    "2:00 AM - 4:00 AM",
    "4:00 AM - 6:00 AM",
    "6:00 AM - 8:00 AM"
  ];

  useEffect(() => {
    // Show time slots only for part-time nurses
    setShowTimeSlots(formData.isPartTime);
    
    // Clear time slots when switching to full shifts
    if (!formData.isPartTime) {
      setFormData(prev => ({ ...prev, preferredTimeSlots: [] }));
    }
  }, [formData.isPartTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (event, fieldName) => {
    const {
      target: { value },
    } = event;
    
    // On autofill we get a stringified value.
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    
    setFormData({
      ...formData,
      [fieldName]: selectedValues,
    });
  };

  const handleShiftChange = (e) => {
    const { value } = e.target;
    const isPartTimeShift = value === "Part-Time";
    
    setFormData({ 
      ...formData, 
      availableShifts: value,
      isPartTime: isPartTimeShift
    });
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
      toast.error("Hourly salary must be a positive number");
      return false;
    }
    if (formData.preferredWorkingDays.length === 0) {
      toast.error("Please select at least one preferred working day");
      return false;
    }
    if (!formData.availableShifts) {
      toast.error("Please select preferred working shift");
      return false;
    }
    if (formData.isPartTime && formData.preferredTimeSlots.length === 0) {
      toast.error("Please select at least one preferred time slot for part-time");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      // Prepare payload
      const certificationsArray = typeof formData.certifications === "string"
        ? formData.certifications.split(",").map(c => c.trim()).filter(c => c !== "")
        : [];
  
      const payload = {
        ...formData,
        certifications: certificationsArray
      };
  
      console.log("Final Payload:", payload);
  
      await axios.post("http://localhost:4000/api/employee/register-nurse", payload);
      toast.success("Nurse registered successfully");
      
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Nurse Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required helperText="Include country code (e.g., +94)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="licenseNumber" label="Nursing License Number" value={formData.licenseNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="address" label="Address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="nic" label="NIC" value={formData.nic} onChange={handleChange} required />
            </Grid>

            {/* Professional Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Professional Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="yearsOfExperience" label="Years of Experience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="specialization" label="Specialization" value={formData.specialization} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="certifications" label="Certifications (comma-separated)" value={formData.certifications} onChange={handleChange} multiline minRows={1} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="salary" label="Hourly Salary (LKR)" type="number" value={formData.salary} onChange={handleChange} required />
            </Grid>

            {/* Availability Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Availability Information
              </Typography>
            </Grid>
            
            {/* Preferred Working Days */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="preferred-days-label">Preferred Working Days</InputLabel>
                <Select
                  labelId="preferred-days-label"
                  id="preferred-days"
                  multiple
                  value={formData.preferredWorkingDays}
                  onChange={(e) => handleMultiSelectChange(e, "preferredWorkingDays")}
                  input={<OutlinedInput label="Preferred Working Days" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {weekdays.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={formData.preferredWorkingDays.indexOf(day) > -1} />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Working Shifts */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Working Shifts</InputLabel>
                <Select 
                  name="availableShifts" 
                  value={formData.availableShifts} 
                  onChange={handleShiftChange} 
                  label="Preferred Working Shifts"
                >
                  <MenuItem value="">Select Shift</MenuItem>
                  <MenuItem value="Day Shift (8:00 AM - 8:00 PM)">Day Shift (8:00 AM - 8:00 PM)</MenuItem>
                  <MenuItem value="Night Shift (8:00 PM - 8:00 AM)">Night Shift (8:00 PM - 8:00 AM)</MenuItem>
                  <MenuItem value="Full-Time (24-hour)">Full-Time (24-hour availability)</MenuItem>
                  <MenuItem value="Part-Time">Part-Time (Select time slots)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Time Slots (only for part-time) */}
            <Grid item xs={12}>
              <Collapse in={showTimeSlots}>
                <FormControl fullWidth required={formData.isPartTime}>
                  <InputLabel id="time-slots-label">Preferred Time Slots</InputLabel>
                  <Select
                    labelId="time-slots-label"
                    id="time-slots"
                    multiple
                    value={formData.preferredTimeSlots}
                    onChange={(e) => handleMultiSelectChange(e, "preferredTimeSlots")}
                    input={<OutlinedInput label="Preferred Time Slots" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {timeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        <Checkbox checked={formData.preferredTimeSlots.indexOf(slot) > -1} />
                        <ListItemText primary={slot} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Collapse>
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button fullWidth type="submit" variant="contained" color="primary" size="large">
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