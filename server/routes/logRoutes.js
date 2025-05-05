import express from 'express';
import { createLog, getLogs, deleteLog } from '../controllers/logsController.js';

const logsRouter = express.Router();

// GET all logs
logsRouter.get('/get', getLogs);

// POST create a new log
logsRouter.post('/add', createLog);

// DELETE a log by ID
logsRouter.delete('/delete/:logId', deleteLog);

export default logsRouter;
