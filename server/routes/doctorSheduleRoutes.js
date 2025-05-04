import express from "express";
import { assignDoctorSession, getDoctorAvailability } from "../controllers/DoctorSheduleController.js";


const docSheduleRouter = express.Router();

docSheduleRouter.get("/fulltime/availability/:doctorId", getDoctorAvailability);
docSheduleRouter.post("/fulltime/assign", assignDoctorSession);

export default docSheduleRouter;
