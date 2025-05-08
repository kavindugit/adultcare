import exporess from 'express';
import { createSchedule, deleteSchedule, getSchedule, updateSchedule } from '../controllers/scheduleController.js';


const shedulerouter = exporess.Router();

shedulerouter.post('/create', createSchedule);
shedulerouter.get('/:employeeType/:employeeId', getSchedule);
shedulerouter.put('/update',updateSchedule);
shedulerouter.delete('/delete', deleteSchedule);

export default shedulerouter;