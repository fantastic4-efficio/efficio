const client = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUsers = async (first_name, last_name, password, username, email) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await client.query(`
      INSERT INTO users(first_name, last_name, password, username, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [first_name, last_name, hashedPassword, username, email]);
      
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (username, password) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users 
      WHERE username= $1;
    `, [username]);

    const user = rows[0];
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const token = await jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        return token;
      } else {
        throw new Error('No User Found');
      }
    } else {
      throw new Error('No User Found');
    }
  } catch (err) {
    throw new Error('No User Found');
  }
}

const logInWithToken = async (token) => {
  try {
    const usefulInfo = await jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await client.query(`
      SELECT * FROM users WHERE username='${usefulInfo.username}'
    `);

    const user = rows[0];

    if (user) {
      return { username: user.username };
    } else {
      return { message: 'Bad Token' };
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { createUsers, authenticateUser, logInWithToken };