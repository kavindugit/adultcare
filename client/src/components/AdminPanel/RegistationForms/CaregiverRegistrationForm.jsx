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
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormGroup,
  FormControlLabel,
  FormLabel
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

const workingDaysList = [
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
  "Full-Time (24-hour availability)",
  "Part-Time (Custom time slots)"
];

const timeSlotOptions = [
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

const CaregiverRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    address: "",
    yearsOfExperience: "",
    preferredWorkHours: "",
    preferredWorkingDays: [],
    preferredShift: "",
    isPartTime: false,
    preferredTimeSlots: [],
    skills: [],
    languagesSpoken: "",
    salary: "",
    dob: "",
    nic: ""
  });

  const [showTimeSlots, setShowTimeSlots] = useState(false);

  useEffect(() => {
    // Check if the selected shift is Part-Time
    const isPartTime = formData.preferredShift === "Part-Time (Custom time slots)";
    
    // Show time slots only when Part-Time is selected
    setShowTimeSlots(isPartTime);
    
    // Update form with part-time status and clear time slots if not Part-Time
    setFormData(prev => ({
      ...prev, 
      isPartTime: isPartTime,
      preferredTimeSlots: isPartTime ? prev.preferredTimeSlots : []
    }));
  }, [formData.preferredShift]);

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

  const handleWorkingDaysChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData({ ...formData, preferredWorkingDays: typeof value === "string" ? value.split(",") : value });
  };

  const handleTimeSlotsChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData({ ...formData, preferredTimeSlots: typeof value === "string" ? value.split(",") : value });
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
   
    if (!nicRegex.test(formData.nic)) {
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
    if (formData.preferredWorkingDays.length === 0) {
      toast.error("Please select at least one working day");
      return false;
    }
    if (!formData.preferredShift) {
      toast.error("Please select a preferred shift");
      return false;
    }
    if (formData.preferredShift === "Part-Time (Custom time slots)" && formData.preferredTimeSlots.length === 0) {
      toast.error("Please select at least one time slot for part-time work");
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
              <TextField fullWidth name="nic" label="NIC" value={formData.nic} onChange={handleChange} required />
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
            
            {/* Preferred Working Days */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Working Days</InputLabel>
                <Select
                  multiple
                  name="preferredWorkingDays"
                  value={formData.preferredWorkingDays}
                  onChange={handleWorkingDaysChange}
                  input={<OutlinedInput label="Preferred Working Days" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {workingDaysList.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={formData.preferredWorkingDays.indexOf(day) > -1} />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Preferred Shift */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Preferred Shift</InputLabel>
                <Select 
                  name="preferredShift" 
                  value={formData.preferredShift} 
                  onChange={handleChange} 
                  label="Preferred Shift"
                >
                  <MenuItem value="">Select Shift</MenuItem>
                  {shiftOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Time Slots - Only shown if Part-Time is selected */}
            {showTimeSlots && (
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Preferred Time Slots</InputLabel>
                  <Select
                    multiple
                    name="preferredTimeSlots"
                    value={formData.preferredTimeSlots}
                    onChange={handleTimeSlotsChange}
                    input={<OutlinedInput label="Preferred Time Slots" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {timeSlotOptions.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        <Checkbox checked={formData.preferredTimeSlots.indexOf(slot) > -1} />
                        <ListItemText primary={slot} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            
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