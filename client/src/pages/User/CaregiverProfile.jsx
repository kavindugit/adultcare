import { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardContent, CircularProgress,
  Avatar, Box, Divider, Paper, Chip, Rating, LinearProgress
} from '@mui/material';
import ElderlyIcon from '@mui/icons-material/Elderly';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import BuildIcon from '@mui/icons-material/Build';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const CaregiverProfile = () => {
  const { userData } = useContext(AppContent);
  const [caregiverInfo, setCaregiverInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregiverData = async () => {
      if (!userData || !userData.userId) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/caregiver/getdata/${userData.userId}`);
        setCaregiverInfo(res.data.data);
      } catch (err) {
        console.error("Error fetching caregiver info:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userData && userData.userId) {
      fetchCaregiverData();
    } else {
      setLoading(false); // prevent infinite spinner
    }
  }, [userData]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '80vh'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#43a047' }} />
        <Typography variant="h6" sx={{ mt: 2, color: '#555' }}>
          Loading your profile...
        </Typography>
      </Box>
    );
  }

  if (!userData || !userData.userId) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          textAlign: 'center', 
          mt: 10, 
          p: 4, 
          borderRadius: 2,
          maxWidth: 500,
          mx: 'auto',
          backgroundColor: '#fff8e1'
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Not Logged In
        </Typography>
        <Typography variant="body1">
          Please log in to view your caregiver profile.
        </Typography>
      </Paper>
    );
  }

  // Skill level visualization
  const getSkillLevel = (skill) => {
    const skillLevels = {
      'Elder Care': 5,
      'Medication Management': 4,
      'First Aid': 4,
      'Cooking': 3,
      'Mobility Assistance': 5,
      'Dementia Care': 4
    };
    return skillLevels[skill] || 3;
  };

  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'white', 
                mr: 3,
                border: '3px solid white'
              }}
            >
              <PersonIcon sx={{ fontSize: 40, color: '#43a047' }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {userData.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Professional Caregiver
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#43a047', 
                color: 'white',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              }}>
                <Typography variant="h6" fontWeight="medium">
                  Contact Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                    <EmailIcon sx={{ color: '#43a047' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Email</Typography>
                    <Typography variant="body1">{userData.email}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                    <PhoneIcon sx={{ color: '#43a047' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Phone</Typography>
                    <Typography variant="body1">{userData.phoneNo}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                    <HomeIcon sx={{ color: '#43a047' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Address</Typography>
                    <Typography variant="body1">{userData.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Paper>
          </Grid>

          {/* Professional Information */}
          <Grid item xs={12} md={7}>
            {caregiverInfo ? (
              <Paper elevation={2} sx={{ borderRadius: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#43a047', 
                  color: 'white',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                }}>
                  <Typography variant="h6" fontWeight="medium">
                    Professional Details
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                          <WorkIcon sx={{ color: '#43a047' }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Experience</Typography>
                          <Typography variant="h6">{caregiverInfo.yearsOfExperience} years</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                          <AccessTimeIcon sx={{ color: '#43a047' }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Working Hours</Typography>
                          <Typography variant="h6">{caregiverInfo.preferredWorkHours}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <LanguageIcon sx={{ color: '#43a047', mr: 1 }} />
                          <Typography variant="body1" fontWeight="medium">Languages</Typography>
                        </Box>
                        <Box sx={{ ml: 4 }}>
                          {caregiverInfo.languagesSpoken.split(',').map((lang, idx) => (
                            <Chip 
                              key={idx} 
                              label={lang.trim()} 
                              sx={{ 
                                m: 0.5, 
                                bgcolor: '#e8f5e9', 
                                color: '#2e7d32',
                                fontWeight: 'medium'
                              }} 
                            />
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: '#e8f5e9', mr: 2 }}>
                          <PaidIcon sx={{ color: '#43a047' }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Hourly Rate</Typography>
                          <Typography variant="h6">${caregiverInfo.salary}/hr</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            ) : (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="error">
                  Professional information unavailable
                </Typography>
                <Typography variant="body1">
                  Please complete your professional profile.
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Skills */}
          {caregiverInfo && caregiverInfo.skills && caregiverInfo.skills.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ borderRadius: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#43a047', 
                  color: 'white',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                }}>
                  <Box display="flex" alignItems="center">
                    <BuildIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="medium">Skills & Expertise</Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {caregiverInfo.skills.map((skill, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box mb={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body1">{skill}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {getSkillLevel(skill)}/5
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={getSkillLevel(skill) * 20} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 1,
                              bgcolor: '#e8f5e9',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#43a047'
                              }
                            }} 
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CaregiverProfile;