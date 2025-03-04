import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    medicalLicenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    licenseExpireDate: {
        type: Date,
        required: true,
    },
    nationalMedicalRegistrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    subspecialities: {
        type: [String],
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
    availableDate: {
        type: Date,
        required: true,
    },
    availableWorkingHours: {
        type: String,
        required: true,
    },
    consultationFee: {
        type: Number,
        required: true,
    },
    currentHospital: {
        type: String,
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

const doctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default doctorModel;
