import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { state } = useLocation(); // Accessing the passed state from navigation
  const navigate = useNavigate(); // To navigate back if needed

  // Initializing formData with the email passed via state
  const [formData, setFormData] = useState({ email: state?.email || '', otp: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Effect to handle when the state is not passed (e.g., user navigates directly to this page)
  useEffect(() => {
    if (!state?.email) {
      navigate('/'); // Redirect to homepage or login if email isn't passed
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
  
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/auth/reset-password', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
  
      if (response.data.success) {
        setMessage(response.data.message);
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error); // Log the error for debugging
    }
  };
  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>Reset Password</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email} // Pre-filling the email field
            onChange={handleChange}
            disabled
          />
          <TextField fullWidth margin="normal" label="OTP" name="otp" required onChange={handleChange} />
          <TextField fullWidth margin="normal" label="New Password" name="newPassword" type="password" required onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Confirm Password" name="confirmPassword" type="password" required onChange={handleChange} />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Reset Password</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
