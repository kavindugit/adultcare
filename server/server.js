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



const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({ origin: allowedOrigins, credentials: true }));



// API endpoints
app.get('/', (req, res) => res.send('API Working fine'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/stock', stockRoute); // Add this line to include logsRouter in the app
app.use('/api/supplier', supplierRoute); // Add this line to include logsRouter in the app
app.use('/api/restoke', restokeRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});