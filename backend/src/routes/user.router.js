import { Router } from 'express';
import {
  login,
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  resetPasswordByemail,
  updatePasswordByEmail,
} from '../controllers/user.controller.js';

const userRouter = Router();
userRouter.post('/signup', createUser);
userRouter.post('/login', login);
userRouter.get('/getUserById/:id', getUserById);
userRouter.get('/getUserByEmail/:email', getUserByEmail);
userRouter.put('/updateUserById/:id', updateUserById);
userRouter.delete('/deleteUserById/:id', deleteUserById);
userRouter.post('/resetPasswordByemail', resetPasswordByemail);
userRouter.post('/updatePasswordByEmail', updatePasswordByEmail);

export default userRouter;
