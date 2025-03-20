import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
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

const TaskAssignmentDialog = ({ open, onClose }) => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");

  const handleAssignTask = () => {
    // Logic to assign the task
    console.log("Task Assigned:", { task, dueDate, priority, notes });
    navigate("/"); // Navigate back to the employees page
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h4">Assign Task to Employee #{employeeId}</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          sx={{ mb: 2, mt: 2 }}
        />
        <TextField
          fullWidth
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Notes"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAssignTask} variant="contained" color="primary">
          Assign Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskAssignmentDialog;