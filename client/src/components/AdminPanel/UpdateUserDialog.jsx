import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

const UpdateUserDialog = ({ open, onClose, selectedUser, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form fields when the dialog is opened or closed
  useEffect(() => {
    if (open && selectedUser) {
      setName(selectedUser.name || "");
      setEmail(selectedUser.email || "");
      setRole(selectedUser.role || "");
      setStatus(selectedUser.status || "");
    } else {
      setName("");
      setEmail("");
      setRole("");
      setStatus("");
    }
  }, [open, selectedUser]);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Check if selectedUser is defined
      if (!selectedUser || !selectedUser.userId) {
        toast.error("Selected user data is incomplete. Please try again.");
        return;
      }

      // Prepare the updated data
      const updatedData = {
        userId: selectedUser.userId,
        updates: {
          name,
          email,
          role,
          status,
        },
      };

      // Make a PUT request to the backend
      const response = await axios.put(
        "http://localhost:4000/api/user/update",
        updatedData
      );

      if (response.data.success) {
        toast.success("User updated successfully");
        onUpdate(selectedUser); // Update the UI with the new data
      } else {
        toast.error(response.data.message || "Failed to update user. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating user:", error);

      // Display a detailed error message
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to update user. Please try again later."}`);
      } else if (error.request) {
        toast.error("No response from the server. Please check your network connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Guardian">Guardian</MenuItem>
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Caregiver">Caregiver</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserDialog;