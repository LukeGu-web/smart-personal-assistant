import { Router } from 'express';
import { chatWithAI, saveUserChat } from '../controllers/chat.controller.js';

const chatRouter = Router();

chatRouter.post('/', chatWithAI);
chatRouter.post('/saveUserChat', saveUserChat);

export default chatRouter;
