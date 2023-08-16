import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import chatRoutes from './src/routes/chat.js';

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  response.json({ message: 'ok' });
});

app.use('/chat', chatRoutes);

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
