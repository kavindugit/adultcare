// ✅ Corrected Imports
import * as React from "react";
import { useContext } from "react"; // Added useContext
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

// Components
import Dashboard from "../../components/AdminPanel/Dashboard";
import UsersManagement from "../../components/AdminPanel/UsersManagement";
import EmployeeManagement from "../../components/AdminPanel/EmployeeManagement";
import SecurityLogs from "../../components/AdminPanel/SecurityLogs";
import NotificationManagement from "../../components/AdminPanel/NotificationManagement";
import PackageSection from "../../components/AdminPanel/PackageSection";
import InventorySection from "../../components/AdminPanel/InventorySection";
import AdminSessionTable from "../Reservations/AdminSessionTable";
import Scheduling from "../../components/AdminPanel/Scheduling";
import { AppContent } from "../../context/AppContext";

// Styled Components
const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  backgroundColor: "#002855",
  color: "#FFFFFF",
  height: "100vh",
  padding: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 1000,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#F5F5F5",
  padding: theme.spacing(4),
  marginLeft: "250px",
  transition: "margin-left 0.3s ease-in-out",
}));

const AdminPanel = () => {
  const { userData } = useContext(AppContent); // Access userData from context
  const [activeSection, setActiveSection] = React.useState("dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

  // Use userData for admin info, with fallbacks
  const admin = {
    name: userData?.name || "Admin User",
    role: "Admin",
    image: userData?.image || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740", // Optional: Add image to userModel if needed
  };

  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", text: "Users Management", icon: <PeopleIcon /> },
    { id: "employees", text: "Employees", icon: <WorkIcon /> },
    { id: "packages", text: "Packages", icon: <LocalShippingIcon /> },
    { id: "inventory", text: "Inventory", icon: <InventoryIcon /> },
    { id: "sessions", text: "Sessions", icon: <WorkIcon /> },
    { id: "sheduling", text: "Scheduling", icon: <PeopleIcon /> },
    { id: "payments", text: "Payments", icon: <MonetizationOnIcon /> },
    { id: "notifications", text: "Notifications", icon: <NotificationsIcon /> },
    { id: "security", text: "Security Logs", icon: <SecurityIcon /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersManagement />;
      case "employees":
        return <EmployeeManagement />;
      case "notifications":
        return <NotificationManagement />;
      case "security":
        return <SecurityLogs />;
      case "packages":
        return <PackageSection />;
      case "inventory":
        return <InventorySection />;
      case "sheduling":
        return <Scheduling />;
      case "sessions":
        return <AdminSessionTable />;
      default:
        return <Typography variant="h4">Welcome to Admin Panel</Typography>;
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar
        sx={{
          transform: isSidebarVisible ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Admin Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Avatar
            alt={admin.fullName}
            src={admin.image}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {admin.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#AAB4BE" }}>
            {admin.role}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#FFFFFF", mb: 2 }} />

        {/* Sidebar Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              component="button"
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{
                backgroundColor:
                  activeSection === item.id ? "#0F151D" : "transparent",
                borderRadius: 1,
                mb: 1,
                "&:hover": { backgroundColor: "#0F151D" },
              }}
            >
              <ListItemIcon sx={{ color: "#FFFFFF" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Sidebar>

      {/* Main Panel */}
      <MainContent sx={{ marginLeft: isSidebarVisible ? "250px" : "0" }}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            sx={{
              background: "#183a6d",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { background: "#102347" },
            }}
          >
            {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: 3,
          }}
        >
          {renderContent()}
        </Box>
      </MainContent>
    </Box>
  );
};

export default AdminPanel;