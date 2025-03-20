import mongoose from "mongoose";

const authLogSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    event_type: {
        type: String,
        required: true,
        enum: ["Login", "Logout", "Login Attempt"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    ip_address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Success", "Failed"],
    },
    details: {
        type: String,
        default: "",
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed, // Can store additional metadata (e.g., user agent)
        default: {},
    },
});

const authLog = mongoose.models.AuthLog || mongoose.model("AuthLog", authLogSchema);
export default authLog;