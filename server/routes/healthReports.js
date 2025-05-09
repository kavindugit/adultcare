import express from 'express';
import { getAdultData, updateNote, getAllAdultsData, getNotes, deleteNote} from '../controllers/healthReportController.js';
const healthReportRouter = express.Router();

healthReportRouter.get('/adultInfo', getAdultData);
healthReportRouter.post('/updateNote', updateNote);
healthReportRouter.get('/adults', getAllAdultsData);
healthReportRouter.get('/notes', getNotes);
healthReportRouter.delete('/deleteNote', deleteNote);


export default healthReportRouter;





