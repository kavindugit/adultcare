import * as React from "react";
import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from "axios";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid2, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { AppContent } from "../../context/AppContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";


const HealthReport = ({padultId}) => {
  
  const location = useLocation();
  //const { selectedValueAdult } = location.state || {};
  const {appState} = useContext(AppContent);
  
  const [adult, setAdult] = useState({
    name: "",
    nic: "",
    age: "",
    bloodGroup: "",
    dietaryPreference: "",
    medications: "",
    smokingStatus: "",
  });
  const [notes, setNotes] = useState({
    note: "",
    adultId: "",
    noteType: "",
  });

  const [isPrescription, setIsPrescription] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();  
  const dialogContentTextRef = useRef(null); 
  const dialogContentDocRef = useRef(null); 
  const dialogContentNurseRef = useRef(null); 
  const dialogContentCGRef = useRef(null); 
  const dialogContentPresRef = useRef(null); 

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };
   const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() => {

    const fetchHealthReport = async () => {

      setIsPrescription(false);
      try {        
        const response  = await axios.get("http://localhost:4000/api/healthreport/adultInfo", 
           {
            params: {selectedValueAdult: appState.adultId}
            }
          );      
        
        setAdult(response.data.adultData);
        
        const res  = await axios.get("http://localhost:4000/api/healthreport/notes", 
           {
            params: {selectedValueAdult: appState.adultId}
            }
          );   
          console.log(res.data.notes);
          if(res.data.success)  {     
            {res.data.notes.map((note) => {
              console.log('note.noteType: '+note.noteType);  
              if(note.noteType === "Doctor") { 
                dialogContentDocRef.current.textContent = note.note;                
              }else 
              if(note.noteType === "Nurse") {
                dialogContentNurseRef.current.textContent = note.note; 
              } else
              if(note.noteType === "Caregiver") {                 
                dialogContentCGRef.current.textContent = note.note;  
              }else
              if(note.noteType === "Prescription") {                 
                dialogContentPresRef.current.textContent = note.note;  
              }
            });
          }};
      } catch (error) {
        toast.error('Something went wrong. Please try again.' + {error})
      }
    };
    fetchHealthReport();
    
  }, []);

  const handleDocClick = () => {
    if (dialogContentDocRef.current) {
      if(appState.userData.role === "Doctor") {
        const textContent = dialogContentDocRef.current.textContent;    
        setNoteContent(textContent);
        handleClickOpen();
      } else {      
          toast.error("Only Doctors can Edit the note");
      }
    }
  };
  const handleNurseClick = () => {
    if (dialogContentNurseRef.current) {
      if(appState.userData.role === "Nurse") {
        const textContent = dialogContentNurseRef.current.textContent;    
        setNoteContent(textContent);
        handleClickOpen()
      }  else {      
        toast.error("Only Nurse can Edit the note");
      }      
    };
  };

  const handleCGClick = () => {
    if (dialogContentCGRef.current) {
      if(appState.userData.role === "Caregiver") {
        const textContent = dialogContentCGRef.current.textContent;  
        console.log(textContent)  
        setNoteContent(textContent);
      } else {      
        toast.error("Only Caregiver can Edit the note");
      }      
    };
  };

  const handlePresClick = () => {
    if (dialogContentPresRef.current) {
      if(appState.userData.role === "Doctor") {
        const textContent = dialogContentPresRef.current.textContent;    
        setNoteContent(textContent);
        setIsPrescription(true);
        handleClickOpen()
      } else {      
        toast.error("Only Doctor can work on the Prescription");
      }
    };
  }
  
  const handleSubmit = async (e) => {
    if (dialogContentTextRef.current) {
      const textContent = dialogContentTextRef.current.textContent;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/healthreport/updateNote', {
        note: noteContent,
        noteType: isPrescription ? 'Prescription' : appState.userData.role,
        adultId : appState.adultId
      });
  
      if (response.data.success) {
        toast.success( response.data.message)
        window.location.reload();
      } else {        
        toast.error( response.data.message)
      }
      setIsPrescription(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.' + {error})
    }
  };

  const handleDelete = async (e) => {
    try {

      console.log(" delete  ->" + appState.userData.role);
      console.log(" delete  ->" + appState.adultId);
   
      const response = await axios.delete('http://localhost:4000/api/healthreport/deleteNote', {
        data: {noteType: isPrescription ? 'Prescription' : appState.userData.role, adultId : appState.adultId},       
      });
      setIsPrescription(false);
      if (response.data.success) {
         window.location.reload();         
        toast.success( response.data.message)
      } else {
        toast.error( response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.' + {error})
    }
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
    
    <div className="relative max-w-2xl mx-auto mt-9 p-10 bg-white rounded-lg shadow-lg border border-blue-300">
      <div className="relative w-full h-40 p-3 bg-blue-300 rounded-lg flex items-center justify-center">
       
      <div>
        
      <Stack direction="row" spacing={1} >
      <Item>
      <Stack direction="column" alignItems="center" spacing={1} width={"100%"}>
        <TextField
          disabled
          id="outlined-disabled1"
          label="Adult Name"
          defaultValue={adult.name}
        >{adult.name}</TextField>
         <TextField
          disabled
          id="outlined-disabled2"
          label="Adult Age"
          defaultValue={adult.age}
        >{adult.age}</TextField>      
      </Stack>
      </Item>
      <Item>
      <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
          disabled
          id="outlined-disabled3"
          label="Medications"
          defaultValue={adult.medications}
        >{adult.medications}</TextField>
         <TextField
          disabled
          id="outlined-disabled4"
          label="Smoking Status"
          defaultValue={adult.smokingStatus}
        >{adult.smokingStatus}</TextField>     
      </Stack>
      </Item>
      <Item>
      <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
          disabled
          id="outlined-disabled5"
          label="Dietary Preference"
          defaultValue={adult.dietaryPreference}
        >{adult.dietaryPreference}</TextField>
         <TextField
          disabled
          id="outlined-disabled6"
          label="Blood Group"
          defaultValue={adult.bloodGroup}
        >{adult.bloodGroup}</TextField>          
      </Stack>
      </Item>
      
      </Stack>
          </div>
      </div>
    
      <div className="p-6 relative w-full bg-blue-100 rounded-lg flex items-center justify-center" >
    
        <Grid2 container spacing={3}>
      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px' }} onClick={() => handleDocClick()}>
          <Typography variant="h6" gutterBottom>
            Doctor Note
          </Typography>
          <Typography variant="body2" ref={dialogContentDocRef} sx={{ whiteSpace: 'pre-line' }}>
            Click Here to Add the Note
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px'}} onClick={() => handleNurseClick()}>
          <Typography variant="h6" gutterBottom>
            Nurse Note
          </Typography>
          <Typography variant="body2" ref={dialogContentNurseRef} sx={{ whiteSpace: 'pre-line' }}>
            Click Here to Add the Note
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px', width:"100%" } } onClick={() => handleCGClick()}>
          <Typography variant="h6" gutterBottom>
            Care Giver Note
          </Typography>
          <Typography variant="body2" ref={dialogContentCGRef} sx={{ whiteSpace: 'pre-line' }}>
            Click Here to Add the Note
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} width={'100%'}>
        <Paper elevation={3} style={{ padding: '16px', width:"100%" } } onClick={() => handlePresClick()}>
          <Typography variant="h6" gutterBottom>
            Doctor Prescription
          </Typography>
          <Typography variant="body2" ref={dialogContentPresRef} sx={{ whiteSpace: 'pre-line' }}>
            Click here to add the prescription.
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
                  handleSubmit();
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
            <TextField
                autoFocus
                margin="dense"
                label="Your Note"
                type="text"
                fullWidth
                multiline
                minRows={4}
                value={ noteContent} 
                onChange={handleChange}
                ref={dialogContentTextRef} 
              />                           
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>              
              <Button onClick={() => handleDelete()}>Delete</Button>
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
