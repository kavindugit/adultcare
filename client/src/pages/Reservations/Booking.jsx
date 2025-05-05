import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import {
  Calendar,
  CheckCircle,
  HelpCircle,
  Clock,
  MapPin,
  User,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/Reservations/layout/Navbar";
import Footer from "../../components/User/Footer";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
  const theme = useTheme();
  const { userData, getUserData } = useContext(AppContent);
  const [sessions, setSessions] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  console.log("Dddd", userData);
  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/reservation/${userData?.userId}`
      );
      console.log("-----", res);
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions", err);
      toast.error("Failed to load sessions.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [userData?.userId]);

  // Function to format date/time
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 10, md: 12 },
          pb: { xs: 6, md: 8 },
          background: "linear-gradient(to right, #3b82f6, #2563eb)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            opacity: 0.1,
            background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFFFFF\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ color: "white" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      opacity: 0.9,
                      letterSpacing: 1.5,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                    }}
                  >
                    Elderbliss Care Services
                  </Typography>
                  
                  <Typography 
                    variant={isMobile ? "h3" : "h2"}
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      mt: 1,
                      textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    Manage Your Care Appointments
                  </Typography>
                  
                  <Typography 
                    variant="body1"
                    sx={{ 
                      opacity: 0.9,
                      maxWidth: 550,
                      lineHeight: 1.7,
                      mb: 4,
                    }}
                  >
                    View and manage your upcoming care sessions. Schedule services that match your needs with our experienced professionals.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: "#2563eb",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: "rgba(255,255,255,0.9)",
                      },
                      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                    }}
                  >
                    Book New Service
                  </Button>
                </motion.div>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(5px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Calendar size={100} color="rgba(255,255,255,0.5)" />
                  <Box
                    sx={{
                      position: "absolute",
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                      bottom: "-20%",
                      right: "-20%",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Side - Services List */}
          <Grid item xs={12} md={8}>
            <Card 
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                backgroundColor: "white",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: 5,
                      height: 24,
                      backgroundColor: theme.palette.primary.main,
                      marginRight: 2,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    Available Services
                  </Typography>
                </Box>
                
                <Button
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    color: theme.palette.primary.main,
                  }}
                >
                  View All
                </Button>
              </Box>

              <CardContent sx={{ p: 0 }}>
                <Grid container>
                  {[
                    {
                      title: "Home Care",
                      icon: <MapPin size={20} />,
                      description: "Professional care in the comfort of your home",
                      color: "#4CAF50",
                      bgColor: "#4CAF5010",
                    },
                    {
                      title: "Medical Checkups",
                      icon: <User size={20} />,
                      description: "Regular health monitoring by specialists",
                      color: "#2196F3",
                      bgColor: "#2196F310",
                    },
                    {
                      title: "Therapy Sessions",
                      icon: <Clock size={20} />,
                      description: "Physical and mental therapy sessions",
                      color: "#9C27B0",
                      bgColor: "#9C27B010",
                    },
                    {
                      title: "Transportation",
                      icon: <MapPin size={20} />,
                      description: "Safe transport to medical appointments",
                      color: "#FF9800",
                      bgColor: "#FF980010",
                    },
                  ].map((service, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          p: 3,
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          borderRight: index % 2 === 0 ? "1px solid rgba(0,0,0,0.05)" : "none",
                          display: "flex",
                          alignItems: "flex-start",
                          height: "100%",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.01)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: service.bgColor,
                            color: service.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            mr: 2,
                          }}
                        >
                          {service.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              mt: 1,
                              pl: 0,
                              minWidth: 0,
                              color: service.color,
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                backgroundColor: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            Book Now
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                color: "white",
                position: "relative",
                boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "40%",
                  height: "100%",
                  opacity: 0.1,
                  background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFFFFF\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                }}
              />
              
              <CardContent sx={{ position: "relative", zIndex: 1, p: 4 }}>
                <Grid container alignItems="center" spacing={4}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      Need personalized assistance?
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                      Our care specialists can help you find the right services and schedule appointments that fit your needs.
                    </Typography>
                    
                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "white",
                          color: "#2563eb",
                          fontWeight: 600,
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: "rgba(255,255,255,0.9)",
                          },
                          mr: 2,
                        }}
                      >
                        Contact Us
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: "white",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: 2,
                          '&:hover': {
                            borderColor: "rgba(255,255,255,0.9)",
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(5px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        mx: "auto",
                      }}
                    >
                      <HelpCircle size={50} color="rgba(255,255,255,0.8)" />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Upcoming Appointments */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                backgroundColor: "white",
                position: { md: "sticky" },
                top: 100,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 5,
                    height: 24,
                    backgroundColor: theme.palette.primary.main,
                    marginRight: 2,
                    borderRadius: 1,
                  }}
                />
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Appointments
                </Typography>
              </Box>

              {/* Appointments List */}
              <Box
                sx={{
                  maxHeight: 400,
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: 4,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: 2,
                  },
                }}
              >
                {sessions && sessions.length > 0 ? (
                  sessions.map((session, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 3,
                        borderBottom: index !== sessions.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.01)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>
                          {session.serviceName}
                        </Typography>
                        <Chip
                          label={session.status || "Upcoming"}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            backgroundColor: session.status?.toLowerCase() === "confirmed" 
                              ? "rgba(76, 175, 80, 0.1)" 
                              : "rgba(255, 152, 0, 0.1)",
                            color: session.status?.toLowerCase() === "confirmed" 
                              ? "#4CAF50" 
                              : "#FF9800",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <Calendar size={16} style={{ color: "#64748b", marginRight: 8 }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(session.startTime)}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <Clock size={16} style={{ color: "#64748b", marginRight: 8 }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatTime(session.startTime)}
                        </Typography>
                      </Box>

                      {session.location && (
                        <Box display="flex" alignItems="center" mb={2}>
                          <MapPin size={16} style={{ color: "#64748b", marginRight: 8 }} />
                          <Typography variant="body2" color="text.secondary">
                            {session.location}
                          </Typography>
                        </Box>
                      )}

                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            borderRadius: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            "&:hover": {
                              borderColor: theme.palette.primary.dark,
                              backgroundColor: "rgba(37, 99, 235, 0.05)",
                            },
                          }}
                        >
                          Reschedule
                        </Button>
                        
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            borderRadius: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      p: 4,
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: "rgba(59,130,246,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <AlertCircle size={28} style={{ color: theme.palette.primary.main }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      No Upcoming Appointments
                    </Typography>
                    <Typography variant="body2" mb={3}>
                      You don't have any appointments scheduled yet.
                    </Typography>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Book First Appointment
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Help Section */}
              <Box sx={{ p: 3, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(37, 99, 235, 0.05)",
                    border: "1px solid rgba(37, 99, 235, 0.1)",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <HelpCircle
                      size={18}
                      style={{ color: theme.palette.primary.main, marginRight: 8 }}
                    />
                    <Typography fontWeight={600} variant="subtitle2">
                      Need Help?
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Our support team is available 24/7 to assist you with your booking needs.
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      (555) 123-4567
                    </Typography>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Contact Support
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Booking;