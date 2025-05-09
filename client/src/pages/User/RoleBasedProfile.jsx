import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';

import { CircularProgress, Box, Typography } from '@mui/material';
import DoctorProfile from './DoctorProfile';
import GuardianProfile from './GuardianProfile';
import AdultProfile from './AdutProfile';
import NurseProfile from './NurseProfile';
import CaregiverProfile from './CaregiverProfile';

const RoleBasedProfile = () => {
  const { userData } = useContext(AppContent);

  // Show loading state if userData is not yet available
  if (!userData) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} sx={{ color: '#1e4d8c', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#1e4d8c', fontWeight: 500 }}>
            Loading user profile...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Map roles to profile components
  const profileMap = {
    doctor: <DoctorProfile />,
    guardian: <GuardianProfile/>,
    adult: <AdultProfile />,
    nurse: <NurseProfile />,
    caregiver: <CaregiverProfile />,
  };

  // Get the component based on the user's role
  const ProfileComponent = profileMap[userData.role?.toLowerCase()];

  // If role is valid and component exists, render it; otherwise, redirect to a fallback route
  if (ProfileComponent) {
    return ProfileComponent;
  }

  // Redirect to a default route or show an error if role is invalid
  return <Navigate to="/unauthorized" replace />;
};

export default RoleBasedProfile;