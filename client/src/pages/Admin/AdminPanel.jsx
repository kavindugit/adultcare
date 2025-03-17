import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";

// Components for each section
import Dashboard from "../../components/AdminPanel/Dashboard";
import UsersManagement from "../../components/AdminPanel/UsersManagement";



// Styled Components
const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  backgroundColor: "#002855",
  color: "#FFFFFF",
  height: "100vh",
  padding: theme.spacing(2),
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#F5F5F5",
  padding: theme.spacing(4),
}));

const AdminPanel = () => {
  const [activeSection, setActiveSection] = React.useState("dashboard");

  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", text: "Users Management", icon: <PeopleIcon /> },
    { id: "employees", text: "Employees", icon: <WorkIcon /> },
    { id: "payments", text: "Payments", icon: <MonetizationOnIcon /> },
    { id: "notifications", text: "Notifications", icon: <NotificationsIcon /> },
    { id: "security", text: "Security Logs", icon: <SecurityIcon /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersManagement/>;
      /* case "employees":
        return <Employees />;
      case "payments":
        return <Payments />;
      case "notifications":
        return <Notifications />;
      case "security":
        return <SecurityLogs />; */
      default:
        return <Typography variant="h4">Welcome to Admin Panel</Typography>;
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Panel
        </Typography>
        <Divider sx={{ backgroundColor: "#FFFFFF", mb: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
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

      {/* Main Content */}
      <MainContent>
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