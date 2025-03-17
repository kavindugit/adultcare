// UsersManagement.js
import React from "react";
import Box from "@mui/material/Box"; // Add this import
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const UsersManagement = () => {
  const users = [
    { id: 1, name: "John Doe", role: "Guardian" },
    { id: 2, name: "Jane Smith", role: "Adult" },
    { id: 3, name: "Dr. Emily Brown", role: "Doctor" },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.role} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UsersManagement;