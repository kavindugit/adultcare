import express from 'express';
import { registerAdult } from '../controllers/adultController.js';

const adultRouter = express.Router();

adultRouter.post('/register', registerAdult);

export default adultRouter;