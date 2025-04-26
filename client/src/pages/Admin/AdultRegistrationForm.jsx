import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import { AppContent } from "../../context/AppContext";

const themeColors = {
  primary: "#1A73E8",
  secondary: "#0F4C81",
  background: "#E3F2FD",
  formBackground: "#FFFFFF",
  textPrimary: "#1A237E",
  textSecondary: "#546E7A",
  error: "#D32F2F",
  borderColor: "#BBDEFB",
};

const PageContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: themeColors.background,
  padding: theme.spacing(4),
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "800px",
  backgroundColor: themeColors.formBackground,
  border: `1px solid ${themeColors.borderColor}`,
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  color: themeColors.textPrimary,
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: themeColors.textPrimary,
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: themeColors.primary,
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(3),
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
    phoneNo: "",
    gender: "",
    address: "",
    dietaryPreference: "",
    smokingStatus: "",
    drinkingStatus: "",
    homeType: "",
    preferredLanguage: "",
    chronicConditions: "",
    medications: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "fullName",
      "nic",
      "dob",
      "phoneNo",
      "gender",
      "address",
      "dietaryPreference",
      "smokingStatus",
      "drinkingStatus",
      "homeType",
      "preferredLanguage",
      "chronicConditions",
      "medications",
      "bloodGroup",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  
  const {userData} = useContext(AppContent);
  const guardianId = userData?.userId ;

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const payload = {
        ...formData,
        guardId: guardianId, // Make sure it's 'guardId', not 'guardianId'
      };
  
      console.log("Submitting payload to backend:", payload);
  
      const { data } = await axios.post("http://localhost:4000/api/adult/register", payload);
  
      if (data.success) {  
        toast.success("Adult Registered Successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      const message = error.response?.data?.message || "An error occurred while registering the adult.";
      toast.error(message);
    }
  };
  
  return (
    <PageContainer maxWidth="md">
      <FormContainer elevation={3}>
        <FormTitle>Adult Registration Form</FormTitle>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: themeColors.textSecondary, mb: 4 }}
        >
          Please fill out the form to register an adult for Elder Bliss care services.
        </Typography>

        <form onSubmit={OnSubmitHandler}>
          <SectionHeader>Basic Information</SectionHeader>
          <FormSection>
            <TextField label="Full Name" name="fullName" fullWidth value={formData.fullName} onChange={handleInputChange} error={!!errors.fullName} helperText={errors.fullName} />
            <TextField label="NIC" name="nic" fullWidth value={formData.nic} onChange={handleInputChange} error={!!errors.nic} helperText={errors.nic} />
            <TextField label="Date of Birth" name="dob" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleInputChange} error={!!errors.dob} helperText={errors.dob} />
            <TextField label="Phone Number" name="phoneNo" fullWidth value={formData.phoneNo} onChange={handleInputChange} error={!!errors.phoneNo} helperText={errors.phoneNo} />
            <FormControl component="fieldset" error={!!errors.gender}>
              <Typography variant="body1" sx={{ mt: 1 }}>Gender</Typography>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
            </FormControl>
            <TextField label="Address" name="address" fullWidth multiline rows={2} value={formData.address} onChange={handleInputChange} error={!!errors.address} helperText={errors.address} />
          </FormSection>

          <SectionHeader>Health & Lifestyle Information</SectionHeader>
          <FormSection>
            <FormControl fullWidth error={!!errors.dietaryPreference}>
              <InputLabel>Dietary Preference</InputLabel>
              <Select name="dietaryPreference" value={formData.dietaryPreference} onChange={handleInputChange}>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
              </Select>
              <FormHelperText>{errors.dietaryPreference}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.smokingStatus}>
              <InputLabel>Smoking Status</InputLabel>
              <Select name="smokingStatus" value={formData.smokingStatus} onChange={handleInputChange}>
                <MenuItem value="Non-smoker">Non-smoker</MenuItem>
                <MenuItem value="Smoker">Smoker</MenuItem>
                <MenuItem value="Occasional">Occasional</MenuItem>
              </Select>
              <FormHelperText>{errors.smokingStatus}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.drinkingStatus}>
              <InputLabel>Drinking Status</InputLabel>
              <Select name="drinkingStatus" value={formData.drinkingStatus} onChange={handleInputChange}>
                <MenuItem value="Non-drinker">Non-drinker</MenuItem>
                <MenuItem value="Drinker">Drinker</MenuItem>
                <MenuItem value="Occasional">Occasional</MenuItem>
              </Select>
              <FormHelperText>{errors.drinkingStatus}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.homeType}>
              <InputLabel>Home Type</InputLabel>
              <Select name="homeType" value={formData.homeType} onChange={handleInputChange}>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Assisted Living">Assisted Living</MenuItem>
              </Select>
              <FormHelperText>{errors.homeType}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.preferredLanguage}>
              <InputLabel>Preferred Language</InputLabel>
              <Select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Sinhala">Sinhala</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
              </Select>
              <FormHelperText>{errors.preferredLanguage}</FormHelperText>
            </FormControl>

            <TextField label="Chronic Conditions" name="chronicConditions" fullWidth value={formData.chronicConditions} onChange={handleInputChange} error={!!errors.chronicConditions} helperText={errors.chronicConditions} />
            <TextField label="Medications" name="medications" fullWidth value={formData.medications} onChange={handleInputChange} error={!!errors.medications} helperText={errors.medications} />

            <FormControl fullWidth error={!!errors.bloodGroup}>
              <InputLabel>Blood Group</InputLabel>
              <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
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