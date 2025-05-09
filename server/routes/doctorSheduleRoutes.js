import express from "express";
import { assignDoctorSession, getAllDoctors, getDoctorAvailability } from "../controllers/DoctorSheduleController.js";


const docSheduleRouter = express.Router();

docSheduleRouter.get("/fulltime/availability", getDoctorAvailability);
docSheduleRouter.post("/fulltime/assign", assignDoctorSession);
docSheduleRouter.get("/allDoctors", getAllDoctors);

export default docSheduleRouter;
