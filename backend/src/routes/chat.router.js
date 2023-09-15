import { Router } from 'express';
import {
  chatWithAI,
  saveUserChat,
  getChatByUserId,
  deleteChatByUserId,
} from '../controllers/chat.controller.js';

const chatRouter = Router();

chatRouter.post('/ai', chatWithAI);
chatRouter.post('/saveUserChat', saveUserChat);
chatRouter.get('/getChatByUserId/:user_id', getChatByUserId);
chatRouter.delete('/deleteChatByUserId/:user_id', deleteChatByUserId);

export default chatRouter;
