import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Divider } from "@mui/material";

import AdminInventoryDashboard from "../../InventoryManagement/AdminInventoryDashboard";
import Suppliers from "../../pages/InventoryManagement/Suppliers";
import Stock from "../../pages/InventoryManagement/Stock";
import Restock from "../../pages/InventoryManagement/Restock";
import Prescription from "../../pages/InventoryManagement/Prescription";

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const InventorySection = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#002855" }}>
        Inventory Management
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Package tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="Dashboard" />
        <Tab label="Supplier" />
        <Tab label="Stocks" />
        <Tab label="Restock" />
        <Tab label="Prescription" />
      </Tabs>

      <Divider />

      <TabPanel value={tabIndex} index={0}>
        <AdminInventoryDashboard />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Suppliers />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Stock />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <Restock />
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <Prescription />
      </TabPanel>
    </Box>
  );
};

export default InventorySection;