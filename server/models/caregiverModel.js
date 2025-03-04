import mongoose from "mongoose";

const caregiverSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },

    trainingAndSkills: {
        type: [String],
        required: true,
        default: [],
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    languagesSpoken: {
        type: [String],
        default: [],
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    willingToWorkNightshifts: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    availableForWeekendWork: {
        type: String,
        enum: ['Yes', 'No'],
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

const caregiverModel = mongoose.models.Caregiver || mongoose.model('Caregiver', caregiverSchema);
export default caregiverModel;
