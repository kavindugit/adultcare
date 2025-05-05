import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionDate: {
    type: Date,
    required: true,
  },
  sessionTime: {
    type: String,
    required: true,
  },
  sessionType: {
    type: String,
    required: true,
  },
  sessionPrice: {
    type: Number,
    required: true,
  },
  sessionDuration: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);
