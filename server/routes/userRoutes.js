import express from 'express';
import { get } from 'mongoose';
import userAuth from '../middleware/userAuth.js';
import { deleteUser, getAllEmployeeData, getAllUsersData, getUserData, updateUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/data', userAuth , getUserData);
userRouter.get('/all', getAllUsersData);
userRouter.put('/update', updateUser);
userRouter.delete('/delete', deleteUser);
userRouter.get('/allemployees', getAllEmployeeData)

export default userRouter;