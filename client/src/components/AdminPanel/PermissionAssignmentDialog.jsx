import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Divider,
} from "@mui/material";

const PermissionAssignmentDialog = ({ open, onClose, selectedEmployee }) => {
  console.log("Selected Employee", selectedEmployee);

  // State for permissions
  const [permissions, setPermissions] = useState({
    reports: {
      view: false,
      export: false,
      edit: false,
    },
    analytics: {
      view: false,
      manage: false,
    },
    settings: {
      editProfile: false,
      manageUsers: false,
    },
  });

  // Handle permission change
  const handlePermissionChange = (category, permission) => (event) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: event.target.checked,
      },
    }));
  };

  // Handle "Select All" for a category
  const handleSelectAll = (category) => (event) => {
    const updatedPermissions = Object.keys(permissions[category]).reduce(
      (acc, key) => {
        acc[key] = event.target.checked;
        return acc;
      },
      {}
    );
    setPermissions((prev) => ({
      ...prev,
      [category]: updatedPermissions,
    }));
  };

  // Handle assigning permissions
  const handleAssignPermissions = () => {
    console.log("Permissions Assigned:", permissions);
    onClose(); // Close the dialog after assigning permissions
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h4" gutterBottom>
          Assign Permissions to Employee #{selectedEmployee?.useId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Reports Section */}
          <Typography variant="h6" gutterBottom>
            Reports
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Object.values(permissions.reports).every(Boolean)}
                  indeterminate={
                    Object.values(permissions.reports).some(Boolean) &&
                    !Object.values(permissions.reports).every(Boolean)
                  }
                  onChange={handleSelectAll("reports")}
                />
              }
              label="Select All Reports Permissions"
            />
            <Box sx={{ ml: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.reports.view}
                    onChange={handlePermissionChange("reports", "view")}
                  />
                }
                label="View Reports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.reports.export}
                    onChange={handlePermissionChange("reports", "export")}
                  />
                }
                label="Export Reports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.reports.edit}
                    onChange={handlePermissionChange("reports", "edit")}
                  />
                }
                label="Edit Reports"
              />
            </Box>
          </FormGroup>
          <Divider sx={{ my: 2 }} />

          {/* Analytics Section */}
          <Typography variant="h6" gutterBottom>
            Analytics
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Object.values(permissions.analytics).every(Boolean)}
                  indeterminate={
                    Object.values(permissions.analytics).some(Boolean) &&
                    !Object.values(permissions.analytics).every(Boolean)
                  }
                  onChange={handleSelectAll("analytics")}
                />
              }
              label="Select All Analytics Permissions"
            />
            <Box sx={{ ml: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.analytics.view}
                    onChange={handlePermissionChange("analytics", "view")}
                  />
                }
                label="View Analytics"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.analytics.manage}
                    onChange={handlePermissionChange("analytics", "manage")}
                  />
                }
                label="Manage Analytics"
              />
            </Box>
          </FormGroup>
          <Divider sx={{ my: 2 }} />

          {/* Settings Section */}
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Object.values(permissions.settings).every(Boolean)}
                  indeterminate={
                    Object.values(permissions.settings).some(Boolean) &&
                    !Object.values(permissions.settings).every(Boolean)
                  }
                  onChange={handleSelectAll("settings")}
                />
              }
              label="Select All Settings Permissions"
            />
            <Box sx={{ ml: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.settings.editProfile}
                    onChange={handlePermissionChange("settings", "editProfile")}
                  />
                }
                label="Edit Profile"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.settings.manageUsers}
                    onChange={handlePermissionChange("settings", "manageUsers")}
                  />
                }
                label="Manage Users"
              />
            </Box>
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAssignPermissions} variant="contained" color="primary">
          Assign Permissions
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionAssignmentDialog;