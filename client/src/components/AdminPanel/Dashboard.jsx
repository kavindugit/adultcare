// Dashboard.js
import React from "react";
import Box from "@mui/material/Box"; // Add this import
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body1">
        Welcome to the admin panel! Here, you can manage users, employees,
        payments, and more.
      </Typography>
    </Box>
  );
};

export default Dashboard;