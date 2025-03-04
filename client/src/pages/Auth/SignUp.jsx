import React, { useState } from 'react';
import { CssBaseline, Stack, Card, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Person } from '@mui/icons-material';
import ContentSignup from '../../components/User/ContentSignup';
import SignUPCard from '../../components/User/SignUPCard';


function SignUp() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <CssBaseline />
      <Stack
        direction={isMobile ? 'column' : 'row'}
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: '#0353a4',
        }}
      >
        {/* Left Side Content (Desktop Only) */}
        {!isMobile && (
          <ContentSignup
            sx={{
              width: '26%',
              height: '100%',
              color: '#FFD700',
            }}
          />
        )}

        {/* Right Side Content */}
        <Stack
          sx={{
            width: isMobile ? '100%' : '74%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #A5C4D9',
            borderRadius: '0px',
            padding: isMobile ? '20px' : '40px',
            backgroundColor: '#F2F9FF',
          }}
        >
          {/* Render SignUpCardAdult directly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SignUPCard/>
          </motion.div>
        </Stack>
      </Stack>
    </>
  );
}

export default SignUp;
