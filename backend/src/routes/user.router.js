import { Router } from 'express';
// import { pool, query } from './db.js';
import {
  login,
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js';

const userRouter = Router();
userRouter.post('/signup', createUser);
userRouter.post('/login', login);
userRouter.get('/getUserById/:id', getUserById);
userRouter.get('/getUserByEmail/:email', getUserByEmail);
userRouter.put('/updateUserById/:id', updateUserById);
userRouter.delete('/deleteUserById/:id', deleteUserById);

export default userRouter;
