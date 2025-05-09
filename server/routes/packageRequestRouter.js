import express from 'express';

import { assignEmployeesToPackage, createPackageRequest, deletePackageRequest, getPackageRequestById, getPendingPackageRequests } from '../controllers/packageRequestController.js';



const packageRequestRouter = express.Router();

packageRequestRouter.post('/', createPackageRequest);
packageRequestRouter.get("/pending", getPendingPackageRequests);
packageRequestRouter.get("/:requestId" , getPackageRequestById);
packageRequestRouter.put("/assign/:requestId", assignEmployeesToPackage);
packageRequestRouter.delete("/:requestId", deletePackageRequest);

export default packageRequestRouter;