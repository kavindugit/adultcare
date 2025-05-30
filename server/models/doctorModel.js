import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  medicalLicenseNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  licenseExpireDate: { 
    type: Date, 
    required: true 
  },
  nationalMedicalRegistrationNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  specialization: { 
    type: String, 
    required: true 
  },
  subspecialities: { 
    type: String,  // Changed to String for comma-separated values
    default: "" 
  },
  yearsOfExperience: { 
    type: Number, 
    required: true 
  },
  languagesSpoken: { 
    type: String,  // Changed to String for comma-separated values
    default: "" 
  },
  availableDate: { 
    type: [String], 
    required: true 
  },
  availableWorkingHours: {  // Changed from availableTimeSlots to match frontend
    type: [String], 
    required: true 
  },
  consultationFee: { 
    type: Number, 
    required: true 
  },
  currentHospital: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default DoctorModel;
