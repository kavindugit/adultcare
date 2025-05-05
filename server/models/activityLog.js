import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    logId :{
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    event_type: {
        type: String,
        required: true,
        enum: ["Role Change", "Password Reset", "Profile Update", "Permission Update", "Other"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model (if the action was performed by an admin)
        default: null,
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
    old_data: {
        type: mongoose.Schema.Types.Mixed, // Can store any type of data (e.g., old role, old email)
        default: null,
    },
    updated_data: {
        type: mongoose.Schema.Types.Mixed, // Can store any type of data (e.g., new role, new email)
        default: null,
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed, // Can store additional metadata (e.g., user agent)
        default: {},
    },
});

const activityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
export default activityLog;