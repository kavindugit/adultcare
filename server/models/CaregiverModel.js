import mongoose from "mongoose";

const caregiverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  preferredWorkHours: {
    type: String,
    enum: ["08:00 - 17:00", "17:00 - 00:00", "00:00 - 08:00", "Live-in", "Rotational"],
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  languagesSpoken: {
    type: String,
    required: true,
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

const CaregiverModel = mongoose.models.Caregiver || mongoose.model("Caregiver", caregiverSchema);
export default CaregiverModel;
