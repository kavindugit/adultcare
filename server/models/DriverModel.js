import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  licenseExpiry: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  availabilityHours: {
    type: String,
    enum: [
      "06:00 - 14:00",
      "08:00 - 17:00",
      "14:00 - 22:00",
      "Night Shift",
      "Flexible"
    ],
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  otRate: {
    type: Number,
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

const DriverModel = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
export default DriverModel;
