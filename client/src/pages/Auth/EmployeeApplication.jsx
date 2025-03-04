import React, { useState } from "react";
import { Button, Container, Typography, TextField, MenuItem, Stack, InputLabel, Select, FormControl, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { motion } from "framer-motion";

const roles = [
  { name: "Doctor", requirements: "Medical degree, valid license, 2+ years experience." },
  { name: "Nurse", requirements: "Nursing certification, valid license, 1+ year experience." },
  { name: "Caregiver", requirements: "Caregiving experience, certification preferred." },
  { name: "Driver", requirements: "Valid driving license, clean record, experience with patient transport preferred." }
];

const EmployeeApplication = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [cvFile, setCvFile] = useState(null);

  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Application submitted successfully!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Paper elevation={4} sx={{ padding: "30px", borderRadius: "12px", backgroundColor: "#F9FAFC" }}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Join Our Team
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField label="Full Name" variant="outlined" fullWidth required />
              <TextField label="Email" type="email" variant="outlined" fullWidth required />
              <TextField label ="NIC" variant="outlined" fullWidth required />
              <TextField label="Address" variant="outlined" fullWidth required />
              <TextField label="Phone Number" type="tel" variant="outlined" fullWidth required />
              
              <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                  {roles.map((role) => (
                    <MenuItem key={role.name} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {selectedRole && (
                <Typography variant="body1" sx={{ fontStyle: "italic", color: "#555" }}>
                  Requirements: {roles.find(role => role.name === selectedRole)?.requirements}
                </Typography>
              )}
              
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: "#0353a4", "&:hover": { backgroundColor: "#013B66" } }}
              >
                Upload CV
                <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
              </Button>
              {cvFile && <Typography variant="body2" color="green">{cvFile.name} uploaded</Typography>}
              
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#028A0F", "&:hover": { backgroundColor: "#02660D" } }}>
                Submit Application
              </Button>
            </Stack>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default EmployeeApplication;
