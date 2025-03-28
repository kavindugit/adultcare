import express from 'express';
import { getAdultData} from '../controllers/healthReportController.js';
const healthReportRouter = express.Router();

healthReportRouter.get('/adultInfo', getAdultData);

export default healthReportRouter;





