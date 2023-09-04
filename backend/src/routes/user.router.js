import { Router } from 'express';
// import { pool, query } from './db.js';
import { createUser } from '../controllers/user.controller.js';

const userRouter = Router();
userRouter.post('/signup', createUser);

export default userRouter;
