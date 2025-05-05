import express from 'express';
import { getNurseByUserId } from '../controllers/nurseController.js';


const nurseRouter = express.Router();

nurseRouter.get('/getdata/:userId', getNurseByUserId);


export default nurseRouter;
