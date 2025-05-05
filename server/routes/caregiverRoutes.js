import express from 'express';
import { getCaregiverData } from '../controllers/caregiverController.js';



const caregiverRouter = express.Router();

caregiverRouter.get('/getdata/:caregiverId', getCaregiverData);


export default caregiverRouter;
