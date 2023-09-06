import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../services/db.js';
import { nanoid } from '../utils/index.js';

const saltRounds = 10;
const secret = 'smart assistance secret';

// signup
export const createUser = async (request, response) => {
  const { firstname, lastname, email, password } = request.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  const client = await pool.connect();
  try {
    const user = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (!user.rows[0]) {
      const id = nanoid(5);
      const result = await client.query(
        'INSERT INTO users (id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, firstname, lastname, email, hashPassword]
      );
      console.log('CreateUser', result.rows[0]);
      response.status(201).json({
        success: true,
        message: 'Added a new user',
        newUser: result.rows[0],
      });
    } else {
      response.status(409).json({
        success: false,
        message: 'User already existed',
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

// login
export const login = async (request, response) => {
  const { email, password } = request.body;
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    const isCorrect = bcrypt.compareSync(password, result.rows[0].password); // true
    console.log('Login successfully', email);
    if (isCorrect) {
      var token = jwt.sign(
        {
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          email: result.rows[0].email,
        },
        secret,
        { expiresIn: '1h' }
      );
      response.status(200).json({
        success: true,
        message: 'Login successfully',
        token: token,
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Your email or password is incorrect',
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

// GetUserById
export const getUserById = async (request, response) => {
  const id = request.params.id;
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    console.log('getUser', result.rows[0]);
    if (!result.rows[0]) {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
      });
    } else {
      response.status(200).json({
        success: true,
        message: 'Found the user',
        user: result.rows[0],
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

// GetUserByEmail
export const getUserByEmail = async (request, response) => {
  const email = request.params.email;
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    console.log('getUser', result.rows[0]);
    if (!result.rows[0]) {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
      });
    } else {
      response.status(200).json({
        success: true,
        message: 'Found the user',
        user: result.rows[0],
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

// edit profile
export const updateUserById = async (request, response) => {
  const id = request.params.id;
  const { firstname, lastname } = request.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3',
      [firstname, lastname, id]
    );
    console.log('User profile updated', id);
    if (result.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'User profile updated successfully',
        updatedUser: result.rows[0],
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
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

// Delete user
export const deleteUserById = async (request, response) => {
  const id = request.params.id;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
    console.log('Delete a user', id);
    if (result.rowCount > 0) {
      response.status(200).json({
        success: true,
        message: 'Delete a user successfully',
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Not found the user',
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

// forgot password
