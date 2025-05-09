import express from 'express';
import { getEmployeeDetails, registerCaregiver, registerDoctor, registerDriver, registerNurse } from '../controllers/employeeController.js';

const employeeRouter = express.Router();

employeeRouter.post('/register-doctor', registerDoctor);
employeeRouter.post('/register-nurse', registerNurse);
employeeRouter.post('/register-driver', registerDriver);
employeeRouter.post('/register-caregiver', registerCaregiver);
// Updated route to capture both employeeType and employeeId
employeeRouter.get('/:employeeType/:employeeId', getEmployeeDetails);

export default employeeRouter;