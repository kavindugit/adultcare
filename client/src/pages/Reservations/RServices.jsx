import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Hospital, Search, Calendar, Clock, DollarSign, Filter, X } from "lucide-react";
import Navbar from "../../components/Reservations/layout/Navbar";
import { Link } from "react-router-dom";
import React from "react";

const RServices = () => {
  const [allSessions, setAllSessions] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch sessions from backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/api/sessions");
        setAllSessions(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Filter sessions
  useEffect(() => {
    let result = [...allSessions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (session) =>
          session.sessionType.toLowerCase().includes(query) ||
          session.sessionTime.toLowerCase().includes(query)
      );
    }

    if (selectedType !== "all") {
      result = result.filter((session) => session.sessionType === selectedType);
    }

    setFilteredServices(result);
  }, [searchQuery, selectedType, allSessions]);

  const handleTabChange = (event, newValue) => {
    setSelectedType(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get chip color based on session type
  const getChipColor = (type) => {
    switch (type) {
      case "Counseling":
        return { bg: "#ebf5ff", text: "#1e40af" };
      case "Physical Therapy":
        return { bg: "#ecfdf5", text: "#065f46" };
      case "Medical Checkup":
        return { bg: "#fef2f2", text: "#b91c1c" };
      default:
        return { bg: "#f3f4f6", text: "#4b5563" };
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    // @ts-ignore
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Loading skeletons
  const SessionSkeletons = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Skeleton variant="rectangular" height={24} width="60%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="40%" />
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Skeleton variant="rectangular" height={36} width="100%" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" sx={{ bgcolor: "#f8fafc" }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 12 },
          background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #e0e7ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box 
              display="inline-flex"
              alignItems="center" 
              bgcolor="white" 
              color="primary.main"
              px={2} 
              py={1} 
              borderRadius={999}
              mb={3}
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Hospital size={18} style={{ marginRight: 8 }} />
              <Typography fontSize={14} fontWeight={600}>
                Our Sessions
              </Typography>
            </Box>
            
            <Typography 
              variant="h3" 
              fontWeight="800" 
              sx={{ 
                mb: 2,
                background: "linear-gradient(to right, #1e40af, #4f46e5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Available Adult Care Sessions
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize="1.1rem"
              maxWidth="90%"
              mb={4}
            >
              Browse through our curated sessions for personalized, safe, and professional 
              adult care delivered by experienced professionals.
            </Typography>
          </motion.div>
        </Container>
        
        {/* Decorative elements */}
        <Box 
          sx={{
            position: "absolute",
            right: { xs: -100, md: 0 },
            bottom: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,234,254,0.6) 0%, rgba(224,242,254,0) 70%)",
            zIndex: 0
          }}
        />
      </Box>

      {/* Search and Filter Bar - Elevated */}
      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 6,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box position="relative">
                <Search
                  size={20}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 16,
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by session type or time..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{ 
                    sx: { 
                      pl: 2, 
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      '&:hover': {
                        backgroundColor: "#f3f4f6",
                      },
                    } 
                  }}
                  inputProps={{ style: { paddingLeft: 28 } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              {searchQuery && (
                <Chip 
                  label={`"${searchQuery}"`}
                  onDelete={() => setSearchQuery("")}
                  sx={{ mr: 1 }}
                />
              )}
              {selectedType !== "all" && (
                <Chip 
                  label={selectedType}
                  onDelete={() => setSelectedType("all")}
                  color="primary"
                  sx={{ mr: 1 }}
                />
              )}
              
              <Button
                variant="outlined"
                startIcon={<X size={16} />}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                }}
                sx={{ ml: 'auto' }}
                disabled={!searchQuery && selectedType === "all"}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {/* Filter Tabs */}
        <Box mb={4}>
          <Paper 
            elevation={1}
            sx={{ 
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "white"
            }}
          >
            <Tabs
              value={selectedType}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              TabIndicatorProps={{
                style: {
                  height: 3,
                  borderRadius: "3px 3px 0 0"
                }
              }}
              sx={{ 
                minHeight: 56,
                "& .MuiTab-root": {
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  py: 2,
                  textTransform: "none",
                }
              }}
            >
              <Tab label="All Sessions" value="all" icon={<Filter size={16} />} iconPosition="start" />
              <Tab label="Counseling" value="Counseling" />
              <Tab label="Physical Therapy" value="Physical Therapy" />
              <Tab label="Medical Checkup" value="Medical Checkup" />
              <Tab label="Other" value="Other" />
            </Tabs>
          </Paper>
        </Box>

        {/* Results Summary */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {loading ? (
              <Skeleton width={200} />
            ) : (
              `${filteredServices.length} session${filteredServices.length !== 1 ? 's' : ''} available`
            )}
          </Typography>
        </Box>

        {/* Session Cards */}
        <Grid container spacing={3}>
          {loading ? (
            <SessionSkeletons />
          ) : filteredServices.length > 0 ? (
            filteredServices.map((session) => {
              const colorScheme = getChipColor(session.sessionType);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={session._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card 
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        }
                      }}
                      elevation={2}
                    >
                      <Box 
                        sx={{ 
                          p: 3, 
                          borderBottom: "1px solid",
                          borderColor: "divider"
                        }}
                      >
                        <Chip
                          label={session.sessionType}
                          sx={{
                            mb: 2,
                            bgcolor: colorScheme.bg,
                            color: colorScheme.text,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                          size="small"
                        />
                        
                        <Typography 
                          variant="h6" 
                          fontWeight={700}
                          mb={1}
                        >
                          {session.sessionType} Session
                        </Typography>
                        
                        <Box display="flex" alignItems="center" mt={2} mb={1}>
                          <Calendar size={16} style={{ marginRight: 8, color: "#6b7280" }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(session.sessionDate)}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" mb={1}>
                          <Clock size={16} style={{ marginRight: 8, color: "#6b7280" }} />
                          <Typography variant="body2" color="text.secondary">
                            {session.sessionTime} • {session.sessionDuration}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center">
                          <DollarSign size={16} style={{ marginRight: 8, color: "#6b7280" }} />
                          <Typography variant="body2" fontWeight={600} color="text.primary">
                            Rs. {session.sessionPrice.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box p={3} mt="auto">
                        <Button
                          fullWidth
                          variant="contained"
                          component={Link}
                          to="/add-appointment"
                          state={session}
                          size="large"
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: 600
                          }}
                        >
                          Book Appointment
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Paper 
                sx={{
                  textAlign: "center",
                  p: 6,
                  borderRadius: 3,
                  bgcolor: "#f9fafb",
                  border: "1px dashed",
                  borderColor: "divider"
                }}
              >
                <Box mb={2}>
                  <Search size={40} style={{ color: "#9ca3af" }} />
                </Box>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No sessions found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("all");
                  }}
                  sx={{ mt: 3 }}
                >
                  Reset All Filters
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default RServices;