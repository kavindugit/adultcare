// models/CaregiverSchedule.js
import mongoose from "mongoose";

const caregiverScheduleSchema = new mongoose.Schema({
  caregiverId: {
    type: String,
    ref: "Caregiver",
    required: true,
  },
  adultId: {
    type: String,
    ref: "Adult",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String, // Example: "8:00 AM - 10:00 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Booked", "Completed", "Cancelled"],
    default: "Available",
  },
  bookedBy: {
    type: String,
    ref: "User",
    default: null, // Null means slot is available
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

const CaregiverSchedule = mongoose.model("CaregiverSchedule", caregiverScheduleSchema);
export default CaregiverSchedule;
