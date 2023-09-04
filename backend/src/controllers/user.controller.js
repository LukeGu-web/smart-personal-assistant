import { pool } from '../services/db.js';

export const createUser = async (request, response) => {
  const { firstname, lastname, email, password } = request.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (firstname,lastname, email,password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstname, lastname, email, password]
    );
    console.log('CreateUser', result.rows[0]);
    response.status(201).json({
      success: true,
      message: 'Added a new user',
      newUser: result.rows[0],
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
};
