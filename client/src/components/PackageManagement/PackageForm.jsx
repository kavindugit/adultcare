import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const serviceOptions = [
  { id: "caregiver", label: "Caregiver" },
  { id: "nurse", label: "Nurse" },
  { id: "doctor", label: "Doctor" },
  { id: "therapy", label: "Therapy" },
  { id: "medication", label: "Medication" },
  { id: "meals", label: "Meals" }
];

const PackageForm = ({ packageToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    packageId: "",
    name: "",
    description: "",
    services: [],
    duration: "",
    price: ""
  });

  useEffect(() => {
    if (packageToEdit) {
      setFormData({
        _id: packageToEdit._id,
        packageId: packageToEdit.packageId,
        name: packageToEdit.name,
        description: packageToEdit.description,
        services: packageToEdit.services,
        duration: packageToEdit.duration,
        price: packageToEdit.price.toString()
      });
    } else {
      setFormData({
        packageId: "Auto-generated",
        name: "",
        description: "",
        services: [],
        duration: "",
        price: ""
      });
    }
  }, [packageToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const updatedServices = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];

      return { ...prev, services: updatedServices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || formData.services.length === 0 || !formData.duration || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    onSubmit(submitData);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <form onSubmit={handleSubmit}>
        <CardHeader
          title={packageToEdit ? "Edit Package" : "Create New Package"}
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Package ID"
                name="packageId"
                value={formData.packageId}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
              <Typography variant="caption" color="textSecondary">
                Auto-generated ID
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Package Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Services Included:</Typography>
              <Grid container>
                {serviceOptions.map((service) => (
                  <Grid item xs={6} key={service.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                        />
                      }
                      label={service.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                placeholder="e.g., 3 months"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Price ($)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", paddingX: 3 }}>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {packageToEdit ? "Update Package" : "Create Package"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default PackageForm;
