import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const NotificationDialog = ({ open, onClose }) => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Normal");

  const handleSendNotification = () => {
    // Logic to send notification
    console.log("Notification Sent:", { message, priority });
    navigate("/"); // Navigate back to the employees page
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h4">Send Notification to Employee #{employeeId}</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSendNotification} variant="contained" color="primary">
          Send Notification
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;