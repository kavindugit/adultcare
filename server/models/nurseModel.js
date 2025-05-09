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
    enum: [
      "Day Shift (8:00 AM - 8:00 PM)",
      "Night Shift (8:00 PM - 8:00 AM)",
      "Full-Time (24-hour)",
      "Part-Time"
    ],
    required: true,
  },
  preferredWorkingDays: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
    validate: {
      validator: function(array) {
        return array && array.length > 0;
      },
      message: "At least one preferred working day is required"
    }
  },
  preferredTimeSlots: {
    type: [String],
    default: [],
    // Required only when part-time is selected - validation will be handled in controller
  },
  isPartTime: {
    type: Boolean,
    default: false
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