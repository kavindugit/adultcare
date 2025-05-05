import React, { useState } from "react";
import axios from "axios";
import {
  TextField, Button, Box, MenuItem, Typography, Paper
} from "@mui/material";
import { toast } from "sonner";

const BookingForm = ({ fetchReservations }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    date: '',
    startTime: '',
    endTime: '',
    patientName: '',
    patientEmail: '',
    notes: '',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
  const { serviceName, date, startTime, endTime, patientName, patientEmail, price } = formData;

  if (!serviceName || !date || !startTime || !endTime || !patientName || !patientEmail) {
    toast.error("All fields except notes are required.");
    return false;
  }

  

  return true;
};


  // Submit form data
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4003/api/reservations", formData);
      
      if (response.status === 201) {
        toast.success("Reservation created successfully!");
        setFormData({
          serviceName: '', date: '', startTime: '', endTime: '',
          patientName: '', patientEmail: '', notes: '', status: 'pending'
        });
        if (fetchReservations) fetchReservations();
      }
    } catch (err) {
      console.error("Error creating reservation:", err);
      toast.error(err.response?.data?.error || "Failed to create reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Create a Reservation</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField name="serviceName" label="Service Name" value={formData.serviceName} onChange={handleChange} fullWidth required />
        <TextField type="date" name="date" label="Date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} required />
        <TextField type="time" name="startTime" label="Start Time" InputLabelProps={{ shrink: true }} value={formData.startTime} onChange={handleChange} required />
        <TextField type="time" name="endTime" label="End Time" InputLabelProps={{ shrink: true }} value={formData.endTime} onChange={handleChange} required />
        <TextField name="patientName" label="Patient Name" value={formData.patientName} onChange={handleChange} required />
        <TextField name="patientEmail" label="Patient Email" type="email" value={formData.patientEmail} onChange={handleChange} required />
        <TextField name="notes" label="Notes" value={formData.notes} onChange={handleChange} multiline rows={3} />
        <TextField
          select name="status" label="Status" value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Create Reservation"}
        </Button>
      </Box>
    </Paper>
  );
};

export default BookingForm;
