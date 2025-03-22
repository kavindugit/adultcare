import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button, Card, CardContent, Typography, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PackageCard from './PackageCard';
import PackageForm from './PackageForm';

const API_URL = 'http://localhost:5173/api/packages';

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, packageId: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = () => {
    setCurrentPackage(null);
    setShowForm(true);
  };

  const handleEditPackage = (packageToEdit) => {
    setCurrentPackage(packageToEdit);
    setShowForm(true);
  };

  const handleDeleteClick = (packageId) => {
    setDeleteDialog({ open: true, packageId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.packageId) {
      try {
        const response = await fetch(`${API_URL}/${deleteDialog.packageId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setPackages(packages.filter(pkg => pkg._id !== deleteDialog.packageId));
        toast.success('Package deleted successfully');
      } catch (error) {
        console.error('Error deleting package:', error);
        toast.error('Failed to delete package');
      }
    }
    setDeleteDialog({ open: false, packageId: null });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
      <Card sx={{ padding: 3, marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" fontWeight={600}>Care Package Management</Typography>
          <Typography color="textSecondary">Create, update, and manage care service packages</Typography>
        </div>
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreatePackage}>
          Create Package
        </Button>
      </Card>
      
      {showForm && (
        <PackageForm packageToEdit={currentPackage} onSubmit={fetchPackages} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : packages.length > 0 ? (
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
              <PackageCard packageItem={pkg} onEdit={handleEditPackage} onDelete={handleDeleteClick} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6">No packages found</Typography>
          <Typography color="textSecondary">There are no care packages created yet. Start by creating your first care package.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreatePackage}>Create Your First Package</Button>
        </Card>
      )}

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, packageId: null })}>
        <DialogTitle>Delete Package</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this package? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, packageId: null })} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" startIcon={<DeleteIcon />}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PackageManagement;
