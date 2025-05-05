// routes/notificationRoutes.js

import express from 'express';
import { approveRegistrationRequest, getPendingRegistrationRequests, rejectRegistrationRequest } from '../controllers/registrationRequestController.js';




const registrationRequestRouter = express.Router();

// POST /api/notifications/send-sms
registrationRequestRouter.get('/request/:guardianId', getPendingRegistrationRequests);
registrationRequestRouter.get('/approve/:requestId', approveRegistrationRequest);
registrationRequestRouter.get('/reject/:requestId', rejectRegistrationRequest); 



export default registrationRequestRouter;
