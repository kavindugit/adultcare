import mongoose from "mongoose";

const fullTimeScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    ref: 'Doctor',
    required: true,
  },
  adultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String, // E.g., '08:00–10:00'
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Admin or staff
  },
  packageId: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const FullTimeScheduleModel = mongoose.model("FullTimeSchedule", fullTimeScheduleSchema);
export default FullTimeScheduleModel;
