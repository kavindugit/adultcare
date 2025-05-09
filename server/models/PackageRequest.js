import mongoose from "mongoose";

const PackageRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  guardianId: {
    type: String,
    required: true,
  },
  adultId: {
    type: String,
    required: true,
  },
  packageId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "scheduled"],
    default: "pending",
  },
  startDate: {
    type: Date,
    default: null,
  },
  assignedEmployees: {
    type: [
      {
        employeeType: { type: String, required: true }, // Doctor, Nurse, Caregiver
        employeeId: { type: String, required: true },
        scheduleId: { type: String, required: true }, // Associated schedule ID
      },
    ],
    default: [],
  },
}, { timestamps: true });

const PackageRequest = mongoose.model("PackageRequest", PackageRequestSchema);

export default PackageRequest;
