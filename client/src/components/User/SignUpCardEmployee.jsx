import React, { useState } from "react";
import { Button, Card, CardContent, Typography, TextField, MenuItem, Stack, InputLabel, Select, FormControl } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { motion } from "framer-motion";

const roles = ["Doctor", "Nurse", "Caregiver", "Driver"];

const SignUpCardEmployee = () => {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Card sx={{ width: "400px", padding: "20px", borderRadius: "12px", boxShadow: 5, backgroundColor: "#F9FAFC" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Join Our Team
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Full Name" variant="outlined" fullWidth required />
              <TextField label="Email" type="email" variant="outlined" fullWidth required />
              <TextField label="Phone Number" type="tel" variant="outlined" fullWidth required />
              
              <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUpCardEmployee;