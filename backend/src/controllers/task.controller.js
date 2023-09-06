import { pool } from '../services/db.js';
import { nanoid } from '../utils/index.js';

// create a task
export const createTask = async (request, response) => {
  const { user_id, label, is_completed, completed_date } = request.body;
  const client = await pool.connect();
  try {
    const user = await client.query('SELECT * FROM users WHERE id = $1', [
      user_id,
    ]);
    console.log('getUser', user.rows[0].id);
    if (!user.rows[0]) {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
      });
    } else {
      const id = nanoid(5);
      const result = await client.query(
        'INSERT INTO tasks (id, user_id, label, is_completed, completed_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, user_id, label, is_completed, completed_date]
      );
      console.log('Createtask', result.rows[0]);
      response.status(201).json({
        success: true,
        message: 'Added a new task',
        newUser: result.rows[0],
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
};

// get user's tasks
export const getTasksByUserId = async (request, response) => {
  const id = request.params.user_id;
  const client = await pool.connect();
  try {
    const user = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    console.log('getUser', user.rows[0].id);
    if (!user.rows[0]) {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
      });
    } else {
      const tasks = await client.query(
        'SELECT * FROM tasks WHERE user_id = $1',
        [id]
      );
      console.log('getUserTasks', tasks.rows);
      response.status(200).json({
        success: true,
        message: 'Found the user tasks',
        tasks: tasks.rows,
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
};

// edit a task

// complete a task
// delete a task
