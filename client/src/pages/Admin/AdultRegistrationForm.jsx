import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Typography,
  Container,
  Paper,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Admin theme colors
const themeColors = {
  primary: "#F5EDF0", // Deep Blue
  secondary: "#3b82f6", // Light Blue
  error: "#ef4444", // Red
  background: "#f1f5f9", // Slightly darker Light Gray for page background
  formBackground: "#7b2cb2", // Light Gray for form background (softer than pure white)
  borderColor: "#e5e7eb", // Light Gray for form border
};

// Styled components for the form layout with updated theme colors
const PageContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
  backgroundColor: themeColors.background,
  minHeight: "100vh",
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  borderRadius: "8px",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "1800px",
  backgroundColor: themeColors.formBackground, // Softer background
  border: `1px solid ${themeColors.borderColor}`, // Adding a border around the form
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  color: themeColors.primary,
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: themeColors.primary,
  color: "#fff",
  "&:hover": {
    backgroundColor: themeColors.secondary,
  },
}));

const AdultRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    dob: "",
    address: "",
    dietaryPreference: "",
    smokingStatus: "",
    drinkingStatus: "",
    homeType: "",
    preferredLanguage: "",
    chronicConditions: "",
    medications: "",
    doctorName: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    nic: "",
    dob: "",
    address: "",
    dietaryPreference: "",
    smokingStatus: "",
    drinkingStatus: "",
    homeType: "",
    preferredLanguage: "",
    chronicConditions: "",
    medications: "",
    doctorName: "",
    bloodGroup: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.nic) {
      newErrors.nic = "NIC is required";
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.dietaryPreference) {
      newErrors.dietaryPreference = "Dietary Preference is required";
      isValid = false;
    }

    if (!formData.smokingStatus) {
      newErrors.smokingStatus = "Smoking Status is required";
      isValid = false;
    }

    if (!formData.drinkingStatus) {
      newErrors.drinkingStatus = "Drinking Status is required";
      isValid = false;
    }

    if (!formData.homeType) {
      newErrors.homeType = "Home Type is required";
      isValid = false;
    }

    if (!formData.preferredLanguage) {
      newErrors.preferredLanguage = "Preferred Language is required";
      isValid = false;
    }

    if (!formData.chronicConditions) {
      newErrors.chronicConditions = "Chronic Conditions are required";
      isValid = false;
    }

    if (!formData.medications) {
      newErrors.medications = "Medications are required";
      isValid = false;
    }

    if (!formData.doctorName) {
      newErrors.doctorName = "Doctor Name is required";
      isValid = false;
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood Group is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // Validate inputs
      if (!validateForm()) return;

      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register-adult",
        formData
      );

      if (data.success) {
        toast.success("Adult Registered Successfully");
        setFormData({
          fullName: "",
          nic: "",
          dob: "",
          address: "",
          dietaryPreference: "",
          smokingStatus: "",
          drinkingStatus: "",
          homeType: "",
          preferredLanguage: "",
          chronicConditions: "",
          medications: "",
          doctorName: "",
          bloodGroup: "",
        });
        navigate("/"); // Redirect to home after successful registration
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(
        "Error Registering: ",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while registering the adult.");
    }
  };

  return (
    <PageContainer maxWidth="sm">
      <FormContainer elevation={3}>
        <FormTitle>Adult Registration Form</FormTitle>

        <form onSubmit={OnSubmitHandler}>
          <FormSection>
            <TextField
              id="fullName"
              label="Full Name"
              variant="outlined"
              name="fullName"
              fullWidth
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              margin="normal"
            />

            <TextField
              id="nic"
              label="NIC"
              variant="outlined"
              name="nic"
              fullWidth
              value={formData.nic}
              onChange={handleInputChange}
              error={!!errors.nic}
              helperText={errors.nic}
              margin="normal"
            />

            <TextField
              id="dob"
              label="Date of Birth"
              variant="outlined"
              name="dob"
              fullWidth
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              error={!!errors.dob}
              helperText={errors.dob}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              id="address"
              label="Address"
              variant="outlined"
              name="address"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Dietary Preference</InputLabel>
              <Select
                id="dietaryPreference"
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleInputChange}
                error={!!errors.dietaryPreference}
              >
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
                <MenuItem value="Dairy-Free">Dairy-Free</MenuItem>
              </Select>
              {errors.dietaryPreference && (
                <FormHelperText error>
                  {errors.dietaryPreference}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Smoking Status</InputLabel>
              <Select
                id="smokingStatus"
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleInputChange}
                error={!!errors.smokingStatus}
              >
                <MenuItem value="Non-smoker">Non-smoker</MenuItem>
                <MenuItem value="Smoker">Smoker</MenuItem>
                <MenuItem value="Occasional">Occasional</MenuItem>
              </Select>
              {errors.smokingStatus && (
                <FormHelperText error>
                  {errors.smokingStatus}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Drinking Status</InputLabel>
              <Select
                id="drinkingStatus"
                name="drinkingStatus"
                value={formData.drinkingStatus}
                onChange={handleInputChange}
                error={!!errors.drinkingStatus}
              >
                <MenuItem value="Non-drinker">Non-drinker</MenuItem>
                <MenuItem value="Drinker">Drinker</MenuItem>
                <MenuItem value="Occasional">Occasional</MenuItem>
              </Select>
              {errors.drinkingStatus && (
                <FormHelperText error>
                  {errors.drinkingStatus}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Home Type</InputLabel>
              <Select
                id="homeType"
                name="homeType"
                value={formData.homeType}
                onChange={handleInputChange}
                error={!!errors.homeType}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Assisted Living">Assisted Living</MenuItem>
              </Select>
              {errors.homeType && (
                <FormHelperText error>{errors.homeType}</FormHelperText>
              )}
            </FormControl>

            <TextField
              id="preferredLanguage"
              label="Preferred Language"
              variant="outlined"
              name="preferredLanguage"
              fullWidth
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              error={!!errors.preferredLanguage}
              helperText={errors.preferredLanguage}
              margin="normal"
            />

            <TextField
              id="chronicConditions"
              label="Chronic Conditions"
              variant="outlined"
              name="chronicConditions"
              fullWidth
              value={formData.chronicConditions}
              onChange={handleInputChange}
              error={!!errors.chronicConditions}
              helperText={errors.chronicConditions}
              margin="normal"
            />

            <TextField
              id="medications"
              label="Medications"
              variant="outlined"
              name="medications"
              fullWidth
              value={formData.medications}
              onChange={handleInputChange}
              error={!!errors.medications}
              helperText={errors.medications}
              margin="normal"
            />

            <TextField
              id="doctorName"
              label="Doctor Name"
              variant="outlined"
              name="doctorName"
              fullWidth
              value={formData.doctorName}
              onChange={handleInputChange}
              error={!!errors.doctorName}
              helperText={errors.doctorName}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Blood Group</InputLabel>
              <Select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                error={!!errors.bloodGroup}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
              {errors.bloodGroup && (
                <FormHelperText error>{errors.bloodGroup}</FormHelperText>
              )}
            </FormControl>
          </FormSection>

          <SubmitButton type="submit" variant="contained" fullWidth>
            Submit
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AdultRegistrationForm;