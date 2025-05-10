// routes/notificationRoutes.js

import express from 'express';
import { deleteAllNotifications, getallNotifications, getNotifications, sendNotification } from '../controllers/notificationController.js';



const notificationRouter = express.Router();

// POST /api/notifications/send-sms
notificationRouter.post('/send', sendNotification);
notificationRouter.get('/all',getallNotifications)
notificationRouter.get('/get',getNotifications);
notificationRouter.delete('/clear',deleteAllNotifications );

export default notificationRouter;
