import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '600px',
  minHeight: '500px',
  backgroundColor: '#00296b',
  color: '#FFFFFF',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0px 5px 15px rgba(0, 40, 85, 0.3)',
  margin: '10px 20px',
}));

export default function SignUPCard() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Make the request
      axios.defaults.withCredentials = true;
      const { data } = await axios.post('http://localhost:4000/api/auth/register', {
        fullName: formData.fullName,
        nic: formData.nic,
        email: formData.email,
        address: formData.address,
        phoneNo: formData.phone,
        password: formData.password,
        dob: formData.dob,
        gender: formData.gender,

      });

      console.log('Response Data:', data);

      if (data.success) {
        toast.success('Registration successful');
        navigate('/'); // Redirect to home after successful registration
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#A5C4D9' }}>
        Create an Account
      </Typography>

      <form onSubmit={OnSubmitHandler} style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
        {[
          { label: 'Full Name', id: 'fullName', placeholder: 'John Doe' },
          { label: 'NIC', id: 'nic', placeholder: '123456789V' },
          { label: 'Email', id: 'email', placeholder: 'your@email.com', type: 'email' },
          { label: 'Address', id: 'address', placeholder: '123 Street, City, Country' },
          { label: 'Phone Number', id: 'phone', placeholder: '0771234567' },
          { label: 'Date of Birth', id: 'dob', placeholder: 'YYYY-MM-DD', type: 'date' },
          { label: 'Gender', id: 'gender', placeholder: 'Male/Female', type: 'text' },
          { label: 'Password', id: 'password', placeholder: '••••••', type: 'password' },
          { label: 'Confirm Password', id: 'confirmPassword', placeholder: '••••••', type: 'password' },
        ].map(({ label, id, placeholder, type = 'text' }, index) => (
          <Grid container key={index} alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <FormLabel sx={{ color: '#AAB4BE', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{label}:</FormLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id={id}
                type={type}
                placeholder={placeholder}
                required
                fullWidth
                variant="outlined"
                size="small"
                value={formData[id]}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: '#025B8A',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  input: { color: '#FFFFFF' },
                }}
              />
            </Grid>
          </Grid>
        ))}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#A5C4D9', color: '#013B66', fontWeight: 'bold', '&:hover': { backgroundColor: '#7AA1B1' } }}
        >
          Sign Up
        </Button>

        <Typography sx={{ textAlign: 'center', color: '#AAB4BE' }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2" sx={{ color: '#A5C4D9', fontWeight: 'bold' }}>
            Sign in
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
