import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardContent, CircularProgress,
  Avatar, Box, Divider, Paper, Chip, Rating, LinearProgress,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, IconButton, Snackbar, Alert, Tabs, Tab
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import BuildIcon from '@mui/icons-material/Build';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentIcon from '@mui/icons-material/Assignment';

const CaregiverProfile = () => {
  const { userData } = useContext(AppContent);
  const [caregiverInfo, setCaregiverInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
    reviewerName: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchCaregiverData = async () => {
      if (!userData || !userData.userId) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/caregiver/getdata/${userData.userId}`);
        setCaregiverInfo(res.data.data);
        
        // Fetch reviews
        const reviewsRes = await axios.get(`http://localhost:4000/api/caregiver/reviews/${userData.userId}`);
        setReviews(reviewsRes.data.data || []);
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

  const handleReviewDialogOpen = () => {
    setOpenReviewDialog(true);
  };

  const handleReviewDialogClose = () => {
    setOpenReviewDialog(false);
    setReviewData({
      rating: 0,
      comment: '',
      reviewerName: ''
    });
  };

  const handleReviewSubmit = async () => {
    if (!reviewData.rating || !reviewData.comment || !reviewData.reviewerName) {
      setSnackbar({
        open: true,
        message: 'Please fill all fields',
        severity: 'error'
      });
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4000/api/caregiver/review/${userData.userId}`, {
        ...reviewData,
        date: new Date()
      });
      
      // Add new review to the list
      setReviews([...reviews, {...reviewData, date: new Date(), _id: res.data.reviewId}]);
      
      setSnackbar({
        open: true,
        message: 'Review submitted successfully!',
        severity: 'success'
      });
      
      handleReviewDialogClose();
    } catch (err) {
      console.error("Error submitting review:", err);
      setSnackbar({
        open: true,
        message: 'Failed to submit review. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

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

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '80vh'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#1976d2' }} />
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
          backgroundColor: '#e3f2fd'
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      bgcolor: '#f5f9ff',
      minHeight: '100vh',
      py: 0
    }}>
      {/* Hero Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: 6,
          boxShadow: 3,
          mb: 4
        }}
      >
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
              <Avatar 
                sx={{ 
                  width: 180, 
                  height: 180, 
                  bgcolor: 'white',
                  border: '5px solid rgba(255,255,255,0.3)',
                  boxShadow: 3,
                  mx: { xs: 'auto', md: 'auto' }
                }}
              >
                <PersonIcon sx={{ fontSize: 100, color: '#1976d2' }} />
              </Avatar>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, textAlign: { xs: 'center', md: 'left' } }}>
                {userData.name}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                Professional Caregiver
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Chip 
                  icon={<VerifiedUserIcon />} 
                  label="Verified Professional" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    mr: 1,
                    fontWeight: 'bold',
                    '& .MuiChip-icon': { color: '#4caf50' }
                  }} 
                />
                {reviews.length > 0 && (
                  <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                    <Rating 
                      value={parseFloat(averageRating)} 
                      precision={0.5} 
                      readOnly 
                      size="medium"
                      sx={{ color: '#ffeb3b' }}
                    />
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'medium' }}>
                      {averageRating} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                {caregiverInfo && caregiverInfo.languagesSpoken && caregiverInfo.languagesSpoken.split(',').map((lang, idx) => (
                  <Chip 
                    key={idx} 
                    label={lang.trim()} 
                    sx={{ 
                      m: 0.5, 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      color: 'white',
                      fontWeight: 'medium',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }} 
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  textAlign: 'center',
                  maxWidth: 250,
                  mx: 'auto'
                }}
              >
                {caregiverInfo && (
                  <>
                    <Typography variant="h4" fontWeight="bold" color="white" sx={{ mb: 1 }}>
                      ${caregiverInfo.salary}
                      <Typography component="span" variant="h6" sx={{ opacity: 0.8 }}>/hr</Typography>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                      {caregiverInfo.yearsOfExperience} years experience
                    </Typography>
                  </>
                )}
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<AddCommentIcon />}
                  onClick={handleReviewDialogOpen}
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#1976d2',
                    '&:hover': {
                      bgcolor: '#e3f2fd',
                    },
                    fontWeight: 'bold',
                    boxShadow: 2,
                    mb: 2
                  }}
                >
                  Add Review
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<FavoriteIcon />}
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Contact Caregiver
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tab Navigation */}
      <Container maxWidth="xl">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTab-root': { 
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 3
              },
              '& .Mui-selected': { color: '#1976d2' },
              '& .MuiTabs-indicator': { bgcolor: '#1976d2' }
            }}
          >
            <Tab label="Profile" id="tab-0" />
            <Tab label="Skills & Experience" id="tab-1" />
            <Tab label="Reviews" id="tab-2" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ pb: 4 }}>
          {/* Tab 1: Profile */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#1976d2', 
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
                      <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                        <EmailIcon sx={{ color: '#1976d2' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Email</Typography>
                        <Typography variant="body1">{userData.email}</Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                        <PhoneIcon sx={{ color: '#1976d2' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Phone</Typography>
                        <Typography variant="body1">{userData.phoneNo}</Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                        <HomeIcon sx={{ color: '#1976d2' }} />
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
              <Grid item xs={12} md={8}>
                {caregiverInfo ? (
                  <Paper elevation={2} sx={{ borderRadius: 2 }}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#1976d2', 
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
                            <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                              <WorkIcon sx={{ color: '#1976d2' }} />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" color="textSecondary">Experience</Typography>
                              <Typography variant="h6">{caregiverInfo.yearsOfExperience} years</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                              <AccessTimeIcon sx={{ color: '#1976d2' }} />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" color="textSecondary">Working Hours</Typography>
                              <Typography variant="h6">{caregiverInfo.preferredWorkHours}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>About Me</Typography>
                          <Typography variant="body1" paragraph>
                            With {caregiverInfo.yearsOfExperience} years of experience in adult caregiving, I am committed to providing
                            compassionate and professional care to seniors and adults with special needs. I believe in
                            maintaining dignity and independence while ensuring the highest quality of care.
                          </Typography>
                          <Typography variant="body1">
                            My approach is centered on building meaningful relationships with both my clients and their
                            families. I understand the importance of trust and reliability in caregiving relationships,
                            and I strive to create a safe, comfortable environment for everyone involved.
                          </Typography>
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
                      Complete your profile to showcase your professional information.
                    </Typography>
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}
          
          {/* Tab 2: Skills & Experience */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#1976d2', 
                    color: 'white',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}>
                    <Typography variant="h6" fontWeight="medium">
                      Key Skills
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    {['Elder Care', 'Medication Management', 'First Aid', 'Cooking', 'Mobility Assistance', 'Dementia Care'].map((skill) => (
                      <Box key={skill} sx={{ mb: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
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
                            borderRadius: 5,
                            backgroundColor: '#e3f2fd',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#1976d2',
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </CardContent>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#1976d2', 
                    color: 'white',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}>
                    <Typography variant="h6" fontWeight="medium">
                      Work Experience
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6">Senior Caregiver</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Golden Years Care Center • 2019 - Present
                      </Typography>
                      <Typography variant="body1">
                        Provided dedicated care to seniors with various needs including those with dementia, 
                        mobility issues, and chronic conditions. Assisted with medication management, 
                        personal care, and daily activities.
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box>
                      <Typography variant="h6">Home Health Aide</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Comfort Home Care • 2016 - 2019
                      </Typography>
                      <Typography variant="body1">
                        Delivered in-home care services to elderly clients, focusing on maintaining
                        their independence and quality of life. Responsibilities included meal preparation,
                        light housekeeping, and companionship.
                      </Typography>
                    </Box>
                  </CardContent>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {/* Tab 3: Reviews */}
          {activeTab === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      mb: 3, 
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { xs: 'center', md: 'flex-start' },
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                      <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        {averageRating}
                        <Typography component="span" variant="h6" sx={{ ml: 1, color: 'text.secondary' }}>
                          out of 5
                        </Typography>
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 1 }}>
                        <Rating 
                          value={parseFloat(averageRating)} 
                          precision={0.5} 
                          readOnly 
                          sx={{ color: '#1976d2' }}
                        />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                          ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      startIcon={<AddCommentIcon />}
                      onClick={handleReviewDialogOpen}
                      sx={{ 
                        bgcolor: '#1976d2',
                        '&:hover': {
                          bgcolor: '#0d47a1',
                        }
                      }}
                    >
                      Write a Review
                    </Button>
                  </Paper>
                </Grid>
                
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <Grid item xs={12} key={review._id || index}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 3, 
                          borderRadius: 2, 
                          mb: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography variant="h6">{review.reviewerName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Rating value={review.rating} readOnly sx={{ color: '#1976d2' }} />
                        </Box>
                        
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          <FormatQuoteIcon sx={{ fontSize: 40, color: '#e3f2fd', mr: 2, transform: 'scaleX(-1)' }} />
                          <Typography variant="body1">
                            {review.comment}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 4, 
                        borderRadius: 2, 
                        textAlign: 'center',
                        bgcolor: '#f5f5f5'
                      }}
                    >
                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        No Reviews Yet
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Be the first to leave a review for this caregiver.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddCommentIcon />}
                        onClick={handleReviewDialogOpen}
                        sx={{ 
                          bgcolor: '#1976d2',
                          '&:hover': {
                            bgcolor: '#0d47a1',
                          }
                        }}
                      >
                        Write a Review
                      </Button>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={handleReviewDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white' }}>
          Add Review for {userData.name}
          <IconButton
            aria-label="close"
            onClick={handleReviewDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box py={1}>
            <Typography variant="body1" gutterBottom>Your Rating</Typography>
            <Rating
              name="rating"
              value={reviewData.rating}
              onChange={(event, newValue) => {
                setReviewData({...reviewData, rating: newValue});
              }}
              size="large"
              sx={{ color: '#1976d2', mb: 2 }}
            />
            
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Your Name"
              type="text"
              fullWidth
              variant="outlined"
              value={reviewData.reviewerName}
              onChange={(e) => setReviewData({...reviewData, reviewerName: e.target.value})}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              id="comment"
              label="Your Review"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={reviewData.comment}
              onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
              placeholder="Share your experience with this caregiver..."
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleReviewDialogClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleReviewSubmit} 
            variant="contained" 
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': {
                bgcolor: '#0d47a1',
              }
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CaregiverProfile;