import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  medicalLicenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  licenseExpireDate: {
    type: Date,
    required: true,
  },
  nationalMedicalRegistrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  subspecialities: {
    type: [String],
    default: [],
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  languagesSpoken: {
    type: [String],
    default: [],
  },
  availableDate: {
    type: [String],
    required: true,
  },
  availableWorkingHours: {
    type: String,
    required: true,
    enum: [
      "08:00 - 12:00",
      "12:00 - 16:00",
      "16:00 - 20:00",
      "08:00 - 17:00",
      "Night Shift"
    ]
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  currentHospital: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default DoctorModel;
