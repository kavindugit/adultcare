import express from 'express';
import 'dotenv/config';

import { confirmReservation, getReservationsByUserId } from '../controllers/reservationController.js';


const reservationRouter = express.Router();

reservationRouter.post('/confirm/:id', confirmReservation);
reservationRouter.get('/:id', getReservationsByUserId);


export default reservationRouter;