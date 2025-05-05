import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  Pagination,
  Tabs,
  Tab,
} from "@mui/material";
import { Search as SearchIcon, FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { toast } from "react-toastify";

// Dummy data for auth logs
const dummyAuthLogs = [
  {
    id: 1,
    timestamp: "2023-10-10 14:30",
    eventType: "Login Attempt",
    user: "John Doe",
    ipAddress: "192.168.1.1",
    details: "Successful login",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2023-10-09 10:15",
    eventType: "Login Attempt",
    user: "Jane Smith",
    ipAddress: "192.168.1.2",
    details: "Invalid credentials",
    status: "Failed",
  },
];

// Dummy data for activity logs
const dummyActivityLogs = [
  {
    id: 1,
    timestamp: "2023-10-10 17:00",
    eventType: "Role Change",
    user: "John Doe",
    admin: "Admin User",
    ipAddress: "192.168.1.1",
    details: "Role updated to Admin",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2023-10-10 18:00",
    eventType: "Password Reset",
    user: "Jane Smith",
    admin: "Admin User",
    ipAddress: "192.168.1.2",
    details: "Password reset requested",
    status: "Success",
  },
];

const SecurityLogs = () => {
  const [authLogs, setAuthLogs] = useState(dummyAuthLogs); // State to store auth logs
  const [activityLogs, setActivityLogs] = useState(dummyActivityLogs); // State to store activity logs
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEventType, setFilterEventType] = useState("");
  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0); // 0 for auth logs, 1 for activity logs
  const rowsPerPage = 10;

  // Fetch logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Fetch auth logs
        const authResponse = await axios.get("http://localhost:4000/api/auth-logs");
        if (authResponse.data.success) {
          setAuthLogs(authResponse.data.logs);
        } else {
          toast.error(authResponse.data.message);
        }

        // Fetch activity logs
        const activityResponse = await axios.get("http://localhost:4000/api/activity-logs");
        if (activityResponse.data.success) {
          setActivityLogs(activityResponse.data.logs);
        } else {
          toast.error(activityResponse.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch logs. Please try again.");
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle event type filter
  const handleEventTypeFilter = (e) => {
    setFilterEventType(e.target.value);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset pagination when switching tabs
  };

  // Filtered logs based on search and filters
  const filteredLogs = (tabValue === 0 ? authLogs : activityLogs).filter(
    (log) =>
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterEventType ? log.eventType === filterEventType : true)
  );

  // Pagination
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Export logs as CSV
  const handleExportLogs = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Timestamp,Event Type,User,IP Address,Details,Status\n" +
      filteredLogs
        .map(
          (log) =>
            `${log.timestamp},${log.eventType},${log.user},${log.ipAddress},${log.details},${log.status}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `security_logs_${tabValue === 0 ? "auth" : "activity"}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Security Logs
      </Typography>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Auth Logs" />
        <Tab label="Activity Logs" />
      </Tabs>

      {/* Filters and Search */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search by user"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Event Type</InputLabel>
              <Select
                value={filterEventType}
                onChange={handleEventTypeFilter}
                label="Event Type"
              >
                <MenuItem value="">All</MenuItem>
                {tabValue === 0 ? (
                  <>
                    <MenuItem value="Login Attempt">Login Attempt</MenuItem>
                    <MenuItem value="Logout">Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="Role Change">Role Change</MenuItem>
                    <MenuItem value="Password Reset">Password Reset</MenuItem>
                    <MenuItem value="Profile Update">Profile Update</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportLogs}
              fullWidth
            >
              Export Logs
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Logs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>User</TableCell>
              {tabValue === 1 && <TableCell>Admin</TableCell>}
              <TableCell>IP Address</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <Chip
                    label={log.eventType}
                    color={
                      log.status === "Success" ? "success" : "error"
                    }
                  />
                </TableCell>
                <TableCell>{log.user}</TableCell>
                {tabValue === 1 && <TableCell>{log.admin}</TableCell>}
                <TableCell>{log.ipAddress}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>{log.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredLogs.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default SecurityLogs;