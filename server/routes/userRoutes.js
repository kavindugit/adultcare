import express from 'express';

import userAuth from '../middleware/userAuth.js';

import { deleteUser, getAllEmployeeData, getAllUsersData, getUserById, getUserData, getUsersByRole, updateUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/data', userAuth , getUserData);
userRouter.get('/all', getAllUsersData);
userRouter.put('/update', updateUser);
userRouter.delete('/delete', deleteUser);
userRouter.get('/allemployees', getAllEmployeeData)
userRouter.get('/by-role', getUsersByRole);

userRouter.get('/:id', getUserById);

userRouter.get('/:userId', getUserByUserId);


export default userRouter;