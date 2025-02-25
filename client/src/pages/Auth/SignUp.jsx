import React, { useState } from 'react';
import { CssBaseline, Stack, Button, Typography, Card } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Person, FamilyRestroom } from '@mui/icons-material';
import ContentSignup from '../../components/User/ContentSignup';
import SignUpCardAdult from '../../components/User/SignUpCardAdult';
import SignUPCardGuard from '../../components/User/SignUPCardGuard';

function SignUp() {
  const [selectedForm, setSelectedForm] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if it's a mobile device

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
        {!isMobile && (
          <ContentSignup
            sx={{
              width: '30%',
              height: '100%',
              color: '#FFD700', // Gold color for Elder Bliss on large screens
            }}
          />
        )}
        <Stack
          sx={{
            width: isMobile ? '100%' : '70%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #A5C4D9', // Border added around the button section
            borderRadius: '0px',
            padding: isMobile ? '20px' : '40px',
            backgroundColor: '#F2F9FF', // Light background to make it stand out
          }}
        >
          {isMobile ? (
            <Stack spacing={3} alignItems="center">
              {/* Sign-Up Buttons with Styled Cards */}
              <Stack spacing={2}>
                {/* Sign Up as Adult */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      backgroundColor: '#A5C4D9',
                      width: '250px',
                      cursor: 'pointer',
                      boxShadow: 3,
                      transition: '0.3s ease',
                      '&:hover': { boxShadow: 6 },
                    }}
                    onClick={() => setSelectedForm('adult')}
                  >
                    <Typography
                      sx={{ color: '#013B66', fontWeight: 'bold', fontSize: '16px' }}
                    >
                      Sign Up as Adult
                    </Typography>
                    <Person sx={{ color: '#013B66' }} />
                  </Card>
                </motion.div>

                {/* Sign Up as Guardian */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      backgroundColor: '#A5C4D9',
                      width: '250px',
                      cursor: 'pointer',
                      boxShadow: 3,
                      transition: '0.3s ease',
                      '&:hover': { boxShadow: 6 },
                    }}
                    onClick={() => setSelectedForm('guardian')}
                  >
                    <Typography
                      sx={{ color: '#013B66', fontWeight: 'bold', fontSize: '16px' }}
                    >
                      Sign Up as Guardian
                    </Typography>
                    <FamilyRestroom sx={{ color: '#013B66' }} />
                  </Card>
                </motion.div>
              </Stack>
            </Stack>
          ) : selectedForm === null ? (
            <Stack spacing={2}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#A5C4D9',
                    width: '250px',
                    cursor: 'pointer',
                    boxShadow: 3,
                    transition: '0.3s ease',
                    '&:hover': { boxShadow: 6 },
                  }}
                  onClick={() => setSelectedForm('adult')}
                >
                  <Typography
                    sx={{ color: '#013B66', fontWeight: 'bold', fontSize: '16px' }}
                  >
                    Sign Up as Adult
                  </Typography>
                  <Person sx={{ color: '#013B66' }} />
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#A5C4D9',
                    width: '250px',
                    cursor: 'pointer',
                    boxShadow: 3,
                    transition: '0.3s ease',
                    '&:hover': { boxShadow: 6 },
                  }}
                  onClick={() => setSelectedForm('guardian')}
                >
                  <Typography
                    sx={{ color: '#013B66', fontWeight: 'bold', fontSize: '16px' }}
                  >
                    Sign Up as Guardian
                  </Typography>
                  <FamilyRestroom sx={{ color: '#013B66' }} />
                </Card>
              </motion.div>
            </Stack>
          ) : (
            <Stack spacing={2} alignItems="center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {selectedForm === 'adult' ? <SignUpCardAdult /> : <SignUPCardGuard />}
              </motion.div>

              <Button
  variant="outlined"
  sx={{
    color: '#FFFFFF', // White text for contrast
    borderColor: '#0353a4', // A more prominent border color
    fontWeight: 'bold',
    backgroundColor: '#0353a4', // Background color to match the overall theme
    '&:hover': {
      backgroundColor: '#013B66', // Darker shade when hovered for better contrast
      borderColor: '#013B66', // Matching border color on hover
    },
    padding: '10px 20px',
    borderRadius: '8px', // Rounded corners for a smooth look
  }}
  onClick={() => setSelectedForm(null)}
>
  Back to Selection
</Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default SignUp;
