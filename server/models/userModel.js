import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    
    nic:{
        type: String,
        default: '',
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo:{
        type: String,
        default: '',
    },
    address:{
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Guardian',
    },
    verifyOtp: {
        type: String,
        default: '',
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: '',
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;
