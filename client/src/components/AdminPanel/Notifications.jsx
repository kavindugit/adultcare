import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Tabs,
  Tab,
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
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Grid,
  Autocomplete,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import {
  Send as SendIcon,
  History as HistoryIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  MarkEmailRead as MarkEmailReadIcon,
  Delete as DeleteIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

// Dummy data
const dummyNotifications = [
  {
    id: 1,
    recipient: "John Doe",
    message: "Your appointment is confirmed for October 15th.",
    type: "Email",
    status: "Sent",
    timestamp: "2023-10-10 14:30",
    read: false,
  },
  {
    id: 2,
    recipient: "Jane Smith",
    message: "Your subscription is expiring in 7 days.",
    type: "In-App",
    status: "Failed",
    timestamp: "2023-10-09 10:15",
    read: true,
  },
];

const userRoles = ["All Users", "Guardians", "Doctors", "Nurses", "Adults", "Selected Users"];

const Notifications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]); // State to store all users
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // State to store selected users' data
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users from the backend
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/user/all");
        if (data.success) {
          setUsers(data.usersData); // Set fetched users to state
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch users. Please try again.");
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSendNotification = () => {
    setOpenSendDialog(true);
  };

  const handleCloseSendDialog = () => {
    setOpenSendDialog(false);
    setSelectedRole("");
    setSelectedUsers([]);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleBulkDelete = () => {
    setNotifications(notifications.filter((notification) => !notification.selected));
  };

  const handleBulkMarkAsRead = () => {
    setNotifications(
      notifications.map((notification) =>
        notification.selected ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sending notifications
  const handleSend = async () => {
    try {
      const payload = {
        recipients: selectedUsers.map((user) => user._id), // Extract user IDs
        message: "Your notification message here", // Replace with actual message
        type: "Email", // Replace with actual type
      };

      const { data } = await axios.post("http://localhost:4000/api/notifications/send", payload);
      if (data.success) {
        toast.success("Notification sent successfully!");
        handleCloseSendDialog();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send notification. Please try again.");
      console.error("Error sending notification:", error);
    }
  };

  // Log selected user IDs to the console
  useEffect(() => {
    console.log("Selected User IDs:", selectedUsers.map((user) => user._id));
  }, [selectedUsers]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications Management
      </Typography>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Send Notification" icon={<SendIcon />} />
        <Tab label="Notification History" icon={<HistoryIcon />} />
      </Tabs>

      {/* Send Notification Tab */}
      {tabValue === 0 && (
        <Card>
          <CardHeader
            title="Send Notifications"
            subheader="Send notifications to users or groups of users."
            avatar={
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <NotificationsIcon />
              </Avatar>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              {/* Statistics Section */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Chip
                    label={`Total Notifications: ${totalNotifications}`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`Failed Notifications: ${failedNotifications}`}
                    color="error"
                    variant="outlined"
                  />
                </Box>
              </Grid>

              {/* Send Notification Button */}
              <Grid item xs={12}>
                <Tooltip title="Send a new notification">
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleSendNotification}
                    size="large"
                    sx={{ width: "100%", py: 2 }}
                  >
                    Send New Notification
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Send Notification Dialog */}
      <Dialog open={openSendDialog} onClose={handleCloseSendDialog} maxWidth="md" fullWidth>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Send To</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  label="Send To"
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {userRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedRole === "Selected Users" && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={users}
                  getOptionLabel={(user) => user.name} // Display user names in dropdown
                  renderInput={(params) => (
                    <TextField {...params} label="Select Users" fullWidth />
                  )}
                  value={selectedUsers}
                  onChange={(event, newValue) => {
                    setSelectedUsers(newValue); // Store selected users' data
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField fullWidth label="Message" multiline rows={4} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select label="Type">
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="In-App">In-App</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSendDialog}>Cancel</Button>
          <Button variant="contained" startIcon={<SendIcon />} onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification History Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <TextField
              placeholder="Search by recipient"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
            <Box>
              <Tooltip title="Mark Selected as Read">
                <IconButton onClick={handleBulkMarkAsRead}>
                  <MarkEmailReadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Selected">
                <IconButton onClick={handleBulkDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{notification.recipient}</TableCell>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={notification.status}
                        color={notification.status === "Sent" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>{notification.timestamp}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleMarkAsRead(notification.id)}>
                        <MarkEmailReadIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNotification(notification.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;