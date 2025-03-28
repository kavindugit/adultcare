import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

export default function AdultSearch({ open, handleClose }) {
  const [adultId, setAdultId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [adultIdError, setAdultIdError] = useState(false); // State for adult id validation error
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setAdultIdError(false); 

    // Validate ID
    if (!adultId) {
      setAdultIdError(true); 
      setMessage('Adult ID is required.'); // Set the message
      setLoading(false);
      return;
    }

    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      navigate('/report-module', { state: { adultId } });
      
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error); // Log the error for debugging
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Adult Search</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DialogContentText>
          Enter the Adult ID.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          id="adultId"
          name="adultId"
          placeholder="Adult ID"
          type="text"
          fullWidth
          value={adultId}
          onChange={(e) => {
            setAdultId(e.target.value);
            setAdultIdError(false); 
          }}
          error={adultIdError} // Apply error styling
        />
        {adultIdError && <p style={{ color: 'red', margin: 0 }}>Adult ID is required.</p>}
        {message && <p style={{ color: 'red', margin: 0 }}>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}