import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const DeleteUserDialog = ({ open, onClose, selectedUser, onDelete }) => {
  const handleDelete = async () => {
    console.log("Delete user:", selectedUser.userId);
    try {
      // Make a DELETE request with userId in the request body
      const response = await axios.delete("http://localhost:4000/api/user/delete", {
        data: { userId: selectedUser.userId }, // Send userId in the request body
      });

      if (response.data.success) {
        toast.success("User deleted successfully");
        onDelete(selectedUser); // Update the UI by removing the deleted user
      } else {
        toast.error(response.data.message || "Failed to delete user. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      // Display a detailed error message
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to delete user. Please try again later."}`);
      } else if (error.request) {
        toast.error("No response from the server. Please check your network connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;