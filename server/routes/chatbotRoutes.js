import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";

const botRouter = express.Router();
botRouter.post("/chat", chatWithBot);

export default botRouter;
