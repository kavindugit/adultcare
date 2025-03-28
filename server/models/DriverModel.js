import mongoose from "mongoose";

const adultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        ref: 'User',
    },
    dietaryPreference: {
        type: String,
        default: '',
    },
    smokingStatus: {
        type: String,
        enum: ['Smoker', 'Non-smoker', 'Former smoker', ''],
        default: '',
    },
    drinkingStatus: {
        type: String,
        enum: ['Drinker', 'Non-drinker', 'Occasional', ''],
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
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
        default: '',
    },
    guardianId: {
        type: String,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

const adultModel = mongoose.models.Adult || mongoose.model('Adult', adultSchema);
export default adultModel;
