import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid2, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const HealthReport = () => {
  const [user, setUser] = useState({
    name: "",
    nic: "",
    email: "",
    phoneNo: "",
    gender: "",
    dob: "",
    isVerified: true,
    isAdmin: true
  });
  const [loading, setLoading] = useState(true);   
  const [message, setMessage] = useState("");
  const [noteContent, setNoteContent] = useState("");
   const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() => {
    const fetchHealthReport = async () => {
      try {        
        const response  = await axios.get("/api/healthreport/adultInfo");      
        
        setMessage(response.jason());
        useState({
          name: "",
          email: "",
          phoneNo: "",
          gender: "",
          dob: "",
        });
        setLoading(false);
       
      } catch (error) {
        setMessage("Failed to fetch user data" + error);
        setLoading(false);
      }
    };
    fetchHealthReport();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (note) => {
    setNoteContent(note);
    handleClickOpen();
  };

  const handleClick1 = (note) => {
    setNoteContent('Doctor Note. Click here to see details.Doctor Note. Click here to see details. Doctor Note. Click here to see details.Doctor Note. Click here to see details. Doctor Note. Click here to see details. Doctor Note. Click here to see details.Doctor Note. Click here to see details.Doctor Note. Click here to see details.');
    
    handleClickOpen();
  };
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    
    <div className="max-w-2xl mx-auto mt-6 p-3 bg-white rounded-lg shadow-lg border border-blue-300">
      <div className="relative w-full h-40 p-3 bg-blue-300 rounded-lg flex items-center justify-center">
       
      <div>
        
      <Stack direction="row" spacing={1} >
      <Item>
      <Stack direction="column" alignItems="center" spacing={1} width={"100%"}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Adult Name"
          defaultValue="Full Name"
        >{user.name}</TextField>
         <TextField
          disabled
          id="outlined-disabled"
          label="Adult Age"
          defaultValue="67"
        >{user.age}</TextField>      
      </Stack>
      </Item>
      <Item>
      <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
          disabled
          id="outlined-disabled"
          label="Blood Group"
          defaultValue="A +"
        >{user.gender}</TextField>
         <TextField
          disabled
          id="outlined-disabled"
          label="Doctor's Name"
          defaultValue="Doctor assigned"
        >{user.email}</TextField>     
      </Stack>
      </Item>
      <Item>
      <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
          disabled
          id="outlined-disabled"
          label="Last Checkup Date"
          defaultValue="2025/03/29"
        >{user.phoneNo}</TextField>
         <TextField
          disabled
          id="outlined-disabled"
          label="Aditional Info"
          defaultValue="Some  value"
        >{user.nic}</TextField>          
      </Stack>
      </Item>
      
      </Stack>
          </div>
      </div>
      <div>    {message && <p className="text-center text-green-500 mb-4">{message}</p>}</div>
     
      <div className="p-6 relative w-full bg-blue-100 rounded-lg flex items-center justify-center" >
    
        <Grid2 container spacing={3}>
      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px' }} onClick={() => handleClick1('Note 1')}>
          <Typography variant="h6" gutterBottom>
            Doctor Note
          </Typography>
          <Typography variant="body2">
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
            Doctor Note. Click here to see details.
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px'}} onClick={() => handleClick('Note 2')}>
          <Typography variant="h6" gutterBottom>
            Nurse Note
          </Typography>
          <Typography variant="body2">
            This is the notes from the Nurse. Click here to Alter the notes.
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px', width:"100%" } } onClick={() => handleClick('Note 3')}>
          <Typography variant="h6" gutterBottom>
            Care Giver Note
          </Typography>
          <Typography variant="body2">
            This is the Care Giver Notes. Click here to alter the notes.
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px', width:"100%" } } onClick={() => handleClick('Prescription')}>
          <Typography variant="h6" gutterBottom>
            Doctor Prescription
          </Typography>
          <Typography variant="body2">
            Prescriptions Goes here. Click here to alter the prescription.
          </Typography>
        </Paper>
      </Grid2>
    </Grid2>

    <Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
                },
                sx: {
                  width: '400px',   // Set the width
                  height: '300px',  // Set the height
                  maxWidth: '100%', // Ensure it doesn't exceed the screen width
                }
              },
            }}
          >
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
              <DialogContentText contentEditable='true'>
              {noteContent}
              </DialogContentText>              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </Dialog>
        </Fragment>

    </div>
    <Divider textAlign="left">Adult Medical Reports</Divider>
    <Box component="section" className="relative w-full h-20 bg-blue-300 rounded-lg flex items-center justify-center"
      width="100%">
      <Link href="#" underline="hover" className="p-2">
        {'Blood Report'}
      </Link>
      <Link href="#" underline="hover" className="p-2">
        {'Suger Report'}
      </Link>
      </Box>
    </div>
  );
};

export default HealthReport;
