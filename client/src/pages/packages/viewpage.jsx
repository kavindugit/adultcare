import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import Navbar from '../../components/Reservations/layout/Navbar';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
  Tooltip,
  Fade
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ViewPage = () => {
  const { userData } = useContext(AppContent);
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [linkedAdults, setLinkedAdults] = useState([]);
  const [selectedAdult, setSelectedAdult] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdultModal, setShowAdultModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/packages/all');
      if (response.status === 200) {
        setApiData(response.data.data);
      } else {
        handleSnackbar('Error fetching packages', 'error');
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      handleSnackbar('Error fetching packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = async (parcel) => {
    if (!userData?.userId) {
      handleSnackbar("User not logged in", "error");
      toast.error("User not logged in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setSelectedPackage(parcel);
    
    if (userData.role === "Guardian") {
      try {
        const response = await axios.get(`http://localhost:4000/api/adult/adult-by-guardian/${userData.userId}`);
        if (response.status === 200 && response.data.adults.length > 0) {
          setLinkedAdults(response.data.adults);
          setShowAdultModal(true);
        } else {
          handleSnackbar("No linked adults found", "warning");
          toast.warning("No linked adults found. Please add an adult first.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching linked adults:", error);
        handleSnackbar("Error fetching linked adults", "error");
        toast.error("Error fetching linked adults", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else if (userData.role === "Adult") {
      // For adult users, get the guardian ID first
      try {
        const response = await axios.get(`http://localhost:4000/api/guardian/guardian-by-adult/${userData.userId}`);
        if (response.status === 200 && response.data.guardianId) {
          sendPackageRequest(parcel, userData.userId, response.data.guardianId);
        } else {
          handleSnackbar("Guardian information not found", "error");
          toast.error("Guardian information not found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching guardian info:", error);
        handleSnackbar("Error fetching guardian information", "error");
        toast.error("Error fetching guardian information", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      // For other user roles (if any)
      handleSnackbar("Invalid user role for package request", "error");
      toast.error("Invalid user role for package request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const sendPackageRequest = async (parcel, adultId = null, guardianId = null) => {
    try {
      setLoading(true);
      
      // Determine guardianId based on user role
      let requestGuardianId = guardianId;
      
      if (userData.role === 'Guardian') {
        requestGuardianId = userData.userId;
      }
      
      // If guardianId is still null, show error
      if (!requestGuardianId) {
        handleSnackbar("Guardian ID not available", "error");
        toast.error("Guardian ID not available", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
        setShowAdultModal(false);
        return;
      }
      
      const response = await axios.post('http://localhost:4000/api/package-requests', {
        guardianId: requestGuardianId,
        packageId: parcel._id,
        adultId: adultId,
        status: 'pending'
      });
      
      if (response.status === 201) {
        handleSnackbar("Package request sent successfully!", "success");
        toast.success("🎉 Package request sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        handleSnackbar("Failed to send package request", "error");
        toast.error("Failed to send package request", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error sending package request:", error);
      handleSnackbar("An error occurred while sending the request", "error");
      toast.error("An error occurred while sending the request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
      setShowAdultModal(false);
    }
  };

  const handleSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const confirmAdultSelection = () => {
    if (!selectedAdult) {
      handleSnackbar("Please select an adult", "warning");
      toast.warning("Please select an adult", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    sendPackageRequest(selectedPackage, selectedAdult);
  };

  const filteredPackages = apiData.filter((parcel) =>
    parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.description && parcel.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Include the imported Navbar component */}
      <Navbar />
      
      <Box sx={{ 
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 6, 
        px: { xs: 2, sm: 4 }
      }}>
        <Container maxWidth="xl">
          {/* Hero Section */}
          <Paper 
            elevation={0}
            sx={{
              mb: 6,
              p: { xs: 3, md: 5 },
              borderRadius: '16px',
              backgroundImage: 'linear-gradient(135deg, #6B73FF 10%, #5572E4 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              bottom: 0, 
              width: { xs: '100%', md: '40%' },
              opacity: 0.2,
              backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Care Packages
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  maxWidth: '600px',
                  opacity: 0.9
                }}
              >
                Find the perfect care package for your loved ones with our comprehensive service offerings.
              </Typography>
              
              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: '600px'
              }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search Packages"
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                      '& input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      }
                    }
                  }}
                />
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Filter">
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    >
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Sort">
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Package Listing */}
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '300px'
            }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Fade in={!loading} timeout={800}>
              <Grid container spacing={3}>
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((parcel) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={parcel._id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          bgcolor: 'white',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          {parcel.imageUrl ? (
                            <CardMedia
                              component="img"
                              height="180"
                              image={parcel.imageUrl}
                              alt={parcel.name}
                              sx={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <Box 
                              sx={{ 
                                height: 180, 
                                bgcolor: 'rgba(236, 242, 255, 0.9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                              }}
                            >
                              <MedicalServicesIcon sx={{ fontSize: '3rem', opacity: 0.7 }} />
                            </Box>
                          )}
                          
                          <Tooltip title="Add to favorites">
                            <IconButton 
                              sx={{ 
                                position: 'absolute', 
                                top: 8, 
                                right: 8,
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                                }
                              }}
                            >
                              <FavoriteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography 
                            variant="h5" 
                            component="h2" 
                            gutterBottom 
                            sx={{ 
                              color: 'primary.dark', 
                              fontWeight: 700,
                              fontSize: '1.25rem',
                              lineHeight: 1.2
                            }}
                          >
                            {parcel.name}
                          </Typography>
                          
                          {parcel.description && (
                            <Box sx={{ my: 2 }}>
                              {parcel.description.split(',').map((item, index) => (
                                <Typography 
                                  key={index} 
                                  variant="body2" 
                                  component="div" 
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 0.75,
                                    color: 'text.secondary'
                                  }}
                                >
                                  <Box 
                                    component="span" 
                                    sx={{ 
                                      width: '6px', 
                                      height: '6px', 
                                      borderRadius: '50%', 
                                      bgcolor: 'primary.main', 
                                      mr: 1.5 
                                    }} 
                                  />
                                  {item.trim()}
                                </Typography>
                              ))}
                            </Box>
                          )}
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                color: 'text.secondary',
                                mb: 1
                              }}
                            >
                              <Box 
                                component="span" 
                                sx={{ 
                                  mr: 1,
                                  display: 'inline-flex',
                                  bgcolor: 'primary.light',
                                  color: 'primary.contrastText',
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                {parcel.duration}
                              </Box>
                              <strong>Days</strong> duration
                            </Typography>
                            
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold', 
                                color: 'primary.main',
                                fontSize: '1.25rem'
                              }}
                            >
                              LKR {parcel.price?.toLocaleString() || 'Price unavailable'}
                            </Typography>
                          </Box>
                          
                          <Box display="flex" flexWrap="wrap" gap={0.75} mb={2}>
                            {parcel.roles?.caregivers && (
                              <Chip 
                                icon={<PeopleIcon sx={{ fontSize: '0.85rem' }} />} 
                                label="Caregivers" 
                                size="small" 
                                sx={{ 
                                  bgcolor: 'rgba(144, 202, 249, 0.2)',
                                  color: '#1565c0',
                                  fontWeight: 500,
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                            
                            {parcel.roles?.nurses && (
                              <Chip 
                                icon={<PersonIcon sx={{ fontSize: '0.85rem' }} />} 
                                label="Nurses" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(129, 199, 132, 0.2)',
                                  color: '#2e7d32',
                                  fontWeight: 500,
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                            
                            {parcel.roles?.doctors && (
                              <Chip 
                                icon={<MedicalServicesIcon sx={{ fontSize: '0.85rem' }} />} 
                                label="Doctors" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(255, 183, 77, 0.2)',
                                  color: '#ed6c02',
                                  fontWeight: 500,
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                          </Box>
                          
                          <Box display="flex" flexWrap="wrap" gap={0.75}>
                            {parcel.extraServices?.transport && (
                              <Chip 
                                icon={<LocalShippingIcon sx={{ fontSize: '0.85rem' }} />} 
                                label="Transport" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(240, 98, 146, 0.2)',
                                  color: '#c2185b',
                                  fontWeight: 500,
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                            
                            {parcel.extraServices?.extraCaregiverAssignments && (
                              <Chip 
                                icon={<PeopleIcon sx={{ fontSize: '0.85rem' }} />} 
                                label="Extra Caregiver" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(121, 134, 203, 0.2)',
                                  color: '#3949ab',
                                  fontWeight: 500,
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                          </Box>
                        </CardContent>
                        
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            onClick={() => handleSelect(parcel)}
                            startIcon={<AddShoppingCartIcon />}
                            sx={{ 
                              borderRadius: '10px',
                              py: 1.2,
                              fontWeight: 600,
                              textTransform: 'none',
                              boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
                            }}
                          >
                            Select Package
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        px: 3,
                        borderRadius: '16px',
                        bgcolor: 'white',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                      }}
                    >
                      <img
                        src="https://illustrations.popsy.co/gray/empty-state.svg"
                        alt="No packages"
                        style={{ width: '180px', margin: '0 auto 24px' }}
                      />
                      <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        No packages found
                      </Typography>
                      <Typography color="text.secondary">
                        Try adjusting your search criteria or browse all packages.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        sx={{ mt: 3, borderRadius: '8px', textTransform: 'none' }}
                        onClick={() => setSearchTerm('')}
                      >
                        View All Packages
                      </Button>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Fade>
          )}
        </Container>
      </Box>

      {/* Adult Selection Dialog */}
      <Dialog 
        open={showAdultModal} 
        onClose={() => setShowAdultModal(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Select an Adult
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Choose which adult this package will be for
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="adult-select-label">Select Adult</InputLabel>
            <Select
              labelId="adult-select-label"
              value={selectedAdult}
              onChange={(e) => setSelectedAdult(e.target.value)}
              label="Select Adult"
              sx={{ 
                borderRadius: '10px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              {linkedAdults.map((adult) => (
                <MenuItem key={adult.userId} value={adult.userId}>
                  {adult.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setShowAdultModal(false)} 
            color="inherit"
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmAdultSelection} 
            color="primary" 
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={closeSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Toast Container for better notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ViewPage;