import { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, CircularProgress,
  Avatar, Box, Divider, Paper, Chip, Stack
} from '@mui/material';

// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

const NurseProfile = () => {
  const { userData } = useContext(AppContent);
  const [nurseInfo, setNurseInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consistent theme with DoctorProfile
  const elderBlissTheme = {
    primary: '#1e4d8c',
    primaryLight: '#e6eef7',
    secondary: '#5c93d6',
    accent: '#ffa726',
    accentLight: '#fff3e0',
    success: '#4caf50',
    successLight: '#e8f5e9',
    pending: '#ff9800',
    pendingLight: '#fff3e0',
    medical: '#f44336',
    medicalLight: '#ffebee',
    lifestyle: '#9c27b0',
    lifestyleLight: '#f3e5f5',
    background: '#f8fafd',
    white: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#607d8b',
    divider: '#e0e6ed'
  };

  useEffect(() => {
    const fetchNurseDetails = async () => {
      try {
        if (!userData || !userData.userId) return;

        const nurseRes = await axios.get(`http://localhost:4000/api/employee/nurseProfile/${userData.userId}`);
        setNurseInfo(nurseRes.data.data);
      } catch (error) {
        console.error('Error fetching nurse profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNurseDetails();
  }, [userData]);

  if (loading || !userData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '70vh', 
        backgroundColor: elderBlissTheme.background 
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} sx={{ color: elderBlissTheme.primary, mb: 2 }} />
          <Typography variant="h4" sx={{ color: elderBlissTheme.primary, fontWeight: 500 }}>
            Loading nurse profile...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: elderBlissTheme.background, 
      minHeight: '100vh', 
      py: 4 
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper elevation={3} sx={{ 
          borderRadius: '16px', 
          mb: 4, 
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${elderBlissTheme.primary} 30%, ${elderBlissTheme.secondary} 100%)`
        }}>
          <Box sx={{ 
            py: 4, 
            px: 3, 
            textAlign: 'center',
            color: '#fff'
          }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                mx: 'auto', 
                mb: 2,
                border: '4px solid white',
                backgroundColor: elderBlissTheme.secondary
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {userData.name || 'Nurse Name'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
              Nurse Profile
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}>
              <Chip 
                icon={<EmailIcon />} 
                label={userData.email || 'email@example.com'} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: '#fff',
                  '& .MuiChip-icon': { color: '#fff' }
                }} 
              />
              <Chip 
                icon={<PhoneIcon />} 
                label={userData.phoneNo || 'N/A'} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: '#fff',
                  '& .MuiChip-icon': { color: '#fff' }
                }} 
              />
              {nurseInfo?.specialization && (
                <Chip 
                  icon={<SchoolIcon />} 
                  label={nurseInfo.specialization} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: '#fff',
                    '& .MuiChip-icon': { color: '#fff' }
                  }} 
                />
              )}
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Professional Information Card */}
            <Paper elevation={3} sx={{ 
              borderRadius: '16px', 
              mb: 4,
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                bgcolor: elderBlissTheme.primaryLight, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                borderBottom: `1px solid ${elderBlissTheme.divider}`
              }}>
                <BadgeIcon sx={{ color: elderBlissTheme.primary, mr: 1 }} />
                <Typography variant="h6" sx={{ color: elderBlissTheme.primary, fontWeight: 500 }}>
                  Professional Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <BadgeIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Nursing License</Typography>
                        <Typography variant="body1" fontWeight={500}>{nurseInfo?.licenseNumber || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <CalendarTodayIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">License Expiry</Typography>
                        <Typography variant="body1" fontWeight={500}>{'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <BadgeIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Registration Number</Typography>
                        <Typography variant="body1" fontWeight={500}>{'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <WorkIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Years of Experience</Typography>
                        <Typography variant="body1" fontWeight={500}>{nurseInfo?.yearsOfExperience || 'N/A'} years</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <BusinessIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Current Hospital</Typography>
                        <Typography variant="body1" fontWeight={500}>{'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>

            {/* Specialization Information Card */}
            {nurseInfo && (
              <Paper elevation={3} sx={{ 
                borderRadius: '16px', 
                mb: 4,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  bgcolor: elderBlissTheme.medicalLight, 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  borderBottom: `1px solid ${elderBlissTheme.divider}`
                }}>
                  <SchoolIcon sx={{ color: elderBlissTheme.medical, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: elderBlissTheme.medical, fontWeight: 500 }}>
                    Specialization Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Specialization
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: elderBlissTheme.medicalLight }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon sx={{ color: elderBlissTheme.medical, mr: 1 }} />
                        <Typography>{nurseInfo.specialization || 'N/A'}</Typography>
                      </Box>
                    </Paper>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Certifications
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: elderBlissTheme.medicalLight }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {nurseInfo.certifications && nurseInfo.certifications.length > 0 ? (
                          nurseInfo.certifications.map((cert, index) => (
                            <Chip key={index} label={cert} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                          ))
                        ) : (
                          <Typography>No certifications reported</Typography>
                        )}
                      </Stack>
                    </Paper>
                  </Box>
                </CardContent>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            {/* Availability Information Card */}
            {nurseInfo && (
              <Paper elevation={3} sx={{ 
                borderRadius: '16px', 
                mb: 4,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  bgcolor: elderBlissTheme.lifestyleLight, 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  borderBottom: `1px solid ${elderBlissTheme.divider}`
                }}>
                  <AccessTimeIcon sx={{ color: elderBlissTheme.lifestyle, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: elderBlissTheme.lifestyle, fontWeight: 500 }}>
                    Availability Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <CalendarTodayIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Preferred Working Days</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {nurseInfo.preferredWorkingDays && nurseInfo.preferredWorkingDays.length > 0 ? (
                              nurseInfo.preferredWorkingDays.map((day, index) => (
                                <Chip key={index} label={day} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                              ))
                            ) : (
                              <Typography>No days reported</Typography>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <AccessTimeIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Preferred Time Slots</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {nurseInfo.preferredTimeSlots && nurseInfo.preferredTimeSlots.length > 0 ? (
                              nurseInfo.preferredTimeSlots.map((time, index) => (
                                <Chip key={index} label={time} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                              ))
                            ) : (
                              <Typography>No time slots reported</Typography>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <MonetizationOnIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Salary</Typography>
                          <Typography variant="body1" fontWeight={500}>${nurseInfo.salary || 'N/A'}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            )}

            {/* Contact Information Card */}
            <Paper elevation={3} sx={{ 
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                bgcolor: elderBlissTheme.accentLight, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                borderBottom: `1px solid ${elderBlissTheme.divider}`
              }}>
                <PhoneIcon sx={{ color: elderBlissTheme.accent, mr: 1 }} />
                <Typography variant="h6" sx={{ color: elderBlissTheme.accent, fontWeight: 500 }}>
                  Contact Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                        <PhoneIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Phone</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.phoneNo || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                        <EmailIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Email</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.email || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                        <LocationOnIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Address</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.address || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                        <TranslateIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Languages Spoken</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          <Typography>No languages reported</Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NurseProfile;