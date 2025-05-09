import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import stockRoute from './routes/stockRoute.js'; 
import supplierRoute from './routes/supplierRoute.js'; 
import restokeRoute from './routes/restokeRoute.js'; 
import logsRouter from './routes/logRoutes.js'; // Add this line to include logsRouter in the app
import notificationRouter from './routes/notificationRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import adultRouter from './routes/adultRoutes.js';
import botRouter from './routes/chatbotRoutes.js';
import guardianRouter from './routes/guardianRoutes.js';
import registrationRequestRouter from './routes/registrationRequesrRotes.js';
import docSheduleRouter from './routes/doctorSheduleRoutes.js';

import nurseRouter from './routes/nurseRoutes.js';
import caregiverRouter from './routes/caregiverRoutes.js';

import sessionRouter from './routes/sessionRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import parcelRouter from './routes/packagesRoute.js';
import shedulerouter from './routes/sheduleRoutes.js';
import packageRequestRouter from './routes/packageRequestRouter.js';
import healthReportRouter from './routes/healthReports.js';


const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser()); 

app.use(cors({ origin: allowedOrigins, credentials: true }));



// API endpoints

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/stock', stockRoute); // Add this line to include logsRouter in the app
app.use('/api/supplier', supplierRoute); // Add this line to include logsRouter in the app
app.use('/api/restoke', restokeRoute);




// app.get('/', (req, res) => res.send('Api Working fine');
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/logs', logsRouter); // Add this line to include logsRouter in the app
app.use('/api/notifications', notificationRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/adult', adultRouter);
app.use('/api/chatbot', botRouter);
app.use('/api/guardian', guardianRouter);
app.use('/api/registration-request' , registrationRequestRouter);

app.use('/api/shedule', docSheduleRouter);
app.use('/api/nurse', nurseRouter);
app.use('/api/caregiver', caregiverRouter)

app.use('/api/schedule', docSheduleRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/packages', parcelRouter); // Add this line to include parcelRouter in the app')
app.use('/api/schedule', shedulerouter);
app.use('/api/package-requests', packageRequestRouter);
app.use('/api/healthreport', healthReportRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

