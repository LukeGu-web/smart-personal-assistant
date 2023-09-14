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

// get user's tasks e5f45 49a59
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
      if (tasks.rows.length > 0) {
        response.status(200).json({
          success: true,
          message: 'Found the user tasks',
          tasks: tasks.rows,
        });
      } else {
        response.status(200).json({
          success: true,
          message: 'The user have not created any task',
        });
      }
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

// get a task by id
export const getTaskById = async (request, response) => {
  const id = request.params.task_id;
  const client = await pool.connect();
  try {
    const task = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
    console.log('getTaskbyId', task.rows[0]);
    if (task.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Found the task',
        task: task.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the task',
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

// edit a task by id
export const updateTaskLabelById = async (request, response) => {
  const id = request.params.task_id;
  const { label } = request.body;
  const client = await pool.connect();
  try {
    const task = await client.query(
      'UPDATE tasks SET label = $1 WHERE id = $2',
      [label, id]
    );
    console.log('updateTaskLabelById', task.rows[0]);
    if (task.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Task label updated successfully',
        task: task.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the task',
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

// complete a task by id
export const completeTaskById = async (request, response) => {
  const id = request.params.task_id;
  const { isCompleted } = request.body;
  const client = await pool.connect();
  try {
    const task = await client.query(
      'UPDATE tasks SET is_completed = $1 WHERE id = $2',
      [isCompleted, id]
    );
    console.log('completeTaskById', id);
    if (task.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: isCompleted
          ? 'Task has been completed!'
          : 'Task is incompleted.',
        task: task.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the task',
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

// delete a task by id
export const deleteTaskById = async (request, response) => {
  const id = request.params.task_id;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    console.log('Delete a task', id);
    if (result.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Delete a task successfully',
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the task',
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
