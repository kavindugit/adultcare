import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    licenseExpireDate: {
        type: Date,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    languagesSpoken: {
        type: [String],
        default: [],
    },
    workingHours: {
        type: String,
        required: true,
    },
    willingToWorkNightshifts: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    basicSalary: {
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

const nurseModel = mongoose.models.Nurse || mongoose.model('Nurse', nurseSchema);
export default nurseModel;
