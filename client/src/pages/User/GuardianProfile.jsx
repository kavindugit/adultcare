import React, { useContext, useState, useEffect } from 'react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, CardContent,
  List, ListItem, ListItemText, Button, CircularProgress,
  Avatar, Paper, Grid, ListItemAvatar, Chip,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BasicInfoCard from '../../components/User/BasicInfoCard';

const GuardianProfile = () => {
  const { userData } = useContext(AppContent);
  const [linkedAdults, setLinkedAdults] = useState([]);
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

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
    danger: '#f44336',
    dangerLight: '#ffebee',
    background: '#f8fafd',
    white: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#607d8b',
    divider: '#e0e6ed'
  };

  useEffect(() => {
    const fetchLinkedAdults = async () => {
      try {
        if (!userData?.userId) return;
        const response = await axios.get(`http://localhost:4000/api/adult/adult-by-guardian/${userData.userId}`);
        setLinkedAdults(response.data.adults || []);
      } catch {
        setLinkedAdults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLinkedAdults();
  }, [userData]);

  useEffect(() => {
    const fetchRegistrationRequests = async () => {
      try {
        if (!userData?.userId) return;
        const response = await axios.get(`http://localhost:4000/api/registration-request/request/${userData.userId}`);
        setRegistrationRequests(response.data.pendingRequests || []);
      } catch {
        setRegistrationRequests([]);
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchRegistrationRequests();
  }, [userData]);

  const handleConfirmRequest = (request) => {
    setSelectedRequest(request);
    setConfirmDialogOpen(true);
  };

  const handleRejectRequest = (request) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleRejectDialogClose = () => {
    setRejectDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleConfirmRegistration = async () => {
    try {
      if (!selectedRequest) return;
      await axios.get(`http://localhost:4000/api/registration-request/approve/${selectedRequest.requestId}`);
      setRegistrationRequests(prev => prev.filter(req => req.requestId !== selectedRequest.requestId));
      const response = await axios.get(`http://localhost:4000/api/adult/adult-by-guardian/${userData.userId}`);
      setLinkedAdults(response.data.adults || []);
      setConfirmDialogOpen(false);
    } catch {
      setConfirmDialogOpen(false);
    }
  };

  const handleRejectRegistration = async () => {
    try {
      if (!selectedRequest) return;
      await axios.get(`http://localhost:4000/api/registration-request/reject/${selectedRequest.requestId}`);
      setRegistrationRequests(prev => prev.filter(req => req.requestId !== selectedRequest.requestId));
      setRejectDialogOpen(false);
    } catch {
      setRejectDialogOpen(false);
    }
  };

  if (!userData?.userId || loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', backgroundColor: elderBlissTheme.background }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: elderBlissTheme.primary, mb: 2 }} />
          <Typography variant="h6" sx={{ color: elderBlissTheme.primary }}>
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
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {userData.name || 'Guardian Name'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
              Guardian Profile
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}>
              <Chip 
                label={userData.email || 'email@example.com'} 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} 
              />
              <Chip 
                label={userData.phoneNo || 'N/A'} 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} 
              />
              <Chip 
                label={userData.address ? userData.address.substring(0, 20) + (userData.address.length > 20 ? '...' : '') : 'N/A'} 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} 
              />
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {/* Personal Information Card */}
            <Paper elevation={3} sx={{ 
              borderRadius: '16px', 
              mb: 3, 
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                bgcolor: elderBlissTheme.primary, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <AccountCircleIcon sx={{ color: 'white', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Personal Information
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <BasicInfoCard userData={userData} editMode={false} handleInputChange={() => {}} />
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    mt: 2, 
                    borderColor: elderBlissTheme.primary,
                    color: elderBlissTheme.primary
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Paper>

            {/* Dashboard Stats Card */}
            <Paper elevation={3} sx={{ 
              borderRadius: '16px', 
              mb: 3,
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                bgcolor: elderBlissTheme.primary, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <SupervisedUserCircleIcon sx={{ color: 'white', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Dashboard
                </Typography>
              </Box>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper elevation={1} sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: '12px',
                      bgcolor: elderBlissTheme.successLight
                    }}>
                      <Typography variant="h4" sx={{ color: elderBlissTheme.success, fontWeight: 'bold' }}>
                        {linkedAdults.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: elderBlissTheme.textSecondary }}>
                        Adults Linked
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={1} sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: '12px',
                      bgcolor: elderBlissTheme.pendingLight
                    }}>
                      <Typography variant="h4" sx={{ color: elderBlissTheme.pending, fontWeight: 'bold' }}>
                        {registrationRequests.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: elderBlissTheme.textSecondary }}>
                        Pending Requests
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Registration Requests */}
            {!requestsLoading && registrationRequests.length > 0 && (
              <Paper elevation={3} sx={{ 
                borderRadius: '16px', 
                mb: 3,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  bgcolor: elderBlissTheme.pending, 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center'
                }}>
                  <NotificationsActiveIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Registration Requests ({registrationRequests.length})
                  </Typography>
                </Box>
                <CardContent>
                  <List>
                    {registrationRequests.map((request, index) => (
                      <Paper 
                        key={request.requestId}
                        elevation={1} 
                        sx={{ 
                          mb: 2, 
                          borderRadius: '12px',
                          bgcolor: elderBlissTheme.pendingLight,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: elderBlissTheme.pending }}>
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {request.fullName}
                              </Typography>
                            } 
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  NIC: {request.nic}
                                </Typography>
                                <Typography variant="body2">
                                  Email: {request.email}
                                </Typography>
                              </Box>
                            } 
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              color="error"
                              onClick={() => handleRejectRequest(request)}
                              sx={{ mr: 1 }}
                            >
                              Reject
                            </Button>
                            <Button 
                              variant="contained" 
                              color="success"
                              onClick={() => handleConfirmRequest(request)}
                            >
                              Confirm
                            </Button>
                          </Box>
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                </CardContent>
              </Paper>
            )}

            {/* Linked Adults */}
            <Paper elevation={3} sx={{ 
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                bgcolor: elderBlissTheme.success, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <SupervisedUserCircleIcon sx={{ color: 'white', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Linked Adults
                </Typography>
              </Box>
              <CardContent>
                {linkedAdults.length === 0 ? (
                  <Box sx={{ py: 5, textAlign: 'center' }}>
                    <NoAccountsIcon sx={{ fontSize: 60, color: elderBlissTheme.textSecondary, opacity: 0.5, mb: 2 }} />
                    <Typography align="center" color="textSecondary" variant="h6" sx={{ mb: 1 }}>
                      No adults linked yet
                    </Typography>
                    <Typography align="center" color="textSecondary" variant="body2" sx={{ mb: 2 }}>
                      You currently don't have any adults linked to your account.
                    </Typography>
                    <Button variant="outlined" color="primary">
                      Learn How to Link Adults
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {linkedAdults.map((adult) => (
                      <Grid item xs={12} sm={6} key={adult.userId}>
                        <Paper elevation={2} sx={{ 
                          borderRadius: '12px', 
                          overflow: 'hidden'
                        }}>
                          <Box sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            bgcolor: elderBlissTheme.primaryLight
                          }}>
                            <Avatar
                              sx={{
                                width: 70,
                                height: 70,
                                bgcolor: elderBlissTheme.secondary,
                                mb: 2,
                                mx: 'auto'
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {adult.fullName}
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              mb: 2
                            }}>
                              <LocalHospitalIcon sx={{ color: '#d32f2f', fontSize: 18, mr: 0.5 }} />
                              <Typography variant="body2">
                                Blood: {adult.bloodGroup || 'N/A'}
                              </Typography>
                            </Box>
                            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                              NIC: {adult.nic}
                            </Typography>
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={() => navigate(`/guardian/adult-profile/${adult.userId}`)}
                              sx={{ bgcolor: elderBlissTheme.primary }}
                            >
                              View Profile
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Confirm Dialog */}
      <Dialog 
        open={confirmDialogOpen} 
        onClose={handleConfirmDialogClose}
      >
        <DialogTitle sx={{ bgcolor: elderBlissTheme.pendingLight }}>
          Confirm Adult Registration
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <DialogContentText>
            You are about to confirm the registration request for <strong>{selectedRequest?.fullName}</strong>. This will give you access to their health profile and allow you to manage their care settings.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleConfirmDialogClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmRegistration} 
            variant="contained"
            color="success"
          >
            Confirm Registration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog 
        open={rejectDialogOpen} 
        onClose={handleRejectDialogClose}
      >
        <DialogTitle sx={{ bgcolor: elderBlissTheme.dangerLight }}>
          Reject Registration Request
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <DialogContentText>
            You are about to reject the registration request from <strong>{selectedRequest?.fullName}</strong>. This action cannot be undone. The request will be removed from your pending list.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleRejectDialogClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRejectRegistration} 
            variant="contained"
            color="error"
          >
            Reject Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuardianProfile;