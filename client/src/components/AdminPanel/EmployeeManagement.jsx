import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  Task as TaskIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import PermissionAssignmentDialog from "./PermissionAssignmentDialog";
import TaskAssignmentDialog from "./TaskAssignmentDialog";
import NotificationDialog from "./NotificationDialog";

// Dummy Data
const dummyApplications = [
  {
    id: 1,
    name: "Applicant One",
    appliedRole: "Doctor",
    status: "Pending",
    applicationDate: "2023-10-01",
    comments: "No comments",
    documents: ["Resume.pdf", "CoverLetter.pdf"],
  },
];

const dummyOnboardingTasks = [
  {
    id: 1,
    employeeId: 1,
    tasks: [
      { id: 1, name: "Submit Documents", status: "Completed" },
      { id: 2, name: "Complete Training", status: "In Progress" },
      { id: 3, name: "Attend Orientation", status: "Pending" },
    ],
  },
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [applications, setApplications] = useState(dummyApplications);
  const [onboardingTasks, setOnboardingTasks] = useState(dummyOnboardingTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openPermissionDialog, setOpenPermissionDialog] = useState(false); // For PermissionAssignmentDialog
  const [openTaskDialog, setOpenTaskDialog] = useState(false); // For TaskAssignmentDialog
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false); // For NotificationDialog

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllEmployeesData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/user/allemployees");
        if (data.success) {
          setEmployees(data.employees);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch users data. Please try again.");
        console.error("Error fetching users data:", error);
      }
    };

    fetchAllEmployeesData();
  }, []);

  // Handle Menu Open
  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee); // Set the selected employee
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Permission Assignment Dialog Open
  const handlePermissionAssignment = () => {
    if (selectedEmployee) {
      setOpenPermissionDialog(true); // Open PermissionAssignmentDialog
    }
    handleMenuClose();
  };

  // Handle Task Assignment Dialog Open
  const handleTaskAssignment = () => {
    if (selectedEmployee) {
      setOpenTaskDialog(true); // Open TaskAssignmentDialog
    }
    handleMenuClose();
  };

  // Handle Notification Dialog Open
  const handleNotification = () => {
    if (selectedEmployee) {
      setOpenNotificationDialog(true); // Open NotificationDialog
    }
    handleMenuClose();
  };

  // Handle Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  // Handle Role Filter
  const handleRoleFilter = (e) => {
    setFilterRole(e.target.value);
    setPage(1);
  };

  // Handle Status Filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  };

  // Filter Employees
  const filteredEmployees = employees ? employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || employee.role === filterRole;
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  }) : [];

  // Paginate Employees
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle View Employee
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenEmployeeDialog(true);
  };

  // Handle View Application
  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setOpenApplicationDialog(true);
  };

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Employees Management
      </Typography>

      {/* Tabs for Employees, Applications, and Onboarding */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Employees" />
        <Tab label="Applications" />
        <Tab label="Onboarding" />
      </Tabs>

      {/* Employees Tab */}
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
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Caregiver">Caregiver</MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
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

          {/* Employee Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        color={employee.status === "Active" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phoneNo}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, employee)}>
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
              count={Math.ceil(filteredEmployees.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>

          {/* Employee Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handlePermissionAssignment}>
              <EditIcon sx={{ mr: 1 }} /> Assign Permission
            </MenuItem>
            <MenuItem onClick={handleTaskAssignment}>
              <AssignmentIcon sx={{ mr: 1 }} /> Assign Task
            </MenuItem>
            <MenuItem onClick={handleNotification}>
              <NotificationsIcon sx={{ mr: 1 }} /> Send Notification
            </MenuItem>
          </Menu>

          {/* Permission Assignment Dialog */}
          {openPermissionDialog && (
            <PermissionAssignmentDialog
              open={openPermissionDialog}
              onClose={() => {
                setOpenPermissionDialog(false);
                setSelectedEmployee(null); // Reset selectedEmployee
              }}
              selectedEmployee={selectedEmployee}
            />
          )}

          {/* Task Assignment Dialog */}
          {openTaskDialog && (
            <TaskAssignmentDialog
              open={openTaskDialog}
              onClose={() => {
                setOpenTaskDialog(false);
                setSelectedEmployee(null); // Reset selectedEmployee
              }}
              selectedEmployee={selectedEmployee}
            />
          )}

          {/* Notification Dialog */}
          {openNotificationDialog && (
            <NotificationDialog
              open={openNotificationDialog}
              onClose={() => {
                setOpenNotificationDialog(false);
                setSelectedEmployee(null); // Reset selectedEmployee
              }}
              selectedEmployee={selectedEmployee}
            />
          )}
        </Box>
      )}

      {/* Applications Tab */}
      {tabValue === 1 && (
        <Box>
          {/* Applications Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Applied Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Application Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.appliedRole}</TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={
                          application.status === "Approved"
                            ? "success"
                            : application.status === "Rejected"
                            ? "error"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>{application.applicationDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewApplication(application)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Onboarding Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Onboarding Tasks
          </Typography>
          <List>
            {onboardingTasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Employee: ${employees && employees.find((e) => e.id === task.employeeId)?.name}`}
                  secondary={
                    <Box>
                      {task.tasks.map((t) => (
                        <Typography key={t.id}>
                          {t.name}: <Chip label={t.status} size="small" />
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeManagement;