import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeartIcon, ShieldIcon, UsersIcon } from 'lucide-react'; 

export default function ContentSignup() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 3,
        maxWidth: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 4,
        position: 'relative',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)', // Darken the background image for better contrast
        }}
      />

      {/* Company Branding - Elder Bliss */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(90deg, #FFD700, #FFA500)', // Gold gradient effect
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Elder Bliss
        </Typography>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Join Elder Bliss Today!
        </Typography>
      </motion.div>

      {/* Company Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="body1" sx={{ color: '#E0E0E0', maxWidth: '80%' }}>
          Sign up to create an account and access personalized healthcare solutions for your loved ones. 

          We offer a <strong style={{ color: '#FFD700' }}>safe, comfortable, and connected</strong> environment for elders.
        </Typography>
      </motion.div>

      {/* Feature Section */}
      <Stack direction="row" spacing={3}>
        {[
          { icon: <HeartIcon size={30} />, title: 'Medicine Services', desc: 'Get prescribed medicine delivered directly to your door.' },
          { icon: <ShieldIcon size={30} />, title: 'Doctor Consultations', desc: 'Access professional consultations with experienced doctors.' },
          { icon: <UsersIcon size={30} />, title: 'Trained Caregivers', desc: 'Personalized care from trained caregivers to ensure your well-being.' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.3 }}
          >
            <Stack spacing={1} alignItems="center">
              <Box sx={{ color: '#FFFFFF' }}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E0E0E0', maxWidth: '200px' }}>
                {feature.desc}
              </Typography>
            </Stack>
          </motion.div>
        ))}
      </Stack>
    </Stack>
  );
}
