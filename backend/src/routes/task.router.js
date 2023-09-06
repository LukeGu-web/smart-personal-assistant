import { Router } from 'express';
import {
  createTask,
  getTasksByUserId,
} from '../controllers/task.controller.js';

const taskRouter = Router();
taskRouter.post('/createTask', createTask);
taskRouter.get('/getTasksByUserId/:user_id', getTasksByUserId);
// taskRouter.post('/login', login);
// taskRouter.get('/getUserById/:id', getUserById);

// taskRouter.put('/updateUserById/:id', updateUserById);
// taskRouter.delete('/deleteUserById/:id', deleteUserById);

export default taskRouter;
