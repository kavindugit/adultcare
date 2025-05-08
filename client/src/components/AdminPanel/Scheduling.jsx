import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import PackageRequests from './PackageRequests';
import EmployeeShedules from './EmployeeShedules';


const Scheduling = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      

      <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Package Requests" />
        <Tab label="User Employee Schedules" />
      </Tabs>

      {activeTab === 0 && <PackageRequests />}
      {activeTab === 1 && <EmployeeShedules/>}
    </Box>
  );
};

export default Scheduling;
