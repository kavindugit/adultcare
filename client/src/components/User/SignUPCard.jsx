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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  // ✅ Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.nic) newErrors.nic = 'NIC is required';

    // Email format validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.address) newErrors.address = 'Address is required';

    // Phone number validation (e.g., starts with +94 and at least 10 digits after that)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must start with country code, e.g., +94771234567';
    }

    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
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

      if (data.success) {
        toast.success('Registration successful');
        navigate('/');
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
          { label: 'Phone Number', id: 'phone', placeholder: '+94771234567' },
          { label: 'Date of Birth', id: 'dob', type: 'date' },
          { label: 'Gender', id: 'gender', placeholder: 'Male/Female' },
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
                error={!!errors[id]}
                helperText={errors[id]}
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
