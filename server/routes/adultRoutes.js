import express from 'express';
import { getAdultProfile, getLinkedAdultsByGuardian, registerAdult,getAdults, } from '../controllers/adultController.js';



const adultRouter = express.Router();

adultRouter.post('/register', registerAdult);
adultRouter.get('/adult-by-guardian/:guardianId', getLinkedAdultsByGuardian);
adultRouter.get('/adultProfile/:userId',getAdultProfile);

adultRouter.get('/users',getAdults);

export default adultRouter;