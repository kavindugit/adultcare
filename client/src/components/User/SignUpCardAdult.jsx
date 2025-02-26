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
import { GoogleIcon } from './CustomeIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '600px',
  minHeight: '450px',
  backgroundColor: '#00296b',
  color: '#FFFFFF',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0px 5px 15px rgba(0, 40, 85, 0.3)',
  marginRight: '20px',
  marginTop: '10px',
  marginBottom: '10px',
}));

const SignUpCardAdult = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    nic: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    // Validate inputs
    if (!formData.nic || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Make the request
      axios.defaults.withCredentials = true;
      const { data } = await axios.post('http://localhost:4000/api/auth/register-adult-user', {
        nic: formData.nic,
        email: formData.email,
        phoneNo: formData.phone,
        password: formData.password,
      });

      console.log('Response Data:', data);

      if (data.success) {
        toast.success('Registration successful');
        navigate('/'); // Redirect to home after successful registration
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error signing up:', error.response ? error.response.data : error.message);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Card variant="outlined">
      <Box
        sx={{
          backgroundColor: '#FFD700',
          color: '#013B66',
          textAlign: 'center',
          padding: 2,
          borderRadius: '6px',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(255, 215, 0, 0.4)',
        }}
      >
        <Typography>
          Adults can only register if a guardian has added them first.
        </Typography>
      </Box>

      <Typography component="h1" variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#A5C4D9' }}>
        Create an Account
      </Typography>

      <form onSubmit={OnSubmitHandler} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          {[
            { id: 'nic', label: 'NIC', placeholder: '123456789V' },
            { id: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
            { id: 'phone', label: 'Phone Number', placeholder: '0771234567' },
            { id: 'password', label: 'Password', placeholder: '••••••', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', placeholder: '••••••', type: 'password' },
          ].map(({ id, label, placeholder, type = 'text' }, index) => (
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
            sx={{
              backgroundColor: '#A5C4D9',
              color: '#013B66',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#7AA1B1' },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </form>

      <Typography sx={{ textAlign: 'center', color: '#AAB4BE' }}>
        Already have an account?{' '}
        <Link href="/login" variant="body2" sx={{ color: '#A5C4D9', fontWeight: 'bold' }}>
          Sign in
        </Link>
      </Typography>

      <Divider sx={{ backgroundColor: '#2C3748' }}>or</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: '#013B66',
            color: '#A5C4D9',
            borderColor: '#AAB4BE',
            '&:hover': { backgroundColor: '#1A4D7E' },
          }}
        >
          Sign up with Google
        </Button>
      </Box>
    </Card>
  );
};

export default SignUpCardAdult;