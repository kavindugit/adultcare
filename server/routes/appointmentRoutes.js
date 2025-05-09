// server/routes/appointmentRoutes.js
import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

const appoinmentRouter= express.Router();

appoinmentRouter.post("/confirm/:id", createAppointment);

export default appoinmentRouter;
