import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import chatRouter from './src/routes/chat.router.js';
import userRouter from './src/routes/user.router.js';
import taskRouter from './src/routes/task.router.js';
import eventRouter from './src/routes/event.router.js';

const app = express();
const port = process.env.PORT || 8000;
const whiteList = [
  'http://localhost:5173',
  'https://ai-personal-assistant.netlify.app',
];

app.use(bodyParser.json());
app.use(
  cors({
    origin: whiteList,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.get('/', (request, response) => {
  response.json({ message: 'ok' });
});

app.use('/chat', chatRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/event', eventRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
