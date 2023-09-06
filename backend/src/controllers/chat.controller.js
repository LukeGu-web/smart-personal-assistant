import { openai } from '../config/openai-config.js';
import { pool } from '../services/db.js';
import { nanoid } from '../utils/index.js';

export const chatWithAI = async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a EbereGPT. You can help with graphic design tasks',
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
};

// save a chat history
export const saveUserChat = async (request, response) => {
  const { user_id, messages } = request.body;
  const jsonMessages = JSON.stringify(messages);
  const client = await pool.connect();
  // find user_id in chats
  const user = await client.query('SELECT * FROM chats WHERE user_id = $1', [
    user_id,
  ]);
  console.log('getUser', user.rows[0]);
  if (!user.rows[0]) {
    // create a new chat
    //    id, user_id, timestamp(created time), json of messages
    const id = nanoid(5);
    const timestamp = new Date();
    const chat = await client.query(
      'INSERT INTO chats (id, user_id, timestamp, messages) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, user_id, timestamp, jsonMessages]
    );
    response.status(201).json({
      success: true,
      message: 'Saved user chat',
      chat: chat.rows[0],
    });
  } else {
    // update the existing chat
    await client.query('UPDATE chats SET messages = $1 WHERE id = $2', [
      jsonMessages,
      user.id,
    ]);
    response.status(200).json({
      success: true,
      message: 'Saved user chat history',
    });
  }
};

// get chat history
