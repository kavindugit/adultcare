import express from 'express';
import { getAdultProfile, getLinkedAdultsByGuardian, registerAdult } from '../controllers/adultController.js';
import userAuth from '../middleware/userAuth.js';

const adultRouter = express.Router();

adultRouter.post('/register', registerAdult);
adultRouter.get('/adult-by-guardian/:guardianId', getLinkedAdultsByGuardian);
adultRouter.get('/adultProfile/:userId',getAdultProfile);


export default adultRouter;