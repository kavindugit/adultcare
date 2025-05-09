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

const DoctorProfile = () => {
  const { userData } = useContext(AppContent);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consistent theme with AdultProfile
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
    const fetchDoctorDetails = async () => {
      try {
        if (!userData || !userData.userId) return;

        const doctorRes = await axios.get(`http://localhost:4000/api/employee/doctorProfile/${userData.userId}`);
        setDoctorInfo(doctorRes.data.data);
      } catch (error) {
        console.error('Error fetching doctor profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
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
          <Typography variant="h6" sx={{ color: elderBlissTheme.primary, fontWeight: 500 }}>
            Loading doctor profile...
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
              {userData.name || 'Doctor Name'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
              Doctor Profile
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
              {doctorInfo?.specialization && (
                <Chip 
                  icon={<SchoolIcon />} 
                  label={doctorInfo.specialization} 
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
                        <Typography variant="body2" color="textSecondary">Medical License</Typography>
                        <Typography variant="body1" fontWeight={500}>{doctorInfo?.medicalLicenseNumber}</Typography>
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
                        <Typography variant="body1" fontWeight={500}>
                          {doctorInfo?.licenseExpireDate ? new Date(doctorInfo.licenseExpireDate).toLocaleDateString() : 'N/A'}
                        </Typography>
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
                        <Typography variant="body1" fontWeight={500}>{doctorInfo?.nationalMedicalRegistrationNumber}</Typography>
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
                        <Typography variant="body1" fontWeight={500}>{doctorInfo?.yearsOfExperience} years</Typography>
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
                        <Typography variant="body1" fontWeight={500}>{doctorInfo?.currentHospital}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>

            {/* Specialization Details Card */}
            {doctorInfo && (
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
                        <Typography>{doctorInfo.specialization}</Typography>
                      </Box>
                    </Paper>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Subspecialities
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: elderBlissTheme.medicalLight }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {doctorInfo.subspecialities.length > 0 ? (
                          doctorInfo.subspecialities.map((sub, index) => (
                            <Chip key={index} label={sub} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                          ))
                        ) : (
                          <Typography>No subspecialities reported</Typography>
                        )}
                      </Stack>
                    </Paper>
                  </Box>
                </CardContent>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            {/* Availability Details Card */}
            {doctorInfo && (
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
                          <Typography variant="body2" color="textSecondary">Available Dates</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {doctorInfo.availableDate.map((date, index) => (
                              <Chip key={index} label={date} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                            ))}
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
                          <Typography variant="body2" color="textSecondary">Working Hours</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {doctorInfo.availableWorkingHours.map((time, index) => (
                              <Chip key={index} label={time} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                            ))}
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
                          <Typography variant="body2" color="textSecondary">Consultation Fee</Typography>
                          <Typography variant="body1" fontWeight={500}>${doctorInfo.consultationFee}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            )}

            {/* Contact Details Card */}
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
                        <Typography variant="body1" fontWeight={500}>{userData.phoneNo}</Typography>
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
                        <Typography variant="body1" fontWeight={500}>{userData.email}</Typography>
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
                        <Typography variant="body1" fontWeight={500}>{userData.address}</Typography>
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
                          {doctorInfo?.languagesSpoken.length > 0 ? (
                            doctorInfo.languagesSpoken.map((lang, index) => (
                              <Chip key={index} label={lang} sx={{ bgcolor: elderBlissTheme.successLight, color: elderBlissTheme.success }} />
                            ))
                          ) : (
                            <Typography>No languages reported</Typography>
                          )}
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

export default DoctorProfile;