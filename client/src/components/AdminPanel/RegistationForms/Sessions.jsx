import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

// Dummy content components
const ViewSessions = () => (
  <Typography variant="body1">Here you can view all scheduled sessions.</Typography>
);

const AddSession = () => (
  <Typography variant="body1">Form to add a new session goes here.</Typography>
);

const SessionRequests = () => (
  <Typography variant="body1">Review and approve/reject session requests here.</Typography>
);

const Sessions = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="View Sessions" />
        <Tab label="Add Session" />
        <Tab label="Session Requests" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <ViewSessions />}
        {tabIndex === 1 && <AddSession />}
        {tabIndex === 2 && <SessionRequests />}
      </Box>
    </Box>
  );
};

export default Sessions;
