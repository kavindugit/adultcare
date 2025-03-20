import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import UpdateUserDialog from "./UpdateUserDialog"; // Import UpdateUserDialog
import DeleteUserDialog from "./DeleteUserDialog"; // Import DeleteUserDialog

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const itemsPerPage = 5;

  // Fetch users data when the component mounts
  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/user/all");
        if (data.success) {
          setUsers(data.usersData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch users data. Please try again.");
        console.error("Error fetching users data:", error);
      }
    };

    fetchAllUsersData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleRoleFilter = (e) => {
    setFilterRole(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user); // Ensure selectedUser contains userId
    console.log("Menu opened for user:", user.name);
    console.log("Selected User set:", user); // Debug: Log the selected user
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // Do not reset selectedUser here
  };

  const handleEditUser = () => {
    console.log("Selected User before opening dialog:", selectedUser); // Debug: Log the selected user
    if (selectedUser) {
      console.log("Selected User for update:", selectedUser); // Debug: Log the selected user data
      setOpenUpdateDialog(true); // Open the dialog after setting selectedUser
    } else {
      console.log("No user selected for update."); // Debug: Log if no user is selected
    }
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      console.log("Selected User for deletion:", selectedUser); // Debug: Log the selected user data
      setOpenDeleteDialog(true);
    } else {
      console.log("No user selected for deletion."); // Debug: Log if no user is selected
    }
    handleMenuClose();
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
  };

  const handleDeleteConfirmed = (userToDelete) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.userId !== userToDelete.userId)
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      {/* Tabs for Users */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All Users" />
        <Tab label="Guardians" />
        <Tab label="Adults" />
        <Tab label="Doctors" />
        <Tab label="Nurses" />
        <Tab label="Caregivers" />
      </Tabs>

      {/* All Users Tab */}
      {tabValue === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
              }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Role</InputLabel>
              <Select value={filterRole} onChange={handleRoleFilter} label="Role">
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Guardian">Guardian</MenuItem>
                <MenuItem value="Adult">Adult</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Caregiver">Caregiver</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={handleStatusFilter} label="Status">
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* User Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === "Active" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredUsers.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>

          {/* User Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditUser}>
              <EditIcon sx={{ mr: 1 }} /> Update
            </MenuItem>
            <MenuItem onClick={handleDeleteUser}>
              <DeleteIcon sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>

          {/* Update User Dialog */}
          <UpdateUserDialog
            open={openUpdateDialog}
            onClose={() => {
              setOpenUpdateDialog(false);
              setSelectedUser(null); // Reset selectedUser after dialog closes
            }}
            selectedUser={selectedUser}
            onUpdate={handleUpdateUser}
          />

          {/* Delete User Dialog */}
          <DeleteUserDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            selectedUser={selectedUser}
            onDelete={handleDeleteConfirmed}
          />
        </Box>
      )}

      {/* Guardians Tab */}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Guardians Management
          </Typography>

          {/* Search and Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
              }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={handleStatusFilter} label="Status">
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Guardians Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Dependents</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers
                  .filter((user) => user.role === "Guardian")
                  .map((guardian) => (
                    <TableRow key={guardian.userId}>
                      <TableCell>{guardian.name}</TableCell>
                      <TableCell>{guardian.email}</TableCell>
                      <TableCell>{guardian.role}</TableCell>
                      <TableCell>
                        <Chip
                          label={guardian.status}
                          color={guardian.status === "Active" ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {guardian.dependents?.map((dependent, index) => (
                            <Typography key={index} variant="body2">
                              {dependent.name} (Age: {dependent.age})
                            </Typography>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleMenuOpen(e, guardian)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredUsers.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>

          {/* User Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditUser}>
              <EditIcon sx={{ mr: 1 }} /> Update
            </MenuItem>
            <MenuItem onClick={handleDeleteUser}>
              <DeleteIcon sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>

          {/* Update User Dialog */}
          <UpdateUserDialog
            open={openUpdateDialog}
            onClose={() => {
              setOpenUpdateDialog(false);
              setSelectedUser(null); // Reset selectedUser after dialog closes
            }}
            selectedUser={selectedUser}
            onUpdate={handleUpdateUser}
          />

          {/* Delete User Dialog */}
          <DeleteUserDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            selectedUser={selectedUser}
            onDelete={handleDeleteConfirmed}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersManagement;