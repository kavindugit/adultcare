// models/NurseSchedule.js
import mongoose from "mongoose";

const nurseScheduleSchema = new mongoose.Schema({
  nurseId: {
    type: String,
    ref: "Nurse",
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

const NurseSchedule = mongoose.model("NurseSchedule", nurseScheduleSchema);
export default NurseSchedule;
