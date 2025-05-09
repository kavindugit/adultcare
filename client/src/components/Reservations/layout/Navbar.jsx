import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Home,
  CalendarClock,
  Menu,
  X,
  Phone,
  BookOpen,
} from "lucide-react";
import { AppContent } from "../../../context/AppContext";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedin } = useContext(AppContent);
  const isActive = (path) => location.pathname === path;

  const navLinks = userData?.isAdmin
    ? [
        { path: "/", label: "Home", icon: <Home size={18} /> },
        { path: "/rservices", label: "Services", icon: <CalendarClock size={18} /> },
      ]
    : [
        { path: "/", label: "Home", icon: <Home size={18} /> },
        { path: "/rservices", label: "Services", icon: <CalendarClock size={18} /> },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUserData(null);
      setIsLoggedin(false);

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Default avatar URL
  const defaultAvatar = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740";

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: "#1e3a8a", // bg-blue-900
          color: "#ffffff", // text-white
          transition: "background-color 0.3s ease-in-out",
          borderBottom: isScrolled ? "1px solid #e0e0e0" : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#ffffff",
                mr: 0.5,
              }}
            >
              Elder
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 300,
                fontSize: "1.25rem",
                color: "#ffffff",
              }}
            >
              Bliss
            </Typography>
          </Box>

          {/* Desktop nav - Centered */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                startIcon={link.icon}
                sx={{
                  color: isActive(link.path) ? "#ffffff" : "#d1d5db",
                  fontWeight: isActive(link.path) ? 600 : 400,
                  textTransform: "none",
                  "&:hover": { color: "#d1d5db" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              to="/add-appointment"
              startIcon={<BookOpen size={18} />}
              sx={{
                color: isActive("/add-appointment") ? "#ffffff" : "#d1d5db",
                fontWeight: isActive("/add-appointment") ? 600 : 400,
                textTransform: "none",
                "&:hover": { color: "#d1d5db" },
              }}
            >
              Book Now
            </Button>
          </Box>

          {/* Right Section (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {userData ? (
              <>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 500,
                  }}
                >
                  {userData?.name || "User"}
                </Typography>
                <Tooltip title="View Profile">
                  <IconButton
                    component={Link}
                    to="/profile"
                    sx={{ p: 0 }}
                    aria-label="View user profile"
                  >
                    <img
                      src={userData?.profileImage || defaultAvatar}
                      alt="User"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "2px solid #ffffff",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Button
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "#dc2626",
                    color: "#ffffff",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "#b91c1c" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  bgcolor: "#ffffff",
                  color: "#1e3a8a",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "#e5e7eb" },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            onClick={() => setIsMobileMenuOpen(true)}
            sx={{ display: { md: "none" }, color: "#ffffff" }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: 280, bgcolor: "#1e3a8a", color: "#ffffff" },
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={() => setIsMobileMenuOpen(false)} sx={{ color: "#ffffff" }}>
            <X />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.path}
              component={Link}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              selected={isActive(link.path)}
              sx={{
                color: isActive(link.path) ? "#ffffff" : "#d1d5db",
                "&:hover": { color: "#d1d5db" },
              }}
            >
              <ListItemIcon sx={{ color: isActive(link.path) ? "#ffffff" : "#d1d5db" }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2, bgcolor: "#d1d5db" }} />

        <Box px={2} display="flex" gap={1}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Phone size={16} />}
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              "&:hover": { borderColor: "#d1d5db", color: "#d1d5db" },
            }}
          >
            Contact
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/booking"
            startIcon={<BookOpen size={18} />}
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{
              color: isActive("/booking") ? "#ffffff" : "#d1d5db",
              fontWeight: isActive("/booking") ? 600 : 400,
              textTransform: "none",
              "&:hover": { color: "#d1d5db" },
            }}
          >
            Book Now
          </Button>
        </Box>

        <Divider sx={{ my: 2, bgcolor: "#d1d5db" }} />

        {/* Right Section (Mobile) */}
        <Box px={2} display="flex" gap={1} flexDirection="column">
          {userData ? (
            <>
              <Box display="flex" alignItems="center" gap={2}>
                <Tooltip title="View Profile">
                  <IconButton
                    component={Link}
                    to="/profile"
                    sx={{ p: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="View user profile"
                  >
                    <img
                      src={userData?.profileImage || defaultAvatar}
                      alt="User"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "2px solid #ffffff",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 500,
                  }}
                >
                  {userData?.name || "User"}
                </Typography>
              </Box>
              <Button
                onClick={handleLogout}
                sx={{
                  bgcolor: "#dc2626",
                  color: "#ffffff",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "#b91c1c" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                bgcolor: "#ffffff",
                color: "#1e3a8a",
                px: 2,
                py: 1,
                borderRadius: "8px",
                fontWeight: 500,
                "&:hover": { bgcolor: "#e5e7eb" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;