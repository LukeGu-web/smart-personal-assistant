import { pool } from '../services/db.js';
import { nanoid } from '../utils/index.js';

// create a event
export const createEvent = async (request, response) => {
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
        'INSERT INTO events (id, user_id, label, is_completed, completed_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, user_id, label, is_completed, completed_date]
      );
      console.log('Createevent', result.rows[0]);
      response.status(201).json({
        success: true,
        message: 'Added a new event',
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

// get user's events e5f45 49a59
export const getEventsByUserId = async (request, response) => {
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
      const events = await client.query(
        'SELECT * FROM events WHERE user_id = $1',
        [id]
      );
      console.log('getUserEvents', events.rows);
      if (events.rows.length > 0) {
        response.status(200).json({
          success: true,
          message: 'Found the user events',
          events: events.rows,
        });
      } else {
        response.status(200).json({
          success: true,
          message: 'The user have not created any event',
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

// get a event by id
export const getEventById = async (request, response) => {
  const id = request.params.event_id;
  const client = await pool.connect();
  try {
    const event = await client.query('SELECT * FROM events WHERE id = $1', [
      id,
    ]);
    console.log('getEventbyId', event.rows[0]);
    if (event.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Found the event',
        event: event.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the event',
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

// edit a event by id
export const updateEventLabelById = async (request, response) => {
  const id = request.params.event_id;
  const { label } = request.body;
  const client = await pool.connect();
  try {
    const event = await client.query(
      'UPDATE events SET label = $1 WHERE id = $2',
      [label, id]
    );
    console.log('updateEventLabelById', event.rows[0]);
    if (event.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Event label updated successfully',
        event: event.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the event',
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

// complete a event by id
export const completeEventById = async (request, response) => {
  const id = request.params.event_id;
  const { isCompleted } = request.body;
  const client = await pool.connect();
  try {
    const event = await client.query(
      'UPDATE events SET is_completed = $1 WHERE id = $2',
      [isCompleted, id]
    );
    console.log('completeEventById', id);
    if (event.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: isCompleted
          ? 'Event has been completed!'
          : 'Event is incompleted.',
        event: event.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the event',
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

// delete a event by id
export const deleteEventById = async (request, response) => {
  const id = request.params.event_id;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM events WHERE id = $1', [id]);
    console.log('Delete a event', id);
    if (result.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Delete a event successfully',
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the event',
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
