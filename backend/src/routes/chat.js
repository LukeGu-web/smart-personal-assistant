import { Router } from 'express';
import { chatWithAI } from '../controllers/chat/chat.js';

const router = Router();

router.post('/', chatWithAI);

export default router;
