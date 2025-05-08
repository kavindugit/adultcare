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
    required: false, // Making this optional since we now have more specific scheduling options
  },
  // New fields for enhanced scheduling
  preferredWorkingDays: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
    default: [],
  },
  preferredShift: {
    type: String,
    enum: [
      "Day Shift (8:00 AM - 8:00 PM)",
      "Night Shift (8:00 PM - 8:00 AM)",
      "Full-Time (24-hour availability)",
      "Part-Time (Custom time slots)"
    ],
    required: true,
  },
  isPartTime: {
    type: Boolean,
    default: false,
    // This explicit field makes it easier to query for part-time caregivers
  },
  preferredTimeSlots: {
    type: [String],
    enum: [
      "8:00 AM - 10:00 AM",
      "10:00 AM - 12:00 PM",
      "12:00 PM - 2:00 PM",
      "2:00 PM - 4:00 PM",
      "4:00 PM - 6:00 PM",
      "6:00 PM - 8:00 PM",
      "8:00 PM - 10:00 PM",
      "10:00 PM - 12:00 AM",
      "12:00 AM - 2:00 AM",
      "2:00 AM - 4:00 AM",
      "4:00 AM - 6:00 AM",
      "6:00 AM - 8:00 AM"
    ],
    default: [],
    // Required only for part-time (validation handled in controller)
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