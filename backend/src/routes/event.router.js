import { Router } from 'express';
import {
  completeEventById,
  createEvent,
  deleteEventById,
  getEventById,
  getEventsByUserId,
  updateEventLabelById,
} from '../controllers/event.controller.js';

const eventRouter = Router();
eventRouter.post('/createEvent', createEvent);
eventRouter.get('/getEventsByUserId/:user_id', getEventsByUserId);
eventRouter.get('/getEventById/:event_id', getEventById);
eventRouter.put('/updateEventLabelById/:event_id', updateEventLabelById);
eventRouter.put('/completeEventById/:event_id', completeEventById);
eventRouter.delete('/deleteEventById/:event_id', deleteEventById);

export default eventRouter;
