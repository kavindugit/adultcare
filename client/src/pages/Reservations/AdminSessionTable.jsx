// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Divider } from "@mui/material";
import AdminSessionSection from "./AdminSessionSection";
import AddParcel from "../packages/AddParcel";
import CreateSessionForm from "./CreateSessionForm";

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const AdminSessionTable = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#002855" }}>
        Session Management
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Package tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="View Sessions" />
        <Tab label="Add Sessions" />
      </Tabs>

      <Divider />

      <TabPanel value={tabIndex} index={0}>
        <AdminSessionSection />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <CreateSessionForm />
      </TabPanel>
    </Box>
  );
};

export default AdminSessionTable;
