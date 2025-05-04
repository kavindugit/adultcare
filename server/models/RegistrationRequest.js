// models/registrationRequestModel.js
import mongoose from "mongoose";

const registrationRequestSchema = new mongoose.Schema({
  adultUserId: {
    type: String,
    required: true,
    ref: 'User',  // linked to User table
  },
  guardianUserId: {
    type: String,
    required: true,
    ref: 'User',  // linked to User table
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const RegistrationRequest = mongoose.models.RegistrationRequest || mongoose.model('RegistrationRequest', registrationRequestSchema);
export default RegistrationRequest;
