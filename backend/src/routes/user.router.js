import { Router } from 'express';
// import { pool, query } from './db.js';
import {
  createUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  login,
} from '../controllers/user.controller.js';

const userRouter = Router();
userRouter.post('/signup', createUser);
userRouter.post('/login', login);
userRouter.get('/getUserByEmail/:email', getUserByEmail);
userRouter.put('/updateUserByEmail/:email', updateUserByEmail);
userRouter.delete('/deleteUserByEmail/:email', deleteUserByEmail);

export default userRouter;
