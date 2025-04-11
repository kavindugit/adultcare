import mongoose from "mongoose";

const adultSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        default: '',
    },
    dob: {
        type: Date,
        required: true,
    },
   
    address: {
        type: String,
        default: '',
    },
    dietaryPreference: {
        type: String,
        default: '',
    },
    smokingStatus: {
        type: String,
        default: '',
    },
    drinkingStatus: {
        type: String,
        default: '',
    },
    homeType: {
        type: String,
        default: '',
    },
    preferredLanguage: {
        type: String,
        default: '',
    },
    chronicConditions: {
        type: [String],
        default: [],
    },
    medications: {
        type: [String],
        default: [],
    },
    doctorName: {
        type: String,
        default: '',
    },
    bloodGroup: {
        type: String,
        default: '',
    },
    age: {
        type:Number,
        default:0,
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

const adultModel = mongoose.models.adult || mongoose.model('Adult', adultSchema);
export default adultModel;
