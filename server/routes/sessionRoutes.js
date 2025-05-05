import express from "express";
import {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const sessionRouter = express.Router();

sessionRouter.post("/", createSession);
sessionRouter.get("/", getAllSessions);
sessionRouter.put("/:id", updateSession);
sessionRouter.delete("/:id", deleteSession);

export default sessionRouter;