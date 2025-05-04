import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  availableShifts: {
    type: String,
    enum: ["Morning", "Evening", "Night", "Rotational"],
    required: true,
  },
  certifications: {
    type: [String],
    default: [],
  },
  salary: {
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

const NurseModel = mongoose.models.Nurse || mongoose.model("Nurse", nurseSchema);
export default NurseModel;
