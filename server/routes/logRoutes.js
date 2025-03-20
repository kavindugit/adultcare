import express from 'express';
import { createLog, deleteLog, getLogs } from '../controllers/logsController';


const logsRouter = express.Router();

logsRouter.get('/get', getLogs);
logsRouter.post('/add', createLog);
logsRouter.delete('/delete', deleteLog);

export default logsRouter;