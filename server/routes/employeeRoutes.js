import express from 'express';
import { getAllSpecializations, getDoctorProfile, getDoctorsBySpecialization, getEmployeeDetails, registerCaregiver, registerDoctor, registerDriver, registerNurse } from '../controllers/employeeController.js';

const employeeRouter = express.Router();

employeeRouter.post('/register-doctor', registerDoctor);
employeeRouter.post('/register-nurse', registerNurse);
employeeRouter.post('/register-driver', registerDriver);
employeeRouter.post('/register-caregiver', registerCaregiver);
employeeRouter.get("/doctors/specializations", getAllSpecializations);
employeeRouter.get("/doctors/specialization/:specialization", getDoctorsBySpecialization);

employeeRouter.get('/:employeeType/:employeeId', getEmployeeDetails);
employeeRouter.get('/doctorProfile/:userId' , getDoctorProfile);

export default employeeRouter;