import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Autocomplete,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";

const NotificationManagement = () => {
  const { userData, getUserData, backendUrl } = useContext(AppContent);

  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false); // State for clear confirmation dialog
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Email");

  const userRoles = ["All Users", "All Employees", "Guardian", "Doctor", "Nurse", "Adult", "Selected Users"];

  useEffect(() => {
    fetchNotificationHistory();
    fetchUsers();
    getUserData();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all`);
      if (data.success) setUsers(data.usersData);
    } catch (error) {
      console.error("Error loading users", error);
      toast.error("Failed to load users");
    }
  };

  const fetchNotificationHistory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/notifications/all`);
      if (data.success) {
        setNotifications(data.notifications);
        setFilteredNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error loading notification history", error);
      toast.error("Failed to load notification history");
    }
  };

  const handleClearHistory = async () => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/notifications/clear`, {
        withCredentials: true,
      });
      if (data.success) {
        setNotifications([]); // Clear notifications
        setFilteredNotifications([]); // Clear filtered notifications
        toast.success(data.message);
        setOpenClearDialog(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear notification history");
    }
  };

  const handleSearch = (value, type = selectedTypeFilter) => {
    setSearchQuery(value);
    const lower = value.toLowerCase();

    const filtered = notifications.filter((n) => {
      const matchesSearch =
        n.senderName?.toLowerCase().includes(lower) ||
        n.recipientNames?.some((name) => name.toLowerCase().includes(lower)) ||
        n.message?.toLowerCase().includes(lower) ||
        n.type?.toLowerCase().includes(lower) ||
        n.status?.toLowerCase().includes(lower);

      const matchesType = type === "" || n.type === type;
      return matchesSearch && matchesType;
    });

    setFilteredNotifications(filtered);
  };

  const handleTypeFilterChange = (e) => {
    const newType = e.target.value;
    setSelectedTypeFilter(newType);
    handleSearch(searchQuery, newType);
  };

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const handleSendNotification = () => {
    if (!userData || !userData.userId) {
      toast.error("User data is still loading. Please wait...");
      return;
    }
    setOpenSendDialog(true);
  };

  const handleCloseSendDialog = () => {
    setOpenSendDialog(false);
    setSelectedRole("");
    setSelectedUsers([]);
    setMessage("");
    setType("Email");
  };

  const handleCloseClearDialog = () => {
    setOpenClearDialog(false);
  };

  const handleRoleChange = async (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setSelectedUsers([]);

    try {
      if (role === "All Users") {
        const { data } = await axios.get(`${backendUrl}/api/user/all`);
        if (data.success) setSelectedUsers(data.usersData);
      } else if (role === "All Employees") {
        const { data } = await axios.get(`${backendUrl}/api/user/allemployees`);
        if (data.success) setSelectedUsers(data.employees);
      } else if (role !== "Selected Users") {
        const { data } = await axios.get(`${backendUrl}/api/user/by-role?role=${role}`);
        if (data.success) setSelectedUsers(data.users);
      }
    } catch (err) {
      toast.error("Failed to load users for selected role");
    }
  };

  const handleSend = async () => {
    if (!userData || !userData.userId) {
      toast.error("Sender not identified. Please re-login.");
      return;
    }

    try {
      const payload = {
        recipients: selectedUsers.map((u) => u.userId),
        message,
        type,
        senderId: userData.userId,
      };

      const { data } = await axios.post(`${backendUrl}/api/notifications/send`, payload);
      if (data.success) {
        toast.success("Notification sent successfully!");
        handleCloseSendDialog();
        fetchNotificationHistory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send notification");
    }
  };

  const handleRemoveSelectedUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u.userId !== userId));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Notifications Management
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Send Notification" icon={<SendIcon />} iconPosition="start" />
        <Tab label="Notification History" icon={<HistoryIcon />} iconPosition="start" />
      </Tabs>

      {/* SEND NOTIFICATION */}
      {tabValue === 0 && (
        <Card elevation={3}>
          <CardHeader
            title="Send Notifications"
            subheader="Send messages via Email/SMS to selected users."
            avatar={<Avatar sx={{ bgcolor: "primary.main" }}><NotificationsIcon /></Avatar>}
          />
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              size="large"
              fullWidth
              onClick={handleSendNotification}
              sx={{ py: 1.5 }}
            >
              Compose New Notification
            </Button>
          </CardContent>
        </Card>
      )}

      {/* NOTIFICATION HISTORY */}
      {tabValue === 1 && (
        <Card elevation={3} sx={{ mt: 3 }}>
          <CardHeader
            title="Notification History"
            subheader="View all previously sent notifications."
            avatar={<Avatar sx={{ bgcolor: "secondary.main" }}><HistoryIcon /></Avatar>}
          />
          <CardContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Search Notifications"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type Filter</InputLabel>
                  <Select
                    value={selectedTypeFilter}
                    onChange={handleTypeFilterChange}
                    label="Type Filter"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="SMS">SMS</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpenClearDialog(true)}
                  sx={{ mt: 2 }}
                >
                  Clear History
                </Button>
              </Grid>
            </Grid>

            {filteredNotifications.length === 0 ? (
              <Typography>No notifications found.</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Sender</strong></TableCell>
                      <TableCell><strong>Recipients</strong></TableCell>
                      <TableCell><strong>Message</strong></TableCell>
                      <TableCell><strong>Type</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Timestamp</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredNotifications.map((notif) => (
                      <TableRow key={notif._id} hover>
                        <TableCell>{notif.senderName || notif.senderId}</TableCell>
                        <TableCell>
                          {Array.isArray(notif.recipientNames)
                            ? notif.recipientNames.join(", ")
                            : notif.recipientNames || notif.recipientId}
                        </TableCell>
                        <TableCell>{notif.message}</TableCell>
                        <TableCell>{notif.type}</TableCell>
                        <TableCell>{notif.status}</TableCell>
                        <TableCell>{new Date(notif.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* SEND DIALOG */}
      <Dialog open={openSendDialog} onClose={handleCloseSendDialog} maxWidth="md" fullWidth>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Send To</InputLabel>
                <Select value={selectedRole} onChange={handleRoleChange} label="Send To">
                  <MenuItem value="">Select Role</MenuItem>
                  {userRoles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {selectedRole === "Selected Users" && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={users}
                  getOptionLabel={(u) => u.name}
                  value={selectedUsers}
                  onChange={(e, newVal) => setSelectedUsers(newVal)}
                  renderInput={(params) => <TextField {...params} label="Select Users" fullWidth />}
                />
              </Grid>
            )}

            {selectedUsers.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedUsers.map((u) => (
                    <Chip
                      key={u.userId}
                      label={u.name}
                      onDelete={() => handleRemoveSelectedUser(u.userId)}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseSendDialog}>Cancel</Button>
          <Tooltip title="Click to send">
            <Button variant="contained" startIcon={<SendIcon />} onClick={handleSend}>
              Send
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

      {/* CLEAR HISTORY CONFIRMATION DIALOG */}
      <Dialog open={openClearDialog} onClose={handleCloseClearDialog}>
        <DialogTitle>Confirm Clear History</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to clear all notification history? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearHistory}
          >
            Clear History
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationManagement;