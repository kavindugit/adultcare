import Session from "../models/sessionModel.js";

// Create session
export const createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create session", error });
  }
};

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ sessionDate: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions", error });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to update session", error });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete session", error });
  }
};