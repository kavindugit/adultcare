import mongoose from "mongoose";

const adultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    
  },
  dietaryPreference: {
    type: String,
    default: "",
  },
  smokingStatus: {
    type: String,
    enum: ["Smoker", "Non-smoker", "Occasional", ""],
    default: "",
  },
  drinkingStatus: {
    type: String,
    enum: ["Drinker", "Non-drinker", "Occasional", ""],
    default: "",
  },
  homeType: {
    type: String,
    default: "",
  },
  preferredLanguage: {
    type: String,
    enum: ["English", "Sinhala", "Tamil", ""],
    default: "",
  },
  chronicConditions: {
    type: String, // stored as a comma-separated string from the form
    default: "",
  },
  medications: {
    type: String, // stored as a comma-separated string from the form
    default: "",
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", ""],
    default: "",
  },
  guardianId: {
    type: String,
    required: true,
  
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

const adultModel = mongoose.models.Adult || mongoose.model("Adult", adultSchema);
export default adultModel;
