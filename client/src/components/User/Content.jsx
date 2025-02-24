import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SitemarkIcon } from './CustomeIcons';

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
        maxWidth: '100%',
        height: '100%', // Ensures it takes full height of its container
      }}
    >
      <Box sx={{ display: 'none' }}>
        <SitemarkIcon />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden', // Prevents overflow if the image's aspect ratio doesn't match
        }}
      >
        <img
          src="https://marywade.org/wp-content/uploads/2024/01/shutterstock_2291576643.jpg"
          alt="Content Visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the area without stretching
            borderRadius: '0px',
          }}
        />
      </Box>
    </Stack>
  );
}
