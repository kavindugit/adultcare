import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  licenseExpiry: {
    type: Date,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  availabilityHours: {
    type: String,
    enum: ["08:00 - 17:00", "17:00 - 00:00", "00:00 - 08:00", "Rotational", "On Call"],
    required: true
  },
  monthlySalary: {
    type: Number,
    required: true
  },
  otRate: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const DriverModel = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
export default DriverModel;
