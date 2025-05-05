import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Divider } from "@mui/material";
import ParcelsAdmin from "../../pages/packages/ParcelsAdmin";   // View Packages
import AddParcel from "../../pages/packages/AddParcel";         // Add Package
import PackageRequests from "./PackageRequests"; // ✅ New: Pending Requests

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const PackageSection = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#002855" }}>
        Package Management
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Package tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="View Packages" />
        <Tab label="Add Package" />
        <Tab label="Package Requests" />
      </Tabs>

      <Divider />

      <TabPanel value={tabIndex} index={0}>
        <ParcelsAdmin />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AddParcel />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <PackageRequests />
      </TabPanel>
    </Box>
  );
};

export default PackageSection;
