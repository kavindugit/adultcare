import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getGuardianByAdult } from '../controllers/guardianController.js';

const guardianRouter = express.Router();

// ✅ Correct API: Get Guardian of a specific Adult
guardianRouter.get('/guardian-by-adult/:adultUserId', getGuardianByAdult);

export default guardianRouter;
