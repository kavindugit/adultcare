import { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, CircularProgress,
  Avatar, Box, Divider, Paper, Chip, Stack
} from '@mui/material';

// Icons
import ElderlyIcon from '@mui/icons-material/Elderly';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import HomeIcon from '@mui/icons-material/Home';
import TranslateIcon from '@mui/icons-material/Translate';
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';

const AdultProfile = () => {
  const { userData } = useContext(AppContent);
  const [adultInfo, setAdultInfo] = useState(null);
  const [guardianInfo, setGuardianInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Matching the elderBlissTheme from Guardian Profile for consistency
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
    const fetchAdultDetails = async () => {
      try {
        if (!userData || !userData.userId) return;

        const adultRes = await axios.get(`http://localhost:4000/api/adult/adultProfile/${userData.userId}`);
        setAdultInfo(adultRes.data.data);

        // Updated API endpoint to match the controller
        const guardianRes = await axios.get(`http://localhost:4000/api/guardian/guardian-by-adult/${userData.userId}`);
        setGuardianInfo(guardianRes.data.guardian);
      } catch (error) {
        console.error('Error fetching adult profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdultDetails();
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
            Loading your profile...
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
              <ElderlyIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {userData.name || 'Adult Name'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
              Adult Profile
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}>
              {adultInfo?.bloodGroup && (
                <Chip 
                  icon={<LocalHospitalIcon />} 
                  label={`Blood: ${adultInfo.bloodGroup}`} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: '#fff',
                    '& .MuiChip-icon': { color: '#fff' }
                  }} 
                />
              )}
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
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Personal Information Card */}
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
                <ElderlyIcon sx={{ color: elderBlissTheme.primary, mr: 1 }} />
                <Typography variant="h6" sx={{ color: elderBlissTheme.primary, fontWeight: 500 }}>
                  Personal Information
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
                        <Typography variant="body2" color="textSecondary">NIC</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.nic}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <WcIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Gender</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.gender}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <CakeIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Date of Birth</Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {new Date(userData.dob).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <PhoneIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Phone</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.phoneNo}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar sx={{ bgcolor: elderBlissTheme.primaryLight, mr: 2, width: 36, height: 36 }}>
                        <LocationOnIcon sx={{ color: elderBlissTheme.primary, fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Address</Typography>
                        <Typography variant="body1" fontWeight={500}>{userData.address}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>

            {/* Medical Details Card */}
            {adultInfo && (
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
                  <LocalHospitalIcon sx={{ color: elderBlissTheme.medical, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: elderBlissTheme.medical, fontWeight: 500 }}>
                    Medical Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Chronic Conditions
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: elderBlissTheme.medicalLight }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <MonitorHeartIcon sx={{ color: elderBlissTheme.medical, mr: 1, mt: 0.5 }} />
                        <Typography>
                          {adultInfo.chronicConditions || 'None reported'}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Medications
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: elderBlissTheme.medicalLight }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <MedicationIcon sx={{ color: elderBlissTheme.medical, mr: 1, mt: 0.5 }} />
                        <Typography>
                          {adultInfo.medications || 'None reported'}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </CardContent>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            {/* Lifestyle Details Card */}
            {adultInfo && (
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
                  <RestaurantIcon sx={{ color: elderBlissTheme.lifestyle, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: elderBlissTheme.lifestyle, fontWeight: 500 }}>
                    Lifestyle Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <RestaurantIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Dietary Preference</Typography>
                          <Typography variant="body1" fontWeight={500}>{adultInfo.dietaryPreference}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <TranslateIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Preferred Language</Typography>
                          <Typography variant="body1" fontWeight={500}>{adultInfo.preferredLanguage}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <SmokingRoomsIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Smoking Status</Typography>
                          <Chip 
                            label={adultInfo.smokingStatus} 
                            size="small"
                            sx={{ 
                              bgcolor: adultInfo.smokingStatus === 'Non-smoker' ? elderBlissTheme.successLight : elderBlissTheme.pendingLight,
                              color: adultInfo.smokingStatus === 'Non-smoker' ? elderBlissTheme.success : elderBlissTheme.pending,
                            }} 
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <LocalBarIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Drinking Status</Typography>
                          <Chip 
                            label={adultInfo.drinkingStatus} 
                            size="small"
                            sx={{ 
                              bgcolor: adultInfo.drinkingStatus === 'Non-drinker' ? elderBlissTheme.successLight : elderBlissTheme.pendingLight,
                              color: adultInfo.drinkingStatus === 'Non-drinker' ? elderBlissTheme.success : elderBlissTheme.pending,
                            }} 
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.lifestyleLight, mr: 2, width: 36, height: 36 }}>
                          <HomeIcon sx={{ color: elderBlissTheme.lifestyle, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Home Type</Typography>
                          <Typography variant="body1" fontWeight={500}>{adultInfo.homeType}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            )}

            {/* Guardian Details Card */}
            {guardianInfo && (
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
                  <FamilyRestroomIcon sx={{ color: elderBlissTheme.accent, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: elderBlissTheme.accent, fontWeight: 500 }}>
                    Guardian Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: elderBlissTheme.accent, 
                        width: 64, 
                        height: 64,
                        mb: 1
                      }}
                    >
                      <FamilyRestroomIcon sx={{ fontSize: 36 }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={500}>{guardianInfo.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Primary Guardian</Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                          <BadgeIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">User ID</Typography>
                          <Typography variant="body1" fontWeight={500}>{guardianInfo.userId}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                          <PhoneIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Phone</Typography>
                          <Typography variant="body1" fontWeight={500}>{guardianInfo.phoneNo}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: elderBlissTheme.accentLight, mr: 2, width: 36, height: 36 }}>
                          <EmailIcon sx={{ color: elderBlissTheme.accent, fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="textSecondary">Email</Typography>
                          <Typography variant="body1" fontWeight={500}>{guardianInfo.email}</Typography>
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
                          <Typography variant="body1" fontWeight={500}>{guardianInfo.address}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdultProfile;