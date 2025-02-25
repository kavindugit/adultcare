import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';

import Content from '../../components/User/Content';
import SignInCard from '../../components/User/SignInCard';

function Login() {
  return (
    <>
      <CssBaseline />
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens, horizontally on larger ones
        sx={{
          height: '100vh', // Full height of the viewport
          width: '100vw', // Full width of the viewport
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: '#0353a4', // Set background color for the entire page
        }}
      >
        <Content sx={{ width: { xs: '100%', sm: '55%' }, height: '100%' }} />
        <Stack
          sx={{
            width: { xs: '100%', sm: '45%' }, // Full width on small screens
            height: '100%', // Ensure SignInCard container takes full height
            display: 'flex',
            justifyContent: 'center', // Center SignInCard vertically
            alignItems: 'center', // Center SignInCard horizontally
          }}
        >
          <SignInCard />
        </Stack>
      </Stack>
    </>
  );
}

export default Login;
