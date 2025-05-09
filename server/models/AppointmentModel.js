import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  sessionType: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "completed", "cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
