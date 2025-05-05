
import authLog from "../models/authLog.js";

export const createLog = async (req, res) => {
    const { event_type, user_id, ip_address, status, details, metadata } = req.body;

    // Validate required fields
    if (!event_type || !user_id || !ip_address || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Create a new auth log
        const log = await authLog.create({
            event_type,
            user_id,
            ip_address,
            status,
            details: details || "", // Optional field
            metadata: metadata || {}, // Optional field
        });

        await log.save();

        return res.status(201).json({ success: true, message: "Auth log created successfully", log });
    } catch (error) {
        console.error("Error creating auth log:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getLogs = async (req, res) => {
    try {
        // Fetch all logs from the database, sorted by timestamp (latest first)
        const logs = await authLog.find().sort({ timestamp: -1 });

        // Return the logs
        return res.status(200).json({ success: true, logs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteLog = async (req, res) => {
    const { logId } = req.params; // Log ID to delete

    try {
        // Find and delete the log
        const log = await authLog.findByIdAndDelete(logId);
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        // Return success response
        return res.status(200).json({ success: true, message: "Log deleted successfully" });
    } catch (error) {
        console.error("Error deleting log:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};