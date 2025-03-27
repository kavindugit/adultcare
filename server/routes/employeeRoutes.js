import express from 'express';
import { registerDoctor } from '../controllers/employeeController.js';


const employeeRouter = express.Router();

employeeRouter.post('/register-doctor', registerDoctor);


export default employeeRouter;