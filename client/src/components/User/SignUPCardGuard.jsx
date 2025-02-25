import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon } from './CustomeIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '600px',
  minHeight: '500px',
  backgroundColor: '#00296b', // Deep blue background for card
  color: '#FFFFFF',
  paddingTop: theme.spacing(2),
  paddingBottom:theme.spacing(2),
  paddingLeft:theme.spacing(4),
  paddingRight:theme.spacing(4),

  gap: theme.spacing(2),
  borderRadius: '8px', // Rounded edges
  boxShadow: '0px 5px 15px rgba(0, 40, 85, 0.3)',
  marginRight: "20px",
  marginTop:"10px",
  marginBottom:"10px"
}));

export default function SignUPCardGuard() {
  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#A5C4D9' }}>
        Create an Account
      </Typography>
      <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        {[
          { label: 'Full Name', placeholder: 'John Doe' },
          { label: 'NIC', placeholder: '123456789V' },
          { label: 'Email', placeholder: 'your@email.com', type: 'email' },
          { label: 'Address', placeholder: '123 Street, City, Country' },
          { label: 'Phone Number', placeholder: '0771234567' },
          { label: 'Password', placeholder: '••••••', type: 'password' },
          { label: 'Confirm Password', placeholder: '••••••', type: 'password' },
        ].map(({ label, placeholder, type = 'text' }, index) => (
          <Grid container key={index} alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <FormLabel sx={{ color: '#AAB4BE', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{label}:</FormLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type={type}
                placeholder={placeholder}
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: '#025B8A', // Darker blue background for input fields
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  input: { color: '#FFFFFF' }, // Text color inside input fields
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
            backgroundColor: '#A5C4D9', // Lighter blue for the button
            color: '#013B66', // Dark blue text color
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#7AA1B1' }, // Slightly darker hover color
          }}
        >
          Sign Up
        </Button>
        <Typography sx={{ textAlign: 'center', color: '#AAB4BE' }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2" sx={{ color: '#A5C4D9', fontWeight: 'bold' }}>
            Sign in
          </Link>
        </Typography>
      </Box>
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
}
