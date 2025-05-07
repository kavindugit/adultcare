import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "@mui/material";
import {
  Home,
  CalendarClock,
  LayoutDashboard,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { AppContent } from "../../../context/AppContext";
import React from "react";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { userData } = useContext(AppContent);
  const isActive = (path) => location.pathname === path;

  const navLinks = userData?.isAdmin ?[
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/rservices", label: "Services", icon: <CalendarClock size={18} /> },
    { path: "/admin-session-table", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  ]:[
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

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          transition: "background-color 0.3s ease-in-out",
          borderBottom: isScrolled ? "1px solid #e0e0e0" : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "primary.main",
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
                color: "text.primary",
              }}
            >
              Bliss
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                startIcon={link.icon}
                sx={{
                  color: isActive(link.path) ? "primary.main" : "text.secondary",
                  fontWeight: isActive(link.path) ? 600 : 400,
                  textTransform: "none",
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button variant="outlined" startIcon={<Phone size={16} />}>
              Contact
            </Button>
            <Button component={Link} to="/add-appointment" variant="contained">
              Book Now
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            onClick={() => setIsMobileMenuOpen(true)}
            sx={{ display: { md: "none" } }}
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
          sx: { width: 280 },
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={() => setIsMobileMenuOpen(false)}>
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
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box px={2} display="flex" gap={1}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Phone size={16} />}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/booking"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Now
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
