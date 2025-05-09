import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { AppContent } from "../../context/AppContext";
import { toast } from 'react-toastify';


export default function AdultSearch({ open, handleClose }) {
  const {setAdultId , appState} = useContext(AppContent);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [adultIdError, setAdultIdError] = useState(false); // State for adult id validation error
  const navigate = useNavigate();
  const [adults, setAdults] = useState([]);
  const [selectedValueAdult, setSelectedValueAdult] = useState('');

  
  useEffect(() => {
    // Simulate an API call to fetch options
    const fetchAllAdultsData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/healthreport/adults");
        if (data.success) {
          setAdults(data.adultsData);
        } else {          
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch users data. Please try again.");
      }
    };
    fetchAllAdultsData();
   
  }, []);
  
  
  const handleChangeAdult = (event) => {
    setAdultId(event.target.value);
    setSelectedValueAdult(event.target.value);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setAdultIdError(false); 

    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests     
      navigate('/report-module');
      
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error); // Log the error for debugging
    }

    setLoading(false);
    {handleClose};
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Adult Search</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DialogContentText>
          Search Adult.
        </DialogContentText>
        <div style={{ padding: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label1">Select Adult</InputLabel>
        <Select
          labelId="dropdown-label1"
          id={selectedValueAdult}
          value={selectedValueAdult}
          onChange={handleChangeAdult}
          label="Select an Adult"
          displayEmpty
        >
          {/* Option for when no value is selected */}
          <MenuItem value="" disabled>
            Please select an option
          </MenuItem>

          {/* Dynamically populate MenuItems from the fetched options array */}
          {adults.map((adult) => (
            <MenuItem key={adult.nic} value={adult.nic}>
              {adult.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText> </FormHelperText>
      </FormControl>      
    </div>
        {adultIdError && <p style={{ color: 'red', margin: 0 }}>Adult ID is required.</p>}
        {message && <p style={{ color: 'red', margin: 0 }}>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}