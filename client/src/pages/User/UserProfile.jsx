import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import { Container, Typography, Card, CardContent, Grid, TextField, Button, CircularProgress } from '@mui/material';
import BasicInfoCard from '../../components/User/BasicInfoCard';

const UserProfile = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate(); // ✅ to navigate to Register Adult page

  const handleRegisterAdult = () => {
    navigate('/adult-registration');
  };

  if (!userData) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <BasicInfoCard userData={userData} editMode={false} handleInputChange={() => {}} />

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Account Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Role" value={userData.role} fullWidth disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Status" value={userData.status} fullWidth disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Verification Status" value={userData.isVerified ? 'Verified' : 'Not Verified'} fullWidth disabled />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4, backgroundColor: '#fff9c4' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            To register an adult and manage care, please upgrade your account by adding an adult under your care.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleRegisterAdult}
          >
            Register an Adult
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
