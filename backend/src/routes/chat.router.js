import { Router } from 'express';
import { chatWithAI } from '../controllers/chat.controller.js';

const chatRouter = Router();

chatRouter.post('/', chatWithAI);

export default chatRouter;
