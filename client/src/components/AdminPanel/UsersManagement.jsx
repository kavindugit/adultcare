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
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import UpdateUserDialog from "./UpdateUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

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
    setSelectedUser(user);
    console.log("Menu opened for user:", user.name);
    console.log("Selected User set:", user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditUser = () => {
    console.log("Selected User before opening dialog:", selectedUser);
    if (selectedUser) {
      console.log("Selected User for update:", selectedUser);
      setOpenUpdateDialog(true);
    } else {
      console.log("No user selected for update.");
    }
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      console.log("Selected User for deletion:", selectedUser);
      setOpenDeleteDialog(true);
    } else {
      console.log("No user selected for deletion.");
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      {/* All Users Tab */}
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
            setSelectedUser(null);
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
    </Box>
  );
};

export default UsersManagement;