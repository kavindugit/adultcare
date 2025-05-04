import { Card, CardContent, Grid, TextField, Avatar, Typography } from '@mui/material';

const BasicInfoCard = ({ userData, editMode, handleInputChange }) => {
  if (!userData) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Basic Information</Typography>
        <Grid container spacing={2}>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, margin: 'auto' }}>
              {userData.fullName ? userData.fullName.charAt(0) : '?'}
            </Avatar>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNo"
              value={userData.phoneNo}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="NIC"
              name="nic"
              value={userData.nic}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              value={userData.dob ? userData.dob.split('T')[0] : ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              name="role"
              value={userData.role}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="status"
              value={userData.status}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;
