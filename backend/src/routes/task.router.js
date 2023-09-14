import { Router } from 'express';
import {
  completeTaskById,
  createTask,
  deleteTaskById,
  getTaskById,
  getTasksByUserId,
  updateTaskLabelById,
} from '../controllers/task.controller.js';

const taskRouter = Router();
taskRouter.post('/createTask', createTask);
taskRouter.get('/getTasksByUserId/:user_id', getTasksByUserId);
taskRouter.get('/getTaskById/:task_id', getTaskById);
taskRouter.put('/updateTaskLabelById/:task_id', updateTaskLabelById);
taskRouter.put('/completeTaskById/:task_id', completeTaskById);
taskRouter.delete('/deleteTaskById/:task_id', deleteTaskById);

export default taskRouter;
